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

    // Handle common error scenarios
    if (error.response?.status === 401) {
      // Handle unauthorized - could redirect to login
      console.warn('Unauthorized access - user may need to log in');
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
