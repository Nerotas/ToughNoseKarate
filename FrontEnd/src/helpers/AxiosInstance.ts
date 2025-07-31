import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 600000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async request => {
    request.headers['x-waf-whitelist'] = 'erotas-whitelist';
    return request;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => response,
  async error => Promise.reject(error),
);

export default axiosInstance;
