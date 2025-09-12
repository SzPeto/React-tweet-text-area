import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(userName: string, pw: string) {
    const user = await this.usersService.findUserByName(userName)
    if (!user) {
      throw new NotFoundException(`User with name ${ userName } doesn't exist!`)
    }
    const passwordMatch = await bcrypt.compare(pw, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong password!')
    }
    /* user.toObject() checks if it is a Mongoose document, if yes, it converts it to plain TS object, if not return user
       The destructuring extracts the password and the left fields besides password separately, e.g. : 
       safeFields = { username: 'peter', email: 'a@b.com' } */
    const { password, ...safeFields } = user.toObject ? user.toObject() : user
    return safeFields
  }

  async login(user: any) {
    const payload = { username: user.userName, sub: user._id ?? user.id }

    return { accessToken: this.jwtService.sign(payload) } // This goes back to frontend through API
  }
}