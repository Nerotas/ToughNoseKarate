import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: jest.Mocked<Reflector>;

  const mockReflector = {
    getAllAndOverride: jest.fn(),
  };

  beforeEach(() => {
    reflector = mockReflector as any;
    guard = new RolesGuard(reflector);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockContext = (user: any = null): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;
  };

  describe('canActivate', () => {
    it('should allow access when no roles are required', () => {
      const context = createMockContext();
      reflector.getAllAndOverride.mockReturnValue(null);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(Roles, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it('should allow access when empty roles array', () => {
      const context = createMockContext();
      reflector.getAllAndOverride.mockReturnValue([]);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should deny access when user is not present', () => {
      const context = createMockContext(null);
      reflector.getAllAndOverride.mockReturnValue(['instructor']);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
    });

    it('should deny access when user has no role', () => {
      const context = createMockContext({ id: 1, email: 'test@example.com' });
      reflector.getAllAndOverride.mockReturnValue(['instructor']);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
    });

    it('should allow access for admin role regardless of required roles', () => {
      const context = createMockContext({
        id: 1,
        email: 'admin@example.com',
        role: 'admin'
      });
      reflector.getAllAndOverride.mockReturnValue(['instructor']);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access for admin role with different casing', () => {
      const context = createMockContext({
        id: 1,
        email: 'admin@example.com',
        role: 'ADMIN'
      });
      reflector.getAllAndOverride.mockReturnValue(['instructor']);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access when user role matches required role', () => {
      const context = createMockContext({
        id: 1,
        email: 'instructor@example.com',
        role: 'instructor'
      });
      reflector.getAllAndOverride.mockReturnValue(['instructor']);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access when user role matches one of multiple required roles', () => {
      const context = createMockContext({
        id: 1,
        email: 'instructor@example.com',
        role: 'instructor'
      });
      reflector.getAllAndOverride.mockReturnValue(['admin', 'instructor']);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should deny access when user role does not match required roles', () => {
      const context = createMockContext({
        id: 1,
        email: 'user@example.com',
        role: 'student'
      });
      reflector.getAllAndOverride.mockReturnValue(['instructor', 'admin']);

      const result = guard.canActivate(context);

      expect(result).toBe(false);
    });

    it('should handle case-insensitive role matching', () => {
      const context = createMockContext({
        id: 1,
        email: 'instructor@example.com',
        role: 'INSTRUCTOR'
      });
      reflector.getAllAndOverride.mockReturnValue(['instructor']);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should handle mixed case in required roles', () => {
      const context = createMockContext({
        id: 1,
        email: 'instructor@example.com',
        role: 'instructor'
      });
      reflector.getAllAndOverride.mockReturnValue(['INSTRUCTOR', 'Admin']);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should handle numeric role values', () => {
      const context = createMockContext({
        id: 1,
        email: 'admin@example.com',
        role: 1
      });
      reflector.getAllAndOverride.mockReturnValue(['1']);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });
  });
});
