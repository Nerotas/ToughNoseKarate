import axios from 'axios';
import { getConfig, shouldEnableDebug } from '../config/frontend.config';

// Get validated configuration
const config = getConfig();

const axiosInstance = axios.create({
  baseURL: config.NEXT_PUBLIC_API_PATH,
  timeout: 30000, // Reduced from 600000 (10 minutes) to 30 seconds
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (request) => {
    // Add JWT token to requests
    const token = localStorage.getItem('accessToken');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    // Add API version to requests if not already present
    if (!request.url?.includes('/v')) {
      request.url = `/${config.NEXT_PUBLIC_API_VERSION}${request.url}`;
    }

    // Log requests in debug mode
    if (shouldEnableDebug()) {
      console.log(`🔄 API Request: ${request.method?.toUpperCase()} ${request.url}`);
    }

    return request;
  },
  (error) => {
    if (shouldEnableDebug()) {
      console.error('❌ API Request Error:', error);
    }
    return Promise.reject(error);
  }
);
 
axiosInstance.interceptors.response.use(
  (response) => {
    if (shouldEnableDebug()) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    if (shouldEnableDebug()) {
      console.error(
        `❌ API Response Error: ${error.response?.status} ${error.config?.url}`,
        error.response?.data
      );
    }

    const originalRequest = error.config;

    // Handle 401 errors with token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh the token using the auth service
        const { authService } = await import('../../services/authService');
        const response = await authService.refreshToken();
        localStorage.setItem('accessToken', response.access_token);

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${response.access_token}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear token and redirect to login
        localStorage.removeItem('accessToken');
        console.warn('Token refresh failed - redirecting to login');
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    } else if (error.response?.status === 401) {
      // Already tried to refresh or no token - redirect to login
      console.warn('Unauthorized access - user may need to log in');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error occurred');
    } else if (error.code === 'NETWORK_ERROR') {
      // Handle network errors
      console.error('Network error - check connection');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
