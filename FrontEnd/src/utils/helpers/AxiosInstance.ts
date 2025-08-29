// Re-export the actual Axios instance implemented under utils/helpers
// Keeps legacy imports like `helpers/AxiosInstance` working in tests and code.
export { default } from './AxiosInstance';
