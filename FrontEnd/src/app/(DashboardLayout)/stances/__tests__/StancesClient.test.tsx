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
    name: 'Ready Stance',
    korean: 'Joon Bi Sogi',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    description: 'The preparatory stance used before beginning techniques or forms.',
    position: 'Feet shoulder-width apart, toes pointing forward',
    bodyPosition: 'Hands in fists at belt level, elbows slightly bent',
    keyPoints: [
      'Feet parallel, shoulder-width apart',
      'Slight bend in knees',
      'Fists at waist level',
      'Elbows close to body',
      'Balanced weight distribution',
    ],
    commonMistakes: [
      'Feet too wide or narrow',
      'Hands too high or low',
      'Locking knees',
      'Leaning forward or back',
    ],
    applications: ['Starting position for techniques', 'Forms preparation'],
    createdAt: '2025-07-30T23:35:50.000Z',
    updatedAt: '2025-07-30T23:35:50.000Z',
  },
  {
    id: 2,
    name: 'At Attention',
    korean: 'Charyot Sogi',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    description: 'The formal attention stance used at the beginning and end of class.',
    position: 'Feet together, heels touching, toes pointed outward at 45 degrees',
    bodyPosition: 'Stand straight, shoulders back, arms at sides, hands in fists',
    keyPoints: [
      'Heels together, toes apart',
      'Weight evenly distributed',
      'Straight posture',
      'Eyes forward',
      'Relaxed but alert',
      'Move Left Foot to Right Foot',
    ],
    commonMistakes: [
      'Feet too far apart',
      'Slouching shoulders',
      'Looking down',
      'Tense muscles',
      'Moving wrong foot',
    ],
    applications: ['Formal greeting', 'Beginning/end of forms', 'Showing respect'],
    createdAt: '2025-07-30T23:35:50.000Z',
    updatedAt: '2025-07-30T23:35:50.000Z',
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
