import axios from 'axios';
import { getConfig, shouldEnableDebug } from '../config/frontend.config';

// Get validated configuration
const config = getConfig();

// Normalize segments safely (prevents double slashes)
const trimSlashes = (s: string) => s.replace(/\/+$/, '');
const ensureVersion = (v: string) => {
  if (!v) return 'v1';
  return v.startsWith('v') ? v : `v${v}`;
};

// Build versioned base URL once
const apiBase = `${trimSlashes(config.NEXT_PUBLIC_API_PATH)}/${ensureVersion(
  config.NEXT_PUBLIC_API_VERSION
)}`;

const axiosInstance = axios.create({
  baseURL: apiBase,
  timeout: 30000,
  withCredentials: true,
  // Do not set global Content-Type to avoid preflight on GET/HEAD
});

// Single-flight refresh control
let isRefreshing = false;
const waitQueue: Array<(ok: boolean) => void> = [];
const enqueue = (cb: (ok: boolean) => void) => waitQueue.push(cb);
const flush = (ok: boolean) => {
  while (waitQueue.length) {
    try {
      waitQueue.shift()?.(ok);
    } catch {}
  }
};

// Ensure Content-Type only when sending JSON body
axiosInstance.interceptors.request.use(
  (request) => {
    if (shouldEnableDebug()) {
      console.log(
        `🔄 API Request: ${request.method?.toUpperCase()} ${request.baseURL || ''}${request.url || ''}`
      );
    }
    const method = (request.method || 'get').toUpperCase();
    const hasBody = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method) && request.data != null;

    const hdrs: any = request.headers;

    // Axios v1 uses AxiosHeaders; handle both shapes
    const removeHeader = (name: string) => {
      if (!hdrs) return;
      if (typeof hdrs.delete === 'function') {
        hdrs.delete(name);
      } else {
        delete hdrs[name];
        delete hdrs[name.toLowerCase()];
      }
    };
    const setHeader = (name: string, value: string) => {
      if (!hdrs) return;
      if (typeof hdrs.set === 'function') {
        hdrs.set(name, value);
      } else {
        hdrs[name] = value;
      }
    };

    if (!hasBody) {
      removeHeader('Content-Type');
    } else {
      // Set only when sending a body
      setHeader('Content-Type', 'application/json');
    }

    return request;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (shouldEnableDebug()) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error) => {
    const { response, config: originalRequest } = error;
    if (shouldEnableDebug()) {
      console.error(
        `❌ API Response Error: ${response?.status} ${originalRequest?.url}`,
        response?.data || ''
      );
    }
    if (!response) return Promise.reject(error);

    const status = response.status;
    const url = (originalRequest?.url || '').toLowerCase();
    const isAuthEndpoint =
      url.includes('/auth/login') ||
      url.includes('/auth/refresh') ||
      url.includes('/auth/change-password');

      //attempt auth refetch
    if (status === 401 && !isAuthEndpoint) {
      if ((originalRequest as any)._retry) {
        if (shouldEnableDebug()) console.warn('401 after retry, redirecting to login');
        if (typeof window !== 'undefined') window.location.href = '/auth/login';
        return Promise.reject(error);
      }
      (originalRequest as any)._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        if (shouldEnableDebug()) console.log('🔁 Starting token refresh');
        try {
          const mod = await import('../../services/authService');
          const svc: any = (mod as any).authService || (mod as any).default || mod;
          await svc.refreshToken(); // sets new access cookie
          flush(true);
        } catch (refreshErr) {
          if (shouldEnableDebug()) console.warn('Refresh failed, flushing queue');
          flush(false);
          if (typeof window !== 'undefined') window.location.href = '/auth/login';
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      }

      // Queue pending requests until refresh done
      return new Promise((resolve, reject) => {
        enqueue((ok) => {
          if (!ok) return reject(error);
          resolve(axiosInstance(originalRequest));
        });
      });
    }

    if (status === 429) {
      return Promise.reject(new Error('Too many requests. Please wait and retry.'));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
