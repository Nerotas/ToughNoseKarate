import { AdminGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { InternalMSGraphClientService } from '../services/msGraphClient/internalMSGraphClient.service';
import { TestingUtilsService } from '../services/testingUtils/testingUtils.service';
import { expect, describe, it, jest } from '@jest/globals';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let reflector: Reflector;
  let internalClientService: InternalMSGraphClientService;
  let testingUtils: TestingUtilsService;

  beforeEach(() => {
    reflector = { get: jest.fn() } as any;
    internalClientService = {
      checkRoleGroupsMembership: jest.fn<any>(),
    } as any;
    testingUtils = {} as any;
    guard = new AdminGuard(internalClientService, reflector, testingUtils);
  });

  it('returns true if no roles are required', async () => {
    (reflector.get as jest.Mock).mockReturnValue(undefined);
    const context = {
      getHandler: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { userId: '123' } }),
      }),
    } as any;
    await expect(guard.canActivate(context)).resolves.toBe(true);
  });

  it('returns true if user has admin role', async () => {
    (reflector.get as jest.Mock).mockReturnValue(['admin']);
    (
      internalClientService.checkRoleGroupsMembership as jest.Mock<any>
    ).mockResolvedValue({ admin: true });
    const context = {
      getHandler: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { userId: '123' } }),
      }),
    } as any;
    await expect(guard.canActivate(context)).resolves.toBe(true);
  });

  it('returns false if user does not have admin role', async () => {
    (reflector.get as jest.Mock).mockReturnValue(['admin']);
    (
      internalClientService.checkRoleGroupsMembership as jest.Mock<any>
    ).mockResolvedValue({ user: true });
    const context = {
      getHandler: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({ user: { userId: '123' } }),
      }),
    } as any;
    await expect(guard.canActivate(context)).resolves.toBe(false);
  });
});
