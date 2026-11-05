import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import BeltsClient from '../../../app/(DashboardLayout)/belt-requirements/BeltsClient';
import { mockBeltRequirements } from 'testingUtils/MockData/mockBeltRequirements';
import BeltsLoading from '../../../app/(DashboardLayout)/belt-requirements/loading';
import axiosInstance from 'utils/helpers/AxiosInstance';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock useAuth hook
jest.mock('../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Mock useGet hook
jest.mock('../../../hooks/useGet', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('utils/helpers/AxiosInstance');

const TestWrapper = ({ children, client }: { children: React.ReactNode; client?: QueryClient }) => {
  const queryClient =
    client ??
    new QueryClient({
      defaultOptions: {
        queries: { retry: false, placeholderData: [] },
        mutations: { retry: false },
      },
    });
  const theme = createTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

const mockUseAuth = jest.requireMock('../../../hooks/useAuth').useAuth;
const mockUseGet = jest.requireMock('../../../hooks/useGet').default;

describe('BeltsClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: [],
      isPending: true,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    const loading = screen.getByRole('status', { name: 'Loading belt requirements' });
    expect(loading).toHaveAttribute('aria-busy', 'true');
    expect(loading).toHaveStyle({ minHeight: '100vh' });
    expect(loading.children).toHaveLength(6);
    expect(loading.children[0]).toHaveClass(
      'MuiGrid-grid-xs-12',
      'MuiGrid-grid-md-6',
      'MuiGrid-grid-lg-4'
    );
    expect(screen.getByText('Testing Information')).toBeInTheDocument();
    expect(loading.compareDocumentPosition(screen.getByText('Testing Information'))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(mockUseGet).toHaveBeenCalledWith(
      expect.not.objectContaining({ fallbackData: expect.anything() })
    );
  });

  it('uses the same skeleton layout while server data is loading', () => {
    render(
      <TestWrapper>
        <BeltsLoading />
      </TestWrapper>
    );

    expect(screen.getByRole('status', { name: 'Loading belt requirements' })).toHaveStyle({
      minHeight: '100vh',
    });
    expect(screen.getByText('Tang Soo Do Belt Requirements')).toBeInTheDocument();
    expect(screen.getByText('Testing Information')).toBeInTheDocument();
  });

  it('replaces skeletons with cards after the initial request completes', async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    mockUseGet.mockImplementation(jest.requireActual('../../../hooks/useGet').default);
    const mockedAxios = jest.mocked(axiosInstance);
    let resolveRequest!: (response: { data: typeof mockBeltRequirements }) => void;
    const request = new Promise<{ data: typeof mockBeltRequirements }>((resolve) => {
      resolveRequest = resolve;
    });
    mockedAxios.get.mockReturnValueOnce(request);

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    expect(screen.getByRole('status', { name: 'Loading belt requirements' })).toBeInTheDocument();
    resolveRequest({ data: mockBeltRequirements });

    expect(await screen.findByText('White')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('keeps cached cards visible during background refreshes', async () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    mockUseGet.mockImplementation(jest.requireActual('../../../hooks/useGet').default);
    const client = new QueryClient();
    client.setQueryData(['belt-requirements', 'getAll'], mockBeltRequirements, {
      updatedAt: Date.now() - 120000,
    });
    jest.mocked(axiosInstance).get.mockResolvedValueOnce({ data: mockBeltRequirements });

    render(
      <TestWrapper client={client}>
        <BeltsClient />
      </TestWrapper>
    );

    expect(client.getQueryState(['belt-requirements', 'getAll'])?.fetchStatus).toBe('fetching');
    expect(screen.getByText('White')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(client.getQueryState(['belt-requirements', 'getAll'])?.fetchStatus).toBe('idle');
    });
  });

  it('renders fresh prefetched cards immediately in order without changing the cache', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    mockUseGet.mockImplementation(jest.requireActual('../../../hooks/useGet').default);
    const client = new QueryClient();
    const cachedRequirements = Object.freeze([...mockBeltRequirements].reverse());
    client.setQueryData(['belt-requirements', 'getAll'], cachedRequirements);

    render(
      <TestWrapper client={client}>
        <BeltsClient />
      </TestWrapper>
    );

    expect(screen.getByText('White').compareDocumentPosition(screen.getByText('Gold'))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(jest.mocked(axiosInstance).get).not.toHaveBeenCalled();
    expect(client.getQueryData(['belt-requirements', 'getAll'])).toBe(cachedRequirements);
    expect(cachedRequirements[0].beltRank).toBe('Gold Black');
  });

  it('does not leave skeletons visible after an empty response', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    mockUseGet.mockReturnValue({ data: [], isPending: false, refetch: jest.fn() });

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByText('Testing Information')).toBeInTheDocument();
  });

  it('replaces skeletons with an error and allows retrying a failed request', () => {
    const refetch = jest.fn();
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    mockUseGet.mockReturnValue({
      data: undefined,
      isPending: false,
      isError: true,
      refetch,
    });

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Unable to load belt requirements');
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('renders belts data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBeltRequirements,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tang Soo Do Belt Requirements')).toBeInTheDocument();
    });
  });

  it('displays belt summary cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBeltRequirements,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Testing Information')).toBeInTheDocument();
    });
  });

  it('displays belt items in dashboard cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBeltRequirements,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('White')).toBeInTheDocument();
      expect(screen.getByText('Gold')).toBeInTheDocument();
      expect(screen.getByText('Gold White')).toBeInTheDocument();
    });
  });

  it('shows Add Requirement button for admin users', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBeltRequirements,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Add Requirement')).toBeInTheDocument();
    });
  });

  it('hides add belt button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet.mockReturnValue({
      data: mockBeltRequirements,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add Requirement')).not.toBeInTheDocument();
  });

  it('renders page container with correct title', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBeltRequirements,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BeltsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tang Soo Do Belt Requirements')).toBeInTheDocument();
    });
  });
});
