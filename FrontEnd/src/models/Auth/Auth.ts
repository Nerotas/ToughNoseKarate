export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  success: boolean;
  instructor: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'instructor' | 'admin';
  };
}
export interface InstructorProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: 'instructor' | 'admin';
  lastLogin?: string;
}
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}
export interface RefreshTokenResponse {
  success: boolean;
  message: string;
}
