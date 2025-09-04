import { Controller, Get, Post, Request, UseGuards, Res, Req } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { type Response, type Request as ExpressRequest } from 'express'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { setRefreshCookie, clearRefreshCookie } from './cookie.util'


@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    // LocalGuard puts the validated user on req.user
    const { accessToken, refreshToken } =
      await this.authService.login(req.user)

    // ✅ Set RT as HttpOnly cookie (not returned in JSON)
    setRefreshCookie(res, refreshToken)

    return { accessToken }
  }

  @Post('refresh')
  async refresh(@Req() req: ExpressRequest, @Res({ passthrough: true }) res: Response) {
    // Read RT from cookie (no body, no headers from FE)
    const cookieName = process.env.COOKIE_NAME || 'rt'
    const presentedRt = req?.cookies?.[cookieName] ?? null // Get the RT from cookie
    if (!presentedRt) {
      // Match your existing error handling if you prefer
      return res.status(401).json({ message: 'No session' })
    }

    // Extract userId from the RT payload (so we can call service.refresh)
    let userId: string
    try {
      const payload = await this.jwtService.verifyAsync<any>(presentedRt,
        { secret: process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET }
      )
      userId = payload?.sub
      if (!userId) {
        throw new Error('No sub in token')
      }
    } catch {
      return res.status(401).json({ message: 'Invalid session' })
    }

    // Rotate tokens (service returns both; we only expose AT)
    const { accessToken, refreshToken } = await this.authService.refresh(userId, presentedRt)

    // Reset cookie with the new RT
    setRefreshCookie(res, refreshToken)

    // ✅ Return only access token
    return { accessToken }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    const userId = req.user._id ?? req.user.id ?? req.user.sub
    await this.authService.logout(userId)
    clearRefreshCookie(res)
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Request() request) {
    return request.user
  }
}