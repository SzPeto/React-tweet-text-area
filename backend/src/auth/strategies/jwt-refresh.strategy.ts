import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { Request } from 'express'
import { Strategy } from 'passport-jwt'


function cookieExtractor(req: Request) {
  const name = process.env.COOKIE_NAME || 'rt'
  return req?.cookies?.[name] || null
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.get<string>('REFRESH_TOKEN_SECRET') ?? 
                   'aYwVqGVaEf6YSZeJiVynzU5Y2TKRahD5BBcgpciBXyS0ONZ+Hu6ekMda4EF7bnOpCyG4OugK6Vzxo8NybzYHmg==',
      passReqToCallback: true,
    })
  }
  async validate(req: Request, payload: any) {
    const refreshToken = cookieExtractor(req)
    return { sub: payload.sub, userName: payload.userName, refreshToken }
  }
}