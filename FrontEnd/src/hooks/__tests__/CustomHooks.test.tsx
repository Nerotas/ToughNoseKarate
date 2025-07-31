import { renderHook, waitFor, cleanup } from '@testing-library/react';
import { useGet, usePost, useDelete, usePut, usePrefetch, useMutationData } from 'hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'testingUtils/axiosInstanceMock';
import axiosMSALInstance from 'helpers/AxiosInstance'; // Adjust the import path as necessary
afterEach(cleanup);

jest.mock('@azure/msal-browser', () => {
  const lib = jest.requireActual('@azure/msal-browser');
  class PublicClientApplication {
    loginPopup = jest.fn();
    logout = jest.fn();
  }
  return {
    ...lib,
    PublicClientApplication,
  };
});

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

it('useGet should return mocked Data', async () => {
  const simulateMockGet = jest.spyOn(axiosMSALInstance, 'get');
  const mockData = ['foo', 'bar'];
  simulateMockGet.mockResolvedValue({ data: mockData });
  const { result } = renderHook(
    () =>
      useGet({
        url: `/test`,
        apiLabel: `test`,
      }),
    {
      wrapper: createWrapper(),
    }
  );

  // Query starts
  await waitFor(() => result.current);
  expect(result.current.isLoading).toBeTruthy();
  expect(result.current.isFetching).toBeTruthy();

  // ✅ wait until the query has transitioned to success state
  await waitFor(() => result.current.isSuccess === true);

  if (result.current.isSuccess) {
    expect(result.current.data).toStrictEqual(mockData);
  }
});

it('usePost should return mocked Data', async () => {
  const simulateMockPost = jest.spyOn(axiosMSALInstance, 'post');
  const mockData = { message: 'item updated' };
  simulateMockPost.mockResolvedValue({ data: mockData });
  const { result } = renderHook(() => usePost(`/test`, ['test']), {
    wrapper: createWrapper(),
  });

  // ✅ wait until the query has transitioned to success state
  await waitFor(() => result.current);
  await result.current.mutateAsync();
  await waitFor(() => result.current.isSuccess);

  if (result.current.isSuccess) {
    expect(result.current.responseData).toStrictEqual(mockData);
  }
});

it('usePut should return mocked Data', async () => {
  const simulateMockPut = jest.spyOn(axiosMSALInstance, 'put');
  const mockData = { message: 'item updated' };
  simulateMockPut.mockResolvedValue({ data: mockData });
  const { result } = renderHook(() => usePut(`/test`), {
    wrapper: createWrapper(),
  });

  // ✅ wait until the query has transitioned to success state
  await waitFor(() => result.current);
  await result.current.mutateAsync(mockData);
  await waitFor(() => result.current.isIdle === false);

  if (result.current.isSuccess) {
    expect(result.current.data).toStrictEqual(mockData);
  }
});

it('useDelete should return mocked Data', async () => {
  const simulateMockDelete = jest.spyOn(axiosMSALInstance, 'delete');
  const mockData = { message: 'item updated' };
  simulateMockDelete.mockResolvedValue({ data: mockData });
  const { result } = renderHook(() => useDelete(`/test`), {
    wrapper: createWrapper(),
  });

  // ✅ wait until the query has transitioned to success state
  await waitFor(() => result.current);
  result.current.mutate();
  await waitFor(() => result.current.isIdle === false);

  if (result.current.isSuccess) {
    expect(result.current.data).toStrictEqual({ data: mockData });
  }
});

it('usePrefetch should prefetch data', async () => {
  const simulateMockGet = jest.spyOn(axiosMSALInstance, 'get');
  const mockData = ['foo', 'bar'];
  simulateMockGet.mockResolvedValue({ data: mockData });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  renderHook(() => usePrefetch({ apiLabel: 'test', url: '/test' }), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  await waitFor(() => {
    const cachedData = queryClient.getQueryData(['test', '0']);
    expect(cachedData).toStrictEqual(mockData);
  });
});

it('MutationData should return cached data', async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const mockData = ['foo', 'bar'];
  queryClient.setQueryData(['test', '0'], mockData);

  const { result } = renderHook(() => useMutationData<typeof mockData>(['test', '0']), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  expect(result.current);
});
