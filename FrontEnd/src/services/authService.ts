import { LoginResponse, InstructorProfile, RefreshTokenResponse } from 'models/Auth/Auth';
import axiosInstance from 'utils/helpers/AxiosInstance';

export const authService = {
  sessionReady: false,
  profile: null as InstructorProfile | null,

  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await axiosInstance.post<LoginResponse>('/auth/login', { email, password });
    await authService.ensureSession();
    return data;
  },

  ensureSession: async (): Promise<boolean> => {
    if (authService.sessionReady) return true;
    try {
      authService.profile = await authService.getProfile();
      authService.sessionReady = true;
      return true;
    } catch (error) {
      console.error('Error in ensureSession:', error);
      authService.sessionReady = false;
      return false;
    }
  },

  logout: async (): Promise<string | void> => {
    let errorString: string | undefined;
    try {
      await axiosInstance.post('/auth/logout');
    } catch (err: any) {
      // Capture error as string but do not rethrow so callers can always proceed
      errorString = err instanceof Error ? err.toString() : 'Logout failed';
    } finally {
      authService.sessionReady = false;
      authService.profile = null;
    }
    return errorString;
  },

  getProfile: async () => {
    const { data } = await axiosInstance.get('/auth/profile');
    // If backend returns { success, instructor }
    console.log('getProfile', data.instructor);
    return data.instructor ?? data;
  },

  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const { data } = await axiosInstance.post<RefreshTokenResponse>('/auth/refresh');
    return data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    await axiosInstance.patch('/auth/change-password', { currentPassword, newPassword });
  },

  isAuthenticated: (): boolean => {
    return authService.sessionReady;
  },

  getCachedProfile: (): InstructorProfile | null => {
    return authService.profile;
  },

  handleApiError(error: any): Error {
    if (error?.response) return new Error(error.response.data?.message || 'Request failed');
    if (error?.request) return new Error('Network error');
    return new Error('Unexpected error');
  },
};
