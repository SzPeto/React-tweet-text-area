import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Read required roles (e.g., ['admin']) from @Roles decorator
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    // No role requirement → allow
    if (!required || required.length === 0) return true

    const req = context.switchToHttp().getRequest()
    const user = req.user

    // Must be authenticated beforehand (JwtAuthGuard should run on these routes)
    if (!user) return false

    // Minimal support: admin or not. (Future: user.role(s))
    // In this expression if one is true, true will be assigned to isAdmin, similar like an if statement
    const isAdmin = user.isAdmin === true ||
                    user.role === 'admin' ||
                    (Array.isArray(user.roles) && user.roles.includes('admin'))

    return isAdmin
  }
}