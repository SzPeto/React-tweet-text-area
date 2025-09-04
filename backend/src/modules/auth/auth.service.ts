import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'



@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(userName: string, pw: string) {
    const user = await this.usersService.findUserByName(userName)
    if (!user) {
      return null
    }
    const passwordMatch = await bcrypt.compare(pw, user.password)
    if (!passwordMatch) {
      return null
    }
    // user.toObject() checks if it is a Mongoose document, if yes, it converts it to plain TS object, if not return user
    // The destructuring extracts the password and the left fields besides password separately, e.g. : 
    // safeFields = { username: "peter", email: "a@b.com" }
    const { password, ...safeFields } = user.toObject ? user.toObject() : user
    return safeFields
  }

  // This creates the access and refresh tokens with user id and userName
  private async signTokens(userId: string, userName: string) {
    const accessPayload = { sub: userId, userName: userName }
    const refreshPayload = { sub: userId, userName: userName }

    const accessToken = await this.jwtService.signAsync(accessPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES || '15m',
    })
    const refreshToken = await this.jwtService.signAsync(refreshPayload, {
      secret: process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d',
    })
    return { accessToken, refreshToken }
  }

  async login(user: any) {
    const userId = user._id ?? user.id
    const userName = user.userName
    const { accessToken, refreshToken } = await this.signTokens(userId, userName)
    const hash = await bcrypt.hash(refreshToken, 10)
    await this.usersService.updateRefreshTokenHash(userId, hash) // This saves the refresh token hash to user db
    return { accessToken, refreshToken, userId, userName }
  }

  async refresh(userId: string, presentedRefreshToken: string) {
    const dbUser = await this.usersService.findUserById(userId)
    if (!dbUser?.refreshTokenHash) {
      throw new UnauthorizedException('No session')
    }
    const matches = await bcrypt.compare(presentedRefreshToken, dbUser.refreshTokenHash)
    if (!matches) {
      throw new UnauthorizedException('Invalid session')
    }

    const { accessToken, refreshToken } = await this.signTokens(dbUser.id, dbUser.userName)
    const newHash = await bcrypt.hash(refreshToken, 10)
    await this.usersService.updateRefreshTokenHash(dbUser.id, newHash)
    return { accessToken, refreshToken }
  }

  async logout(userId: string) {
    await this.usersService.removeRefreshTokenHash(userId)
  }

}