import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StancesClient from '../StancesClient';
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

const mockStances = [
  {
    id: 1,
    name: 'Front Stance',
    description: 'Basic forward stance',
    difficulty: 'Beginner',
    type: 'Forward',
    beltColor: '#FFFFFF',
  },
  {
    id: 2,
    name: 'Horse Stance',
    description: 'Wide stance for stability',
    difficulty: 'Intermediate',
    type: 'Neutral',
    beltColor: '#FFD700',
  },
  {
    id: 3,
    name: 'Cat Stance',
    description: 'Light on front foot',
    difficulty: 'Advanced',
    type: 'Backward',
    beltColor: '#FF8C00',
  },
];

describe('StancesClient', () => {
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
        <StancesClient />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders stances data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockStances,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <StancesClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Stances')).toBeInTheDocument();
    });
  });

  it('displays stance summary cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockStances,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <StancesClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Total Stances')).toBeInTheDocument();
    });
  });

  it('displays stance items in dashboard cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockStances,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <StancesClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Front Stance')).toBeInTheDocument();
      expect(screen.getByText('Horse Stance')).toBeInTheDocument();
      expect(screen.getByText('Cat Stance')).toBeInTheDocument();
    });
  });

  it('shows add stance button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockStances,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <StancesClient />
      </TestWrapper>
    );

    expect(screen.getByText('Add Stance')).toBeInTheDocument();
  });

  it('hides add stance button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet.mockReturnValue({
      data: mockStances,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <StancesClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add Stance')).not.toBeInTheDocument();
  });

  it('renders page container with correct title', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockStances,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <StancesClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Stances')).toBeInTheDocument();
    });
  });
});
