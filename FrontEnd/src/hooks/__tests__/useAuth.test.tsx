import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { useAuth, authKeys } from '../useAuth';

// Mock authService
jest.mock('../../services/authService', () => ({
  authService: {
    login: jest.fn(),
    logout: jest.fn(),
    getProfile: jest.fn(),
    refreshToken: jest.fn(),
  },
}));

// Import the mocked service after mocking
import { authService } from '../../services/authService';
const mockAuthService = authService as jest.Mocked<typeof authService>;

// Mock console.log to avoid noise
jest.spyOn(console, 'log').mockImplementation(() => {});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useAuth hook', () => {
  const mockProfile = {
    id: 1,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'instructor' as const,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Clear environment variables
    delete process.env.NEXT_PUBLIC_ENABLE_DEBUG;
  });

  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    expect(result.current.instructor).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isAuthLoading).toBe(false);
    expect(result.current.loginError).toBeNull();
    expect(result.current.profileError).toBeNull();
    expect(typeof result.current.login).toBe('function');
    expect(typeof result.current.logout).toBe('function');
    expect(typeof result.current.refreshToken).toBe('function');
    expect(typeof result.current.ensureProfile).toBe('function');
  });

  it('handles successful login', async () => {
    const loginResponse = { success: true, instructor: mockProfile };
    mockAuthService.login.mockResolvedValueOnce(loginResponse);
    mockAuthService.getProfile.mockResolvedValueOnce(mockProfile);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password');
    expect(result.current.instructor).toEqual(expect.objectContaining(mockProfile));
  });

  it('handles login failure', async () => {
    const loginError = new Error('Invalid credentials');
    mockAuthService.login.mockRejectedValueOnce(loginError);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await act(async () => {
      try {
        await result.current.login('test@example.com', 'wrong');
      } catch (error) {
        // Expected to throw
      }
    });

    await waitFor(() => {
      expect(result.current.loginError).toEqual(loginError);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.instructor).toBeNull();
  });

  it('handles logout', async () => {
    // First login
    const loginResponse = { success: true, instructor: mockProfile };
    mockAuthService.login.mockResolvedValueOnce(loginResponse);
    mockAuthService.getProfile.mockResolvedValueOnce(mockProfile);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    // Then logout
    mockAuthService.logout.mockResolvedValueOnce(undefined);

    await act(async () => {
      result.current.logout();
    });

    await waitFor(() => {
      expect(result.current.instructor).toBeNull();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('handles logout with service error', async () => {
    // Setup authenticated state
    const loginResponse = { success: true, instructor: mockProfile };
    mockAuthService.login.mockResolvedValueOnce(loginResponse);
    mockAuthService.getProfile.mockResolvedValueOnce(mockProfile);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    // Logout with service error (should still clear state)
    mockAuthService.logout.mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      result.current.logout();
    });

    await waitFor(() => {
      expect(result.current.instructor).toBeNull();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('handles refresh token success', async () => {
    const refreshResponse = { success: true, message: 'Token refreshed successfully' };
    mockAuthService.refreshToken.mockResolvedValueOnce(refreshResponse);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.refreshToken();
    });

    expect(mockAuthService.refreshToken).toHaveBeenCalledTimes(1);
  });

  it('handles refresh token failure', async () => {
    mockAuthService.refreshToken.mockRejectedValueOnce(new Error('Token expired'));

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await act(async () => {
      try {
        await result.current.refreshToken();
      } catch (error) {
        // Expected to throw
      }
    });

    // Should clear profile on refresh error
    await waitFor(() => {
      expect(result.current.instructor).toBeNull();
    });
  });

  it('handles ensureProfile when not initialized', async () => {
    mockAuthService.getProfile.mockResolvedValueOnce(mockProfile);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.ensureProfile();
    });

    await waitFor(() => {
      expect(result.current.instructor).toEqual(mockProfile);
    });

    expect(mockAuthService.getProfile).toHaveBeenCalledTimes(1);
  });

  it('handles ensureProfile when already initialized', async () => {
    mockAuthService.getProfile.mockResolvedValue(mockProfile);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    // First call (initialization)
    await act(async () => {
      await result.current.ensureProfile();
    });

    // Second call (should invalidate and refetch)
    await act(async () => {
      await result.current.ensureProfile();
    });

    expect(mockAuthService.getProfile).toHaveBeenCalledTimes(2);
  });

  it('treats empty object instructor as unauthenticated', async () => {
    const emptyProfile = {};
    mockAuthService.getProfile.mockResolvedValueOnce(emptyProfile);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.ensureProfile();
    });

    await waitFor(() => {
      expect(result.current.instructor).toBeNull();
    });

    expect(result.current.isAuthenticated).toBe(false);
  });

  it('logs debug info when NEXT_PUBLIC_ENABLE_DEBUG is true', async () => {
    process.env.NEXT_PUBLIC_ENABLE_DEBUG = 'true';
    const consoleSpy = jest.spyOn(console, 'log');

    const loginResponse = { success: true, instructor: mockProfile };
    mockAuthService.login.mockResolvedValueOnce(loginResponse);
    mockAuthService.getProfile.mockResolvedValueOnce(mockProfile);

    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'Login success – optimistic set. Refetching profile for cookie confirmation...'
    );

    consoleSpy.mockRestore();
  });

  it('isAuthLoading is false when no mutations are pending', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: createWrapper() });

    // Should not be loading initially
    expect(result.current.isAuthLoading).toBe(false);
  });

  it('exports authKeys correctly', () => {
    expect(authKeys.all).toEqual(['auth']);
    expect(authKeys.profile()).toEqual(['auth', 'profile']);
  });
});
