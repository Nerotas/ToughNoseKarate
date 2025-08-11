import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      return false;
    }

    const userRole = String(user.role).toLowerCase();

    // Admin can access everything
    if (userRole === 'admin') {
      return true;
    }

    // Check if user's role matches any required role (case-insensitive)
    const normalizedRequiredRoles = requiredRoles.map((role) =>
      role.toLowerCase(),
    );
    return normalizedRequiredRoles.includes(userRole);
  }
}
