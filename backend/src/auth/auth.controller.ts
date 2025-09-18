import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { LoginAuthGuard } from './guards/login-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthService } from './auth.service'
import { User } from 'src/users/schemas/users.schema'
import { LoginResponseDto } from './dto/login-response.dto'
import { LoginDto } from './dto/login.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: LoginResponseDto })
  @ApiBody({ type: LoginDto }) // 👈 important for Swagger
  @UseGuards(LoginAuthGuard) 
  @Post('login')
  login(@Req() req) {
    return this.authService.login(req.user) // This returns the access token for frontend
  }

  @ApiBearerAuth('access-token')
  @ApiOkResponse({ type: User })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req) {
    return req.user
  }
}