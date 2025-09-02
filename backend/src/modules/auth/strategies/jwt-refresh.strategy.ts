import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'

function cookieExtractor(req: Request) {
  const name = process.env.COOKIE_NAME || 'rt'
  return req?.cookies?.[name] || null
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    })
  }
  async validate(req: Request, payload: any) {
    const refreshToken = cookieExtractor(req)
    return { sub: payload.sub, userName: payload.userName, refreshToken }
  }
}