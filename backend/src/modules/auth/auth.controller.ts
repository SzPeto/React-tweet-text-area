import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request) { // You can omit the use of DTO, since LocalStrategy and Passport substitute it
    console.log(`Hello from AuthService/login, request : ${ request }`)
    return this.authService.login(request.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() request) {
    return request.user
  }

}