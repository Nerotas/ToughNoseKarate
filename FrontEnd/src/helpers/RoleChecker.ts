import { InstructorProfile } from 'models/Auth/Auth';

// New: role check (accepts expected role OR allows admin)
export const hasRequiredRole = (expectedRole: string, instructor: InstructorProfile): boolean => {
  const user = instructor;
  if (!user) return false;
  const role = user.role?.toLowerCase();
  return role === 'admin' || role === expectedRole.toLowerCase();
};
