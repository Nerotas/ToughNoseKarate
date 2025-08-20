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
    name: 'Step 1 (Left)',
    korean: 'Il Su Sik',
    belt: 'Purple White',
    beltColor: '#800080',
    description: 'First basic one-step sequence for Purple White belt students.',
    attack: 'Right straight punch to chest',
    defense: ['Left outside block', 'Right reverse punch counter', 'Return to ready position'],
    keyPoints: [
      'Proper outside block technique',
      'Immediate counter after block',
      'Maintain balance throughout',
      'Strong chamber position',
    ],
    commonMistakes: [
      'Weak blocking technique',
      'Delayed counter attack',
      'Poor stance during block',
      'Not returning to ready',
    ],
    applications: ['Basic self-defense', 'Timing development', 'Block-counter combination'],
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 2,
    name: 'Step 1 (Right)',
    korean: 'Il Su Sik',
    belt: 'Purple',
    beltColor: '#800080',
    description: 'First basic one-step sequence for Purple belt students (right side).',
    attack: 'Left straight punch to chest',
    defense: ['Right outside block', 'Left reverse punch counter', 'Return to ready position'],
    keyPoints: [
      'Mirror technique of step 1 left',
      'Strong right outside block',
      'Quick left counter punch',
      'Balanced execution',
    ],
    commonMistakes: [
      'Confusion with left/right sides',
      'Inconsistent block strength',
      'Poor counter timing',
      'Unbalanced stance',
    ],
    applications: ['Ambidextrous training', 'Basic defense', 'Coordination development'],
    createdAt: null,
    updatedAt: null,
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
