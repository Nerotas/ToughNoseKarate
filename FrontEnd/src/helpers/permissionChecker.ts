const permissionChecker = (permission: string, roles: string[]): boolean => {
  switch (true) {
    case roles.includes('admin'):
      return true;
    case roles.includes(permission):
      return true;
    default:
      return false;
  }
};

export default permissionChecker;
