import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Roles } from '../decorators/roles.decorator';
import { TestingUtilsService } from '../services/testingUtils/testingUtils.service';

const mockRole = ['user', 'admin'];

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

    const roleAccessGranted =
      // await this.internalClientService.checkRoleGroupsMembership(user?.userId);
      mockRole; // Mocking the role check for testing purposes
    return 'admin' in roleAccessGranted;
  }
}
