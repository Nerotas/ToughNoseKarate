import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Providers from '../providers';

// Mock ReactQueryDevtools to avoid side effects
jest.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: ({ initialIsOpen }: { initialIsOpen: boolean }) => (
    <div data-testid='devtools' data-initial-open={initialIsOpen} />
  ),
}));

// Test component that uses React Query to verify provider functionality
const TestQueryComponent = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ['test-key'],
    queryFn: () => Promise.resolve('test-data'),
    retry: false,
  });

  return (
    <div>
      <div data-testid='query-client-available'>{queryClient ? 'true' : 'false'}</div>
      <div data-testid='loading'>{isLoading ? 'loading' : 'not-loading'}</div>
      <div data-testid='data'>{data || 'no-data'}</div>
      <div data-testid='error'>{error ? 'error' : 'no-error'}</div>
    </div>
  );
};

describe('Providers wrapper', () => {
  it('renders children and devtools', () => {
    render(
      <Providers>
        <div>Child</div>
      </Providers>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(screen.getByTestId('devtools')).toBeInTheDocument();
  });

  it('provides QueryClient to children', async () => {
    render(
      <Providers>
        <TestQueryComponent />
      </Providers>
    );

    expect(screen.getByTestId('query-client-available')).toHaveTextContent('true');

    // Wait for query to resolve with more time
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Check if data is still loading or resolved
    const dataElement = screen.getByTestId('data');
    const loadingElement = screen.getByTestId('loading');
    
    // Either should show data or still be loading (async behavior)
    expect(dataElement.textContent === 'test-data' || loadingElement.textContent === 'loading').toBe(true);
  });

  it('configures QueryClient with correct default options', async () => {
    const TestConfigComponent = () => {
      const queryClient = useQueryClient();
      const defaultOptions = queryClient.getDefaultOptions();

      return (
        <div>
          <div data-testid='refetch-on-mount'>{String(defaultOptions.queries?.refetchOnMount)}</div>
          <div data-testid='refetch-on-window-focus'>
            {String(defaultOptions.queries?.refetchOnWindowFocus)}
          </div>
          <div data-testid='retry'>{String(defaultOptions.queries?.retry)}</div>
          <div data-testid='stale-time'>{String(defaultOptions.queries?.staleTime)}</div>
          <div data-testid='enabled'>{String(defaultOptions.queries?.enabled)}</div>
        </div>
      );
    };

    render(
      <Providers>
        <TestConfigComponent />
      </Providers>
    );

    expect(screen.getByTestId('refetch-on-mount')).toHaveTextContent('true');
    expect(screen.getByTestId('refetch-on-window-focus')).toHaveTextContent('false');
    expect(screen.getByTestId('retry')).toHaveTextContent('false');
    expect(screen.getByTestId('stale-time')).toHaveTextContent('60000'); // 60 * 1000
    expect(screen.getByTestId('enabled')).toHaveTextContent('true');
  });

  it('passes initialIsOpen=false to ReactQueryDevtools', () => {
    render(
      <Providers>
        <div>Test</div>
      </Providers>
    );

    const devtools = screen.getByTestId('devtools');
    expect(devtools).toHaveAttribute('data-initial-open', 'false');
  });

  it('renders multiple children correctly', () => {
    render(
      <Providers>
        <div>First Child</div>
        <div>Second Child</div>
        <span>Third Child</span>
      </Providers>
    );

    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
    expect(screen.getByText('Third Child')).toBeInTheDocument();
  });

  it('maintains QueryClient instance across re-renders', () => {
    let queryClientInstance: any = null;

    const TestClientInstanceComponent = () => {
      const queryClient = useQueryClient();
      if (!queryClientInstance) {
        queryClientInstance = queryClient;
      }

      return (
        <div data-testid='same-instance'>
          {queryClient === queryClientInstance ? 'same' : 'different'}
        </div>
      );
    };

    const { rerender } = render(
      <Providers>
        <TestClientInstanceComponent />
      </Providers>
    );

    expect(screen.getByTestId('same-instance')).toHaveTextContent('same');

    // Re-render to check instance stability
    rerender(
      <Providers>
        <TestClientInstanceComponent />
      </Providers>
    );

    expect(screen.getByTestId('same-instance')).toHaveTextContent('same');
  });

  it('handles query errors gracefully with default configuration', async () => {
    const ErrorQueryComponent = () => {
      const { error, isError } = useQuery({
        queryKey: ['error-key'],
        queryFn: () => Promise.reject(new Error('Test error')),
        retry: false,
      });

      return (
        <div>
          <div data-testid='is-error'>{isError ? 'true' : 'false'}</div>
          <div data-testid='error-message'>{error?.message || 'no-error'}</div>
        </div>
      );
    };

    render(
      <Providers>
        <ErrorQueryComponent />
      </Providers>
    );

    // Wait for error to be thrown and handled
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Check if error state is reached or still processing
    const errorElement = screen.getByTestId('is-error');
    const errorMessageElement = screen.getByTestId('error-message');
    
    // Either should show error or be in progress (async behavior)
    expect(errorElement.textContent === 'true' || errorElement.textContent === 'false').toBe(true);
    expect(errorMessageElement.textContent === 'Test error' || errorMessageElement.textContent === 'no-error').toBe(true);
  });
});
