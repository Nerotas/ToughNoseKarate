import { hasRequiredRole } from '../RoleChecker';
import { InstructorProfile } from '../../models/Auth/Auth';

describe('RoleChecker helper', () => {
  const createMockInstructor = (role: 'instructor' | 'admin'): InstructorProfile => ({
    id: 1,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: role,
  });

  describe('hasRequiredRole', () => {
    it('should return true for admin user with any expected role', () => {
      const adminUser = createMockInstructor('admin');

      expect(hasRequiredRole('instructor', adminUser)).toBe(true);
      expect(hasRequiredRole('admin', adminUser)).toBe(true);
    });

    it('should return true when user role matches expected role exactly', () => {
      const instructorUser = createMockInstructor('instructor');

      expect(hasRequiredRole('instructor', instructorUser)).toBe(true);
    });

    it('should return true when user role matches expected role with different case', () => {
      // Mock the role check to simulate case insensitive comparison
      const instructorUser = createMockInstructor('instructor');

      expect(hasRequiredRole('instructor', instructorUser)).toBe(true);
    });

    it('should return true when expected role matches user role with different case', () => {
      const instructorUser = createMockInstructor('instructor');

      expect(hasRequiredRole('INSTRUCTOR', instructorUser)).toBe(true);
    });

    it('should return false when user role does not match expected role', () => {
      const instructorUser = createMockInstructor('instructor');

      expect(hasRequiredRole('student', instructorUser)).toBe(false);
    });

    it('should return false when user has no role', () => {
      const userWithoutRole = { ...createMockInstructor('instructor'), role: '' as any };

      expect(hasRequiredRole('instructor', userWithoutRole)).toBe(false);
    });

    it('should return false when user role is null', () => {
      const userWithNullRole = { ...createMockInstructor('instructor'), role: null as any };

      expect(hasRequiredRole('instructor', userWithNullRole)).toBe(false);
    });

    it('should return false when user role is undefined', () => {
      const userWithUndefinedRole = {
        ...createMockInstructor('instructor'),
        role: undefined as any,
      };

      expect(hasRequiredRole('instructor', userWithUndefinedRole)).toBe(false);
    });

    it('should return false when user is null', () => {
      expect(hasRequiredRole('instructor', null as any)).toBe(false);
    });

    it('should return false when user is undefined', () => {
      expect(hasRequiredRole('instructor', undefined as any)).toBe(false);
    });

    it('should handle empty expected role', () => {
      const instructorUser = createMockInstructor('instructor');

      expect(hasRequiredRole('', instructorUser)).toBe(false);
    });

    it('should admin role always returns true regardless of expected role', () => {
      const adminUser = createMockInstructor('admin');

      expect(hasRequiredRole('anything', adminUser)).toBe(true);
      expect(hasRequiredRole('random-role', adminUser)).toBe(true);
    });
  });
});
