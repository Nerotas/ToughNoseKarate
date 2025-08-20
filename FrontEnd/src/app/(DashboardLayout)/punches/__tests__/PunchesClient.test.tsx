import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PunchesClient from '../PunchesClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock useAuth hook
jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Mock useGet hook
jest.mock('../../../../hooks/useGet', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock loading component
jest.mock('../../../../app/loading', () => {
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

const mockUseAuth = require('../../../../hooks/useAuth').useAuth;
const mockUseGet = require('../../../../hooks/useGet').default;

const mockPunches = [
  {
    id: 1,
    name: 'Jab',
    description: 'Quick straight punch',
    level: 'Beginner',
    type: 'Linear',
  },
  {
    id: 2,
    name: 'Cross',
    description: 'Power punch with rear hand',
    level: 'Beginner',
    type: 'Linear',
  },
  {
    id: 3,
    name: 'Hook',
    description: 'Circular punch',
    level: 'Intermediate',
    type: 'Circular',
  },
];

describe('PunchesClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: undefined,
      isPending: true,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <PunchesClient />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders punches data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockPunches,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <PunchesClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Punches')).toBeInTheDocument();
    });
  });

  it('displays punch summary cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockPunches,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <PunchesClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Total Punches')).toBeInTheDocument();
    });
  });

  it('displays punch items in dashboard cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockPunches,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <PunchesClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Jab')).toBeInTheDocument();
      expect(screen.getByText('Cross')).toBeInTheDocument();
      expect(screen.getByText('Hook')).toBeInTheDocument();
    });
  });

  it('shows add punch button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockPunches,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <PunchesClient />
      </TestWrapper>
    );

    expect(screen.getByText('Add Punch')).toBeInTheDocument();
  });

  it('hides add punch button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet.mockReturnValue({
      data: mockPunches,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <PunchesClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add Punch')).not.toBeInTheDocument();
  });

  it('renders page container with correct title', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockPunches,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <PunchesClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Punches')).toBeInTheDocument();
    });
  });
});
