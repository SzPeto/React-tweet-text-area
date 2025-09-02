import { Response } from 'express'

export function setRefreshCookie(res: Response, token: string) {
  const name = process.env.COOKIE_NAME || 'rt'
  res.cookie(name, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/api/auth/refresh',           // IMPORTANT: includes your global prefix 'api'
    maxAge: 7 * 24 * 60 * 60 * 1000,     // 7 days
  })
}

export function clearRefreshCookie(res: Response) {
  const name = process.env.COOKIE_NAME || 'rt'
  res.clearCookie(name, { path: '/api/auth/refresh' })
}