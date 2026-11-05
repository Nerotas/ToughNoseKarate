import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import SSRWrapper from '../SSRWrapper';
import ConfigValidator from '../../app/config-validator';
import { renderToString } from 'react-dom/server';

jest.mock('../../utils/config/frontend.config', () => ({
  validateRuntimeConfig: jest.fn(),
  shouldEnableDebug: () => false,
}));

// Mock only serverFetch from useGet
const mockServerFetch = jest.fn();
jest.mock('../../hooks/useGet', () => ({
  // preserve other exports if needed in future
  serverFetch: (...args: any[]) => (mockServerFetch as any)(...args),
}));

// Utility to create a QueryClient for each test
// Must mirror SSRWrapper's server-side defaults for staleTime/refetch to avoid an immediate refetch
// that would overwrite the dehydrated prefetched data with the dummy queryFn result.
const createClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 60 * 1000, // match SSRWrapper
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });

// Test consumer that will read the prefetched data
const Consumer = ({ queryKey, enabled = true }: { queryKey: string[]; enabled?: boolean }) => {
  const dummyFn = jest.fn().mockResolvedValue('SHOULD_NOT_RUN');
  const { data, status } = useQuery({ queryKey, queryFn: dummyFn, enabled });
  return (
    <div data-testid='consumer' data-status={status}>
      {data ? JSON.stringify(data) : 'no-data'}
    </div>
  );
};

describe('SSRWrapper', () => {
  beforeEach(() => {
    mockServerFetch.mockReset();
  });

  it('prefetches and hydrates queries (single key auto id)', async () => {
    const serverData = [{ id: 1, name: 'Prefetched Item' }];
    mockServerFetch.mockResolvedValueOnce(serverData);

    const element = await SSRWrapper({
      // SSRWrapper will expand ['stances-definitions'] to ['stances-definitions','getAll'] for the queryKey it stores
      // So the consumer must request that expanded key to read the hydrated cache.
      children: <Consumer queryKey={['stances-definitions', 'getAll']} />,
      queries: [
        {
          queryKey: ['stances-definitions'],
          url: '/stances-definitions',
        },
      ],
    });

    const qc = createClient();
    render(<QueryClientProvider client={qc}>{element}</QueryClientProvider>);

    // serverFetch called once with provided URL (SSRWrapper augments version internally in serverFetch)
    expect(mockServerFetch).toHaveBeenCalledTimes(1);
    expect(mockServerFetch).toHaveBeenCalledWith('/stances-definitions');

    const consumer = await screen.findByTestId('consumer');
    expect(consumer).toHaveAttribute('data-status', 'success');
    expect(consumer).toHaveTextContent('Prefetched Item');
  });

  it('logs failed server fetches and leaves the client able to retry', async () => {
    const error = new Error('network fail');
    const warning = jest.spyOn(console, 'warn').mockImplementation();
    mockServerFetch.mockRejectedValueOnce(error);

    const element = await SSRWrapper({
      children: <Consumer queryKey={['error-query', 'getAll']} enabled={false} />,
      queries: [
        {
          queryKey: ['error-query'],
          url: '/error-query',
        },
      ],
      // default fallbackOnError true
    });

    const qc = createClient();
    render(<QueryClientProvider client={qc}>{element}</QueryClientProvider>);

    const consumer = await screen.findByTestId('consumer');
    expect(consumer).toHaveTextContent('no-data');
    expect(mockServerFetch).toHaveBeenCalledTimes(1);
    expect(warning).toHaveBeenCalledWith('Failed to prefetch query error-query:', error);
    warning.mockRestore();
  });

  it('server-renders prefetched content and hydrates it without losing the cache', async () => {
    const data = [{ id: 1, name: 'Server-rendered requirement' }];
    mockServerFetch.mockResolvedValueOnce(data);
    const element = await SSRWrapper({
      children: <Consumer queryKey={['requirements', 'getAll']} />,
      queries: [{ queryKey: ['requirements'], url: '/requirements' }],
    });
    const container = document.createElement('div');
    container.innerHTML = renderToString(
      <QueryClientProvider client={createClient()}>
        <ConfigValidator>{element}</ConfigValidator>
      </QueryClientProvider>
    );
    expect(container.textContent).toContain('Server-rendered requirement');

    const client = createClient();
    const recoverableError = jest.fn();
    render(
      <QueryClientProvider client={client}>
        <ConfigValidator>{element}</ConfigValidator>
      </QueryClientProvider>,
      { container, hydrate: true, onRecoverableError: recoverableError }
    );

    expect(container.textContent).toContain('Server-rendered requirement');
    expect(client.getQueryData(['requirements', 'getAll'])).toEqual(data);
    expect(mockServerFetch).toHaveBeenCalledTimes(1);
    expect(recoverableError).not.toHaveBeenCalled();
  });

  it('propagates error when fallbackOnError=false', async () => {
    mockServerFetch.mockRejectedValueOnce(new Error('fatal'));

    await expect(
      SSRWrapper({
        children: <div>Child</div>,
        queries: [
          {
            queryKey: ['fatal-query'],
            url: '/fatal-query',
          },
        ],
        fallbackOnError: false,
      })
    ).rejects.toThrow('fatal');
  });
});
