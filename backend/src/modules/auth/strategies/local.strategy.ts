import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

  constructor(private authService: AuthService) { super({ usernameField: 'userName' }) }

  // Validate extracts from request body by default userName and password, but you can change it by passing an argument
  // to super() : super({ usernameField: 'username', passwordField: 'password' })
  async validate(userName: string, password: string) { // The inherited method from Passport
    const user = this.authService.validateUser(userName, password) // Service return safeFields
    if (!user) throw new UnauthorizedException('Authorization failed!')
    return user // Returns to Passport and Passport attaches to req.user
  }

}