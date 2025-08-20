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
    id: 3,
    name: 'Jab Punch',
    korean: 'Jab Ji Ru Gi',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    description:
      'A quick, snapping punch with the lead hand used for timing, distance, and setting up combinations.',
    target: 'Face, Nose, Solar plexus',
    execution: [
      'Quick extension from chamber',
      'Minimal body movement',
      'Fast retraction after impact',
      'Keep rear hand in guard position',
    ],
    keyPoints: [
      'Speed over power',
      'Minimal telegraphing',
      'Quick retraction after impact',
      'Use for timing and distance',
      'Keep rear hand in guard position',
    ],
    commonMistakes: [
      'Using too much power, losing speed',
      'Dropping guard after punch',
      'Overextending the arm',
      'Poor timing and distance',
      'Not retracting quickly enough',
    ],
    applications: ['Timing tool', 'Distance measurement', 'Combination setup'],
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 4,
    name: 'Side Punch',
    korean: 'Yup Ji Ru Gi',
    belt: 'Purple Belt',
    beltColor: '#800080',
    description:
      'A punch delivered to the side while in a side stance, using the knuckles to strike lateral targets.',
    target: 'Ribs, Kidneys, Side targets',
    execution: [
      'Maintain side stance throughout',
      'Full body rotation for power',
      'Strike with first two knuckles',
      'Follow through completely',
    ],
    keyPoints: [
      'Maintain side stance throughout',
      'Full body rotation for power',
      'Strike with first two knuckles',
      'Follow through completely',
      'Keep opposite hand chambered',
    ],
    commonMistakes: [
      'Losing side stance position',
      'Insufficient body rotation',
      'Poor targeting',
      'Weak follow through',
      'Dropping guard hand',
    ],
    applications: ['Side attack', 'Lateral striking', 'Close range combat'],
    createdAt: null,
    updatedAt: null,
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
      expect(screen.getByText('Jab Punch')).toBeInTheDocument();
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
      expect(screen.getAllByText('(Jab Ji Ru Gi)')).toHaveLength(1);
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
      expect(screen.getByText('Jab Punch')).toBeInTheDocument();
      expect(screen.getByText('Side Punch')).toBeInTheDocument();
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
      expect(screen.getByText('Tang Soo Do Punching Techniques')).toBeInTheDocument();
    });
  });
});
