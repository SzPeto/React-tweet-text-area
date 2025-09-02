import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy'


@Module({
  imports: [
    UsersModule, 
    PassportModule,
    ConfigModule.forRoot({ isGlobal: true }), // <--- loads .env
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET ?? 
              'RmReUXDJATGdqIh5KtkaQ0Z4pteLBUgBY1VPqa/ryIuLZjXKl9wISOYb6l/LHHro1JUbgb3a7NAXA6uWBJDucw==',
      signOptions: { expiresIn: process.env.JWT_EXPIRES || '15m' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService]
})

export class AuthModule {}