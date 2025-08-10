import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getConfig } from 'utils/config/frontend.config';

// Get validated configuration
const config = getConfig();
// Types for API requests/responses
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
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
}

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.NEXT_PUBLIC_API_PATH,
      timeout: 10000,
      withCredentials: true, // Include cookies in requests
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Simple response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Don't handle 401 here since AxiosInstance already handles it
        return Promise.reject(error);
      }
    );
  }

  // Authentication methods
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<LoginResponse> = await this.api.post('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw this.handleApiError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
      // Don't throw error for logout, just log it
    }
  }

  async getProfile(): Promise<InstructorProfile> {
    try {
      const response: AxiosResponse<InstructorProfile> = await this.api.get('/auth/profile');
      return response.data;
    } catch (error) {
      console.error('Get profile error:', error);
      throw this.handleApiError(error);
    }
  }

  async refreshToken(): Promise<RefreshTokenResponse> {
    try {
      const response: AxiosResponse<RefreshTokenResponse> = await this.api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw this.handleApiError(error);
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      await this.api.patch('/auth/change-password', {
        currentPassword,
        newPassword,
      });
    } catch (error) {
      console.error('Change password error:', error);
      throw this.handleApiError(error);
    }
  }

  // Helper method to handle API errors
  private handleApiError(error: any): Error {
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 'An error occurred';
      return new Error(message);
    } else if (error.request) {
      // Network error
      return new Error('Network error - please check your connection');
    } else {
      // Other error
      return new Error('An unexpected error occurred');
    }
  }

  // Method to check if user is authenticated
  isAuthenticated(): boolean {
    // With cookies, we can't easily check authentication status client-side
    // This would need to be determined by making an API call or checking auth context
    return true; // Simplified for now, actual auth state managed by AuthContext
  }

  // Method to get current token (not applicable with HttpOnly cookies)
  getToken(): string | null {
    return null; // HttpOnly cookies can't be accessed via JavaScript
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export the class for testing purposes
export { AuthService };
