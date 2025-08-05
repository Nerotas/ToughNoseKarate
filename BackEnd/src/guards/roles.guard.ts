import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { InstructorPayload } from '../auth/jwt.strategy';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get required roles from the decorator
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(Roles, [
      context.getHandler(),
      context.getClass(),
    ]);

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Get the user from the request (set by JWT strategy)
    const request = context.switchToHttp().getRequest();
    const user: InstructorPayload = request.user;

    // If no user, deny access
    if (!user) {
      return false;
    }

    // Check if user's role is in the required roles
    return requiredRoles.includes(user.role);
  }
}

// Keep the old AdminGuard for backward compatibility (deprecated)
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    //TODO: Implement actual role checking logic
    const mockRole = ['user', 'admin']; // Mocking the role check for testing purposes
    return 'admin' in mockRole;
  }
}
