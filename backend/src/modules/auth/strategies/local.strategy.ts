import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) { super() }

  async validate(userName: string, password: string) {
    const user = this.authService.validateUser(userName, password)
    if (!user) throw new UnauthorizedException('Authorization failed!')
    return user // Attaches to req.user
  }

}