import { renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import useGet from '../useGet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axiosInstance from 'utils/helpers/AxiosInstance';

// Mock axios instance
jest.mock('utils/helpers/AxiosInstance');
const mockedAxios = axiosInstance as jest.Mocked<typeof axiosInstance>;

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('useGet Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data successfully', async () => {
    const mockData = { id: 1, name: 'Test Data' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(
      () =>
        useGet({
          apiLabel: 'test',
          url: '/test',
        }),
      { wrapper: TestWrapper }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
      expect(result.current.isSuccess).toBe(true);
    });
  });

  it('handles error states', async () => {
    const mockError = new Error('Network error');
    mockedAxios.get.mockRejectedValueOnce(mockError);

    const { result } = renderHook(
      () =>
        useGet({
          apiLabel: 'test-error',
          url: '/test-error',
          options: {
            retry: false,
            retryDelay: 0,
          },
        }),
      { wrapper: TestWrapper }
    );

    await waitFor(
      () => {
        expect(result.current.isError).toBe(true);
      },
      { timeout: 5000 }
    );
  });

  it('uses fallback data when provided', () => {
    const fallbackData = { id: 0, name: 'Fallback' };

    const { result } = renderHook(
      () =>
        useGet({
          apiLabel: 'test-fallback',
          url: '/test-fallback',
          fallbackData,
        }),
      { wrapper: TestWrapper }
    );

    expect(result.current.data).toEqual(fallbackData);
  });

  it('constructs query key correctly with id', async () => {
    const mockData = { id: 5, name: 'Test with ID' };
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(
      () =>
        useGet({
          apiLabel: 'test-with-id',
          url: '/test/5',
          id: '5',
        }),
      { wrapper: TestWrapper }
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockData);
    });
  });

  it('passes custom headers', async () => {
    const mockData = { message: 'success' };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    renderHook(
      () =>
        useGet({
          apiLabel: 'test-headers',
          url: '/test-headers',
          headers: { 'X-Custom-Header': 'test-value' } as any,
        }),
      { wrapper: TestWrapper }
    );

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith('/test-headers', {
        headers: { 'X-Custom-Header': 'test-value' },
      });
    });
  });
});
