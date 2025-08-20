import { renderHook, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import usePut from '../usePut';

// Mock axiosInstance
jest.mock('utils/helpers/AxiosInstance', () => ({
  __esModule: true,
  default: {
    put: jest.fn(),
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

describe('usePut hook', () => {
  const testUrl = '/test-endpoint/123';
  const testPayload = { name: 'Updated Name', value: 456 };
  const mockResponse = { data: { id: 123, message: 'Updated' } };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns mutation object with expected properties', () => {
    const { result } = renderHook(() => usePut(testUrl), {
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

  it('handles successful PUT request', async () => {
    mockAxiosInstance.put.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => usePut<{ id: number; message: string }>(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAxiosInstance.put).toHaveBeenCalledWith(testUrl, testPayload);
    expect(result.current.data).toEqual(mockResponse.data);
    expect(result.current.isError).toBe(false);
  });

  it('handles PUT request failure', async () => {
    const error = new Error('Update failed');
    mockAxiosInstance.put.mockRejectedValueOnce(error);

    const { result } = renderHook(() => usePut(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(mockAxiosInstance.put).toHaveBeenCalledWith(testUrl, testPayload);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toEqual(error);
    expect(result.current.isSuccess).toBe(false);
  });

  it('handles response without data property', async () => {
    const responseWithoutData = { id: 123, message: 'Direct response' };
    mockAxiosInstance.put.mockResolvedValueOnce(responseWithoutData);

    const { result } = renderHook(() => usePut(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeUndefined(); // Since response.data is undefined
  });

  it('handles nested data extraction correctly', async () => {
    const nestedResponse = {
      data: {
        id: 123,
        name: 'Updated Item',
        nested: { value: 'test' },
      },
    };
    mockAxiosInstance.put.mockResolvedValueOnce(nestedResponse);

    const { result } = renderHook(
      () => usePut<{ id: number; name: string; nested: { value: string } }>(testUrl),
      {
        wrapper: createWrapper(),
      }
    );

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(nestedResponse.data);
  });

  it('handles multiple consecutive PUT requests', async () => {
    mockAxiosInstance.put
      .mockResolvedValueOnce({ data: { id: 1, version: 1 } })
      .mockResolvedValueOnce({ data: { id: 1, version: 2 } });

    const { result } = renderHook(() => usePut<{ id: number; version: number }>(testUrl), {
      wrapper: createWrapper(),
    });

    // First PUT
    await act(async () => {
      result.current.mutate({ update: 'first' });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual({ id: 1, version: 1 });

    // Second PUT
    await act(async () => {
      result.current.mutate({ update: 'second' });
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({ id: 1, version: 2 });
    });

    expect(mockAxiosInstance.put).toHaveBeenCalledTimes(2);
  });

  it('handles axios response with status codes', async () => {
    const responseWithStatus = {
      data: { id: 123, updated: true },
      status: 200,
      statusText: 'OK',
    };
    mockAxiosInstance.put.mockResolvedValueOnce(responseWithStatus);

    const { result } = renderHook(() => usePut<{ id: number; updated: boolean }>(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(responseWithStatus.data);
  });

  it('handles network errors appropriately', async () => {
    const networkError = new Error('Network Error');
    networkError.name = 'NetworkError';
    mockAxiosInstance.put.mockRejectedValueOnce(networkError);

    const { result } = renderHook(() => usePut(testUrl), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(testPayload);
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(networkError);
    expect(result.current.data).toBeUndefined();
  });

  it('works with different payload types', async () => {
    const stringPayload = 'simple string';
    const arrayPayload = [1, 2, 3];
    const objectPayload = { complex: { nested: 'object' } };

    mockAxiosInstance.put
      .mockResolvedValueOnce({ data: { type: 'string' } })
      .mockResolvedValueOnce({ data: { type: 'array' } })
      .mockResolvedValueOnce({ data: { type: 'object' } });

    const { result } = renderHook(() => usePut(testUrl), {
      wrapper: createWrapper(),
    });

    // String payload
    await act(async () => {
      result.current.mutate(stringPayload);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(mockAxiosInstance.put).toHaveBeenLastCalledWith(testUrl, stringPayload);

    // Array payload
    await act(async () => {
      result.current.mutate(arrayPayload);
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({ type: 'array' });
    });

    expect(mockAxiosInstance.put).toHaveBeenLastCalledWith(testUrl, arrayPayload);

    // Object payload
    await act(async () => {
      result.current.mutate(objectPayload);
    });

    await waitFor(() => {
      expect(result.current.data).toEqual({ type: 'object' });
    });

    expect(mockAxiosInstance.put).toHaveBeenLastCalledWith(testUrl, objectPayload);
  });
});
