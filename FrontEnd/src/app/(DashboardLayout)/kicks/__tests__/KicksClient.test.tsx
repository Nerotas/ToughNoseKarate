import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import KicksClient from '../KicksClient';
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

const mockKicks = [
  {
    id: 1,
    name: 'Front Kick',
    description: 'Basic forward kick',
    difficulty: 'Beginner',
    type: 'Linear',
    beltColor: '#FFFFFF',
  },
  {
    id: 2,
    name: 'Roundhouse Kick',
    description: 'Circular kick to the side',
    difficulty: 'Intermediate',
    type: 'Circular',
    beltColor: '#FFD700',
  },
  {
    id: 3,
    name: 'Side Kick',
    description: 'Power kick to the side',
    difficulty: 'Advanced',
    type: 'Linear',
    beltColor: '#FF8C00',
  },
];

describe('KicksClient', () => {
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
        <KicksClient />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders kicks data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockKicks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <KicksClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Kicks')).toBeInTheDocument();
    });
  });

  it('displays kick summary cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockKicks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <KicksClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Total Kicks')).toBeInTheDocument();
    });
  });

  it('displays kick items in dashboard cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockKicks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <KicksClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Front Kick')).toBeInTheDocument();
      expect(screen.getByText('Roundhouse Kick')).toBeInTheDocument();
      expect(screen.getByText('Side Kick')).toBeInTheDocument();
    });
  });

  it('shows add kick button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockKicks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <KicksClient />
      </TestWrapper>
    );

    expect(screen.getByText('Add Kick')).toBeInTheDocument();
  });

  it('hides add kick button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet.mockReturnValue({
      data: mockKicks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <KicksClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add Kick')).not.toBeInTheDocument();
  });

  it('renders page container with correct title', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockKicks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <KicksClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Kicks')).toBeInTheDocument();
    });
  });
});
