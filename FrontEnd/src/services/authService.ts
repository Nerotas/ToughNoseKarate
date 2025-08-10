import { LoginResponse, InstructorProfile, RefreshTokenResponse } from 'models/Auth/Auth';
import axiosInstance from 'utils/helpers/AxiosInstance';

class AuthService {
  // Use shared instance
  private api = axiosInstance;

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const { data } = await this.api.post<LoginResponse>('/auth/login', { email, password });
      return data;
    } catch (e) {
      throw this.handleApiError(e);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } catch (e) {
      // swallow logout errors
      console.warn('Logout error', e);
    }
  }

  async getProfile(): Promise<InstructorProfile> {
    try {
      const { data } = await this.api.get<InstructorProfile>('/auth/profile');
      return data;
    } catch (e) {
      throw this.handleApiError(e);
    }
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const { data } = await this.api.post<RefreshTokenResponse>('/auth/refresh');
      return data;
    } catch (e) {
      throw this.handleApiError(e);
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await this.api.patch('/auth/change-password', { currentPassword, newPassword });
    } catch (e) {
      throw this.handleApiError(e);
    }
  }

  private handleApiError(error: any): Error {
    if (error?.response) {
      return new Error(error.response.data?.message || 'Request failed');
    }
    if (error?.request) {
      return new Error('Network error');
    }
    return new Error('Unexpected error');
  }

  isAuthenticated(): boolean {
    return true;
  }
  getToken(): string | null {
    return null;
  }
}

export const authService = new AuthService();
export { AuthService };
