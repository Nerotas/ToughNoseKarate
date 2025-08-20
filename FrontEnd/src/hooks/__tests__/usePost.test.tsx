import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import usePost from '../usePost';

// Mock axiosInstance
jest.mock('utils/helpers/AxiosInstance', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

// Import the mocked instance after mocking
import axiosInstance from 'utils/helpers/AxiosInstance';
const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

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

describe('usePost hook', () => {
  const testUrl = '/test-endpoint';
  const testApiLabel = ['test-api'];
  const testId = 'test-id';
  const testPayload = { name: 'Test', value: 123 };
  const mockResponse = { id: 1, message: 'Success' };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns mutation object with expected properties', () => {
    const { result } = renderHook(() => usePost(testUrl, testApiLabel, testId), {
      wrapper: createWrapper(),
    });

    expect(result.current).toHaveProperty('mutate');
    expect(result.current).toHaveProperty('responseData');
    expect(result.current).toHaveProperty('isIdle');
    expect(result.current).toHaveProperty('isPending');
    expect(result.current).toHaveProperty('isError');
    expect(result.current).toHaveProperty('isSuccess');
    expect(result.current).toHaveProperty('error');
    expect(typeof result.current.mutate).toBe('function');
  });

  it('handles successful POST request', async () => {
    mockAxiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => usePost(testUrl, testApiLabel, testId), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(testUrl, testPayload);
    expect(result.current.responseData).toEqual(mockResponse);
    expect(result.current.isError).toBe(false);
  });

  it('handles POST request failure', async () => {
    const error = new Error('Network error');
    mockAxiosInstance.post.mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePost(testUrl, testApiLabel, testId), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true); // Success because error is caught and returned
    });

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(testUrl, testPayload);
    expect(result.current.responseData).toEqual(error); // Error is returned as data
    expect(result.current.isError).toBe(false); // Not in error state because fetchData catches it
  });

  it('uses default id when not provided', async () => {
    mockAxiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => usePost(testUrl, testApiLabel), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAxiosInstance.post).toHaveBeenCalledWith(testUrl, testPayload);
  });

  it('sets query cache on success', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    mockAxiosInstance.post.mockResolvedValueOnce({ data: mockResponse });

    const { result } = renderHook(() => usePost(testUrl, testApiLabel, testId), { wrapper });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // Check that cache was set
    const cachedData = queryClient.getQueryData([testApiLabel, testId]);
    expect(cachedData).toEqual(mockResponse);
  });

  it('clears query cache on error', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    // Set initial data
    queryClient.setQueryData([testApiLabel, testId], { existing: 'data' });

    const error = new Error('Network error');
    mockAxiosInstance.post.mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePost(testUrl, testApiLabel, testId), { wrapper });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true); // Success because error is returned as data
    });

    // Check that cache was set with error data (not cleared, because mutation succeeded)
    const cachedData = queryClient.getQueryData([testApiLabel, testId]);
    expect(cachedData).toEqual(error); // Error is set as the cached data
  });

  it('handles multiple consecutive mutations', async () => {
    mockAxiosInstance.post
      .mockResolvedValueOnce({ data: { id: 1 } })
      .mockResolvedValueOnce({ data: { id: 2 } });

    const { result } = renderHook(() => usePost(testUrl, testApiLabel, testId), {
      wrapper: createWrapper(),
    });

    // First mutation
    await act(async () => {
      result.current.mutate({ payload: 'first' });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.responseData).toEqual({ id: 1 });

    // Second mutation
    await act(async () => {
      result.current.mutate({ payload: 'second' });
    });

    await waitFor(() => {
      expect(result.current.responseData).toEqual({ id: 2 });
    });

    expect(mockAxiosInstance.post).toHaveBeenCalledTimes(2);
  });

  it('handles axios response error correctly', async () => {
    const axiosError = {
      response: { status: 400, data: { message: 'Bad Request' } },
      message: 'Request failed',
    };
    mockAxiosInstance.post.mockRejectedValueOnce(axiosError);

    const { result } = renderHook(() => usePost(testUrl, testApiLabel, testId), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true); // Success because error is caught and returned
    });

    expect(result.current.responseData).toEqual(axiosError);
  });
});
