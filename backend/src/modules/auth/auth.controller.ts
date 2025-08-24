import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService) {}

  // Before the the request reaches the route, LocalAuthGuard do its work, it enriches the request by user, if credentials correct
  @UseGuards(LocalAuthGuard) 
  @Post('login')
  login(@Request() request) { // You can omit the use of DTO, since LocalStrategy and Passport substitute it
    console.log(`Hello from AuthService/login, request : ${ request }, ${ process.env.JWT_SECRET }`)
    return this.authService.login(request.user) // This returns the access token for frontend
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() request) {
    return request.user
  }

}