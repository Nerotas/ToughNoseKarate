import { LoginResponse, InstructorProfile, RefreshTokenResponse } from 'models/Auth/Auth';
import axiosInstance from 'utils/helpers/AxiosInstance';

class AuthService {
  private api = axiosInstance;
  private sessionReady = false;
  private profile: InstructorProfile | null = null;

  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await this.api.post<LoginResponse>('/auth/login', { email, password });
    await this.ensureSession();
    return data;
  }

  async ensureSession(): Promise<boolean> {
    if (this.sessionReady) return true;
    try {
      this.profile = await this.getProfile();
      this.sessionReady = true;
      return true;
    } catch {
      this.sessionReady = false;
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } finally {
      this.sessionReady = false;
      this.profile = null;
    }
  }

  async getProfile(): Promise<InstructorProfile> {
    const { data } = await this.api.get<InstructorProfile>('/auth/profile');
    return data;
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    const { data } = await this.api.post<RefreshTokenResponse>('/auth/refresh');
    return data;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.api.patch('/auth/change-password', { currentPassword, newPassword });
  }

  isAuthenticated(): boolean {
    return this.sessionReady;
  }

  getCachedProfile(): InstructorProfile | null {
    return this.profile;
  }

  private handleApiError(error: any): Error {
    if (error?.response) return new Error(error.response.data?.message || 'Request failed');
    if (error?.request) return new Error('Network error');
    return new Error('Unexpected error');
  }
}

export const authService = new AuthService();
export { AuthService };
