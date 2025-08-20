import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OneStepsClient from '../OneStepsClient';
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

const mockOneSteps = [
  {
    id: 1,
    name: 'Basic One Step #1',
    description: 'Simple step and punch combination',
    difficulty: 'Beginner',
    type: 'Linear',
    beltColor: '#FFFFFF',
    attackType: 'Punch',
    defenseType: 'Block and Counter',
  },
  {
    id: 2,
    name: 'Basic One Step #2',
    description: 'Step and kick combination',
    difficulty: 'Intermediate',
    type: 'Circular',
    beltColor: '#FFD700',
    attackType: 'Kick',
    defenseType: 'Dodge and Counter',
  },
  {
    id: 3,
    name: 'Advanced One Step #1',
    description: 'Complex multi-move sequence',
    difficulty: 'Advanced',
    type: 'Mixed',
    beltColor: '#FF8C00',
    attackType: 'Mixed',
    defenseType: 'Multiple Techniques',
  },
];

describe('OneStepsClient', () => {
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
        <OneStepsClient />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders one steps data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockOneSteps,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <OneStepsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('One Steps')).toBeInTheDocument();
    });
  });

  it('displays one step summary cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockOneSteps,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <OneStepsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Total One Steps')).toBeInTheDocument();
    });
  });

  it('displays one step items in dashboard cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockOneSteps,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <OneStepsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Basic One Step #1')).toBeInTheDocument();
      expect(screen.getByText('Basic One Step #2')).toBeInTheDocument();
      expect(screen.getByText('Advanced One Step #1')).toBeInTheDocument();
    });
  });

  it('shows add one step button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockOneSteps,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <OneStepsClient />
      </TestWrapper>
    );

    expect(screen.getByText('Add One Step')).toBeInTheDocument();
  });

  it('hides add one step button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet.mockReturnValue({
      data: mockOneSteps,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <OneStepsClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add One Step')).not.toBeInTheDocument();
  });

  it('renders page container with correct title', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockOneSteps,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <OneStepsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('One Steps')).toBeInTheDocument();
    });
  });
});
