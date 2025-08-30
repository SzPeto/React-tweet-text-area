import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(userName: string, pw: string) {
    const user = await this.usersService.findUserByName(userName)
    if (!user) return null
    const passwordMatch = await bcrypt.compare(pw, user.password)
    if (!passwordMatch) return null
    // user.toObject() checks if it is a Mongoose document, if yes, it converts it to plain TS object, if not return user
    // The destructuring extracts the password and the left fields besides password separately, e.g. : 
    // safeFields = { username: "peter", email: "a@b.com" }
    const { password, ...safeFields } = user.toObject ? user.toObject() : user
    return safeFields
  }

  async login(user: any) {
    // ?? Nullish coalescing operator, use 'a' if not null or undefined, otherwise use 'b'
    const payload = { username: user.userName, sub: user._id ?? user.id }
    console.log(`User logged in successfully : ${ payload.username }`)
    return { accessToken: this.jwtService.sign(payload) } // This goes back to frontend through API
  }

}