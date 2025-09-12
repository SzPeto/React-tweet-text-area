import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private usersService:UsersService, private readonly config: ConfigService) { 
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET') ?? 
                   'RmReUXDJATGdqIh5KtkaQ0Z4pteLBUgBY1VPqa/ryIuLZjXKl9wISOYb6l/LHHro1JUbgb3a7NAXA6uWBJDucw==',
    }) 
  }

  async validate(payload: any) {
    // payload comes from sign({ userId, username }) in AuthService
    const user = await this.usersService.findUserById(payload.sub)

    if (!user) {
      throw new NotFoundException(`User with id ${ payload.sub } not found`)
    }
    
    return user // This attaches to req.user
  }
}