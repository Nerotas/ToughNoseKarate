import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import BeltsClient from '../../../app/(DashboardLayout)/belt-requirements/BeltsClient';
import { mockBeltRequirements } from 'testingUtils/MockData/mockBeltRequirements';

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

// Mock loading component
jest.mock('../../../app/loading', () => {
  return function Loading() {
    return <div data-testid='loading'>Loading...</div>;
  };
});

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
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

const mockUseAuth = require('../../../hooks/useAuth').useAuth;
const mockUseGet = require('../../../hooks/useGet').default;

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

    expect(screen.getByTestId('loading')).toBeInTheDocument();
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
