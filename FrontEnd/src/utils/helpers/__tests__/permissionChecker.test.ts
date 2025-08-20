import permissionChecker from '../permissionChecker';

describe('permissionChecker', () => {
  it('should return true when user has admin role', () => {
    const roles = ['admin'];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(true);
  });

  it('should return true when user has admin role among other roles', () => {
    const roles = ['user', 'admin', 'moderator'];
    const permission = 'write';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(true);
  });

  it('should return true when user has the exact permission', () => {
    const roles = ['read', 'write'];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(true);
  });

  it('should return true when user has the exact permission among other roles', () => {
    const roles = ['user', 'read', 'moderator'];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(true);
  });

  it('should return false when user does not have admin or the specific permission', () => {
    const roles = ['user', 'guest'];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(false);
  });

  it('should return false when user has empty roles array', () => {
    const roles: string[] = [];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(false);
  });

  it('should return false when checking for empty permission string', () => {
    const roles = ['user', 'guest'];
    const permission = '';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(false);
  });

  it('should handle case sensitivity correctly', () => {
    const roles = ['READ', 'WRITE'];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    // Should return false because 'read' !== 'READ'
    expect(result).toBe(false);
  });

  it('should handle admin case sensitivity correctly', () => {
    const roles = ['ADMIN'];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    // Should return false because 'admin' !== 'ADMIN'
    expect(result).toBe(false);
  });

  it('should return true for admin role with any permission', () => {
    const roles = ['admin'];

    expect(permissionChecker('read', roles)).toBe(true);
    expect(permissionChecker('write', roles)).toBe(true);
    expect(permissionChecker('delete', roles)).toBe(true);
    expect(permissionChecker('create', roles)).toBe(true);
    expect(permissionChecker('any-permission', roles)).toBe(true);
  });

  it('should handle special characters in permissions', () => {
    const roles = ['user', 'read-write', 'admin-panel'];
    const permission = 'read-write';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(true);
  });

  it('should handle numbers in permissions', () => {
    const roles = ['user', 'level1', 'level2'];
    const permission = 'level1';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(true);
  });

  it('should handle permissions with spaces', () => {
    const roles = ['user', 'read documents', 'write files'];
    const permission = 'read documents';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(true);
  });

  it('should return false when permission is similar but not exact', () => {
    const roles = ['user', 'read-only'];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(false);
  });

  it('should prioritize admin role over specific permission', () => {
    const roles = ['admin', 'guest'];
    const permission = 'super-admin';

    const result = permissionChecker(permission, roles);

    // Should return true because admin role takes precedence
    expect(result).toBe(true);
  });

  it('should handle duplicate roles correctly', () => {
    const roles = ['user', 'read', 'user', 'read'];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(true);
  });

  it('should handle null-like values in roles', () => {
    const roles = ['user', '', null as any, undefined as any, 'read'];
    const permission = 'read';

    const result = permissionChecker(permission, roles);

    expect(result).toBe(true);
  });
});
