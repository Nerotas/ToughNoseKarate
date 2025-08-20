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
    korean: 'Ahp Cha Gi',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    description: 'A straight, linear kick using the ball of the foot or heel to strike forward.',
    target: 'Solar plexus, Ribs, Knee, Groin',
    execution: [
      'Chamber knee to chest level',
      'Extend leg straight forward',
      'Strike with ball of foot',
      'Snap leg back after impact',
    ],
    keyPoints: [
      'Chamber knee to chest level',
      'Keep supporting leg slightly bent',
      'Strike with ball of foot',
      'Snap leg back after impact',
      'Maintain balance throughout',
    ],
    commonMistakes: [
      'Not chambering knee high enough',
      'Kicking with toes instead of ball of foot',
      'Leaning back during kick',
      'Not snapping leg back',
      'Poor balance on supporting leg',
    ],
    applications: ['Distance keeping', 'Solar plexus attack', 'Knee strike'],
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 2,
    name: 'Roundhouse Kick',
    korean: 'Dol Lyeo Cha Gi',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    description:
      'A circular kick using the top of the foot or shin to strike the side of the target.',
    target: 'Ribs, Liver, Head, Thigh',
    execution: [
      'Chamber knee to side',
      'Rotate hips completely',
      'Whip leg in circular motion',
      'Strike with top of foot',
    ],
    keyPoints: [
      'Chamber knee to side',
      'Rotate hips completely',
      'Strike with top of foot',
      'Keep supporting leg stable',
      'Follow through with hip rotation',
    ],
    commonMistakes: [
      'Not rotating hips enough',
      'Kicking in straight line instead of arc',
      'Poor chamber position',
      'Striking with shin instead of foot',
      'Losing balance on pivot foot',
    ],
    applications: ['Side attack', 'Liver shot', 'Head kick'],
    createdAt: null,
    updatedAt: null,
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
      expect(screen.getByText('Tang Soo Do Kicking Techniques')).toBeInTheDocument();
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
