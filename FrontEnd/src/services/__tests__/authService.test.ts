import '@testing-library/jest-dom';

jest.mock('utils/helpers/AxiosInstance', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  },
}));

const axiosInstance = require('utils/helpers/AxiosInstance').default;
const { authService } = require('../authService');

describe('authService', () => {
  const profile = { id: 1, email: 'test@example.com', role: 'admin' };

  beforeEach(() => {
    jest.clearAllMocks();
    authService.sessionReady = false;
    authService.profile = null;
  });

  test('login triggers profile fetch & marks session ready', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: { accessToken: 'abc' } }); // login
    axiosInstance.get.mockResolvedValueOnce({ data: { instructor: profile } }); // profile

    const res = await authService.login('e', 'p');
    expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', { email: 'e', password: 'p' });
    expect(res).toEqual({ accessToken: 'abc' });
    expect(authService.isAuthenticated()).toBe(true);
    expect(authService.getCachedProfile()).toEqual(profile);
  });

  test('ensureSession returns early if already ready', async () => {
    authService.sessionReady = true;
    const result = await authService.ensureSession();
    expect(result).toBe(true);
    expect(axiosInstance.get).not.toHaveBeenCalled();
  });

  test('ensureSession handles failure gracefully', async () => {
    axiosInstance.get.mockRejectedValueOnce(new Error('fail'));
    const ok = await authService.ensureSession();
    expect(ok).toBe(false);
    expect(authService.sessionReady).toBe(false);
  });

  test('logout posts and resets cache even if post throws', async () => {
    axiosInstance.post.mockRejectedValueOnce(new Error('logout fail'));
    authService.sessionReady = true;
    authService.profile = profile;
    await expect(authService.logout()).resolves.toBe('Error: logout fail');
    expect(authService.sessionReady).toBe(false);
    expect(authService.profile).toBeNull();
  });

  test('refreshToken', async () => {
    axiosInstance.post.mockResolvedValueOnce({ data: { accessToken: 'new' } });
    const data = await authService.refreshToken();
    expect(data).toEqual({ accessToken: 'new' });
    expect(axiosInstance.post).toHaveBeenCalledWith('/auth/refresh');
  });

  test('changePassword calls patch', async () => {
    axiosInstance.patch.mockResolvedValueOnce({});
    await authService.changePassword('old', 'new');
    expect(axiosInstance.patch).toHaveBeenCalledWith('/auth/change-password', {
      currentPassword: 'old',
      newPassword: 'new',
    });
  });

  test('handleApiError response', () => {
    const err = authService.handleApiError({ response: { data: { message: 'Bad' } } });
    expect(err.message).toBe('Bad');
  });

  test('handleApiError request', () => {
    const err = authService.handleApiError({ request: {} });
    expect(err.message).toBe('Network error');
  });

  test('handleApiError generic', () => {
    const err = authService.handleApiError({});
    expect(err.message).toBe('Unexpected error');
  });
});
