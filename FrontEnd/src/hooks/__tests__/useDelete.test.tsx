import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import useDelete from '../useDelete';

// Mock axiosInstance
jest.mock('utils/helpers/AxiosInstance', () => ({
  __esModule: true,
  default: {
    delete: jest.fn(),
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

describe('useDelete hook', () => {
  const testUrl = '/test-endpoint/123';
  const mockDeleteResponse = { data: { deleted: true, id: 123 } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns mutation object with expected properties', () => {
    const { result } = renderHook(() => useDelete(testUrl), {
      wrapper: createWrapper(),
    });

    expect(result.current).toHaveProperty('mutate');
    expect(result.current).toHaveProperty('data');
    expect(result.current).toHaveProperty('isIdle');
    expect(result.current).toHaveProperty('isPending');
    expect(result.current).toHaveProperty('isError');
    expect(result.current).toHaveProperty('isSuccess');
    expect(result.current).toHaveProperty('error');
    expect(typeof result.current.mutate).toBe('function');
  });

  it('handles successful DELETE request', async () => {
    mockAxiosInstance.delete.mockResolvedValueOnce(mockDeleteResponse);

    const { result } = renderHook(() => useDelete(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith(testUrl, undefined);
    expect(result.current.data).toEqual(mockDeleteResponse);
    expect(result.current.isError).toBe(false);
  });

  it('handles DELETE request failure', async () => {
    const error = new Error('Delete failed');
    mockAxiosInstance.delete.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useDelete(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith(testUrl, undefined);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(error);
    expect(result.current.isSuccess).toBe(false);
  });

  it('passes additional data to axios delete', async () => {
    const additionalData = { reason: 'No longer needed' };
    mockAxiosInstance.delete.mockResolvedValueOnce(mockDeleteResponse);

    const { result } = renderHook(() => useDelete(testUrl, additionalData), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith(testUrl, additionalData);
  });

  it('handles 204 No Content response', async () => {
    const noContentResponse = { status: 204, data: null };
    mockAxiosInstance.delete.mockResolvedValueOnce(noContentResponse);

    const { result } = renderHook(() => useDelete(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(noContentResponse);
  });

  it('handles multiple consecutive delete requests', async () => {
    mockAxiosInstance.delete
      .mockResolvedValueOnce({ data: { deleted: true, id: 1 } })
      .mockResolvedValueOnce({ data: { deleted: true, id: 2 } });

    const { result: result1 } = renderHook(() => useDelete('/posts/1'), {
      wrapper: createWrapper(),
    });

    const { result: result2 } = renderHook(() => useDelete('/posts/2'), {
      wrapper: createWrapper(),
    });

    // First delete
    await act(async () => {
      result1.current.mutate();
    });

    await waitFor(() => {
      expect(result1.current.isSuccess).toBe(true);
    });

    // Second delete
    await act(async () => {
      result2.current.mutate();
    });

    await waitFor(() => {
      expect(result2.current.isSuccess).toBe(true);
    });

    expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(2);
    expect(mockAxiosInstance.delete).toHaveBeenNthCalledWith(1, '/posts/1', undefined);
    expect(mockAxiosInstance.delete).toHaveBeenNthCalledWith(2, '/posts/2', undefined);
  });

  it('handles 404 Not Found error', async () => {
    const notFoundError = {
      response: { status: 404, data: { message: 'Resource not found' } },
      message: 'Request failed with status code 404',
    };
    mockAxiosInstance.delete.mockRejectedValueOnce(notFoundError);

    const { result } = renderHook(() => useDelete(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(notFoundError);
  });

  it('handles 403 Forbidden error', async () => {
    const forbiddenError = {
      response: { status: 403, data: { message: 'Insufficient permissions' } },
      message: 'Request failed with status code 403',
    };
    mockAxiosInstance.delete.mockRejectedValueOnce(forbiddenError);

    const { result } = renderHook(() => useDelete(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(forbiddenError);
  });

  it('handles network errors', async () => {
    const networkError = new Error('Network Error');
    networkError.name = 'NetworkError';
    mockAxiosInstance.delete.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => useDelete(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(networkError);
  });

  it('can be called multiple times on same hook instance', async () => {
    mockAxiosInstance.delete
      .mockResolvedValueOnce({ data: { attempt: 1 } })
      .mockResolvedValueOnce({ data: { attempt: 2 } });

    const { result } = renderHook(() => useDelete(testUrl), {
      wrapper: createWrapper(),
    });

    // First call
    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({ data: { attempt: 1 } });

    // Second call on same instance
    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({ data: { attempt: 2 } });
    });

    expect(mockAxiosInstance.delete).toHaveBeenCalledTimes(2);
  });

  it('works with different data configurations', async () => {
    const configWithHeaders = {
      headers: { 'Custom-Header': 'value' },
      data: { cascadeDelete: true },
    };

    mockAxiosInstance.delete.mockResolvedValueOnce(mockDeleteResponse);

    const { result } = renderHook(() => useDelete(testUrl, configWithHeaders), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAxiosInstance.delete).toHaveBeenCalledWith(testUrl, configWithHeaders);
  });
});
