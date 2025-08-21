import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlocksClient from '../../../app/(DashboardLayout)/blocks/BlocksClient';
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

const mockBlocks = [
  {
    id: 1,
    name: 'High Block',
    description: 'Upward blocking motion',
    difficulty: 'Beginner',
    type: 'Upper',
    beltColor: '#FFFFFF',
  },
  {
    id: 2,
    name: 'Middle Block',
    description: 'Horizontal blocking motion',
    difficulty: 'Beginner',
    type: 'Middle',
    beltColor: '#FFD700',
  },
  {
    id: 3,
    name: 'Low Block',
    description: 'Downward blocking motion',
    difficulty: 'Intermediate',
    type: 'Lower',
    beltColor: '#FF8C00',
  },
];

describe('BlocksClient', () => {
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
        <BlocksClient />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders blocks data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBlocks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BlocksClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tang Soo Do Blocking Techniques')).toBeInTheDocument();
    });
  });

  it('displays training tip alert', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBlocks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BlocksClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Training Tip:')).toBeInTheDocument();
    });
  });

  it('displays block cards grid', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBlocks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BlocksClient />
      </TestWrapper>
    );

    await waitFor(() => {
      // Check for grid container that holds the block cards
      const gridElements = document.querySelectorAll('.MuiGrid-container');
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });

  it('shows add block button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBlocks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BlocksClient />
      </TestWrapper>
    );

    expect(screen.getByText('Add Block')).toBeInTheDocument();
  });

  it('hides add block button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet.mockReturnValue({
      data: mockBlocks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BlocksClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add Block')).not.toBeInTheDocument();
  });

  it('renders page container with correct title', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBlocks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BlocksClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tang Soo Do Blocking Techniques')).toBeInTheDocument();
    });
  });

  it('displays block technique description', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockBlocks,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <BlocksClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Master the essential blocking techniques/)).toBeInTheDocument();
    });
  });
});
