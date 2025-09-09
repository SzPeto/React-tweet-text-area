import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { LoginAuthGuard } from './guards/login-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LoginAuthGuard) 
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user) // This returns the access token for frontend
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() req) {
    return req.user
  }
}