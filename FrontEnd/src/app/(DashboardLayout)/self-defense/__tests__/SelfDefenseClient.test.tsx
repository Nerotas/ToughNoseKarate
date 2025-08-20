import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelfDefenseClient from '../SelfDefenseClient';
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

const mockSelfDefense = [
  {
    id: 1,
    name: 'Wrist Escape',
    description: 'Basic wrist grab escape technique',
    difficulty: 'Beginner',
    category: 'Escapes',
    beltLevel: 'White',
    steps: ['Step 1: Identify grip', 'Step 2: Twist toward thumb', 'Step 3: Pull away'],
  },
  {
    id: 2,
    name: 'Bear Hug Defense',
    description: 'Defense against rear bear hug',
    difficulty: 'Intermediate',
    category: 'Grappling Defense',
    beltLevel: 'Yellow',
    steps: ['Step 1: Lower center of gravity', 'Step 2: Elbow strike', 'Step 3: Turn and escape'],
  },
  {
    id: 3,
    name: 'Choke Defense',
    description: 'Defense against front choke hold',
    difficulty: 'Advanced',
    category: 'Striking Defense',
    beltLevel: 'Orange',
    steps: ['Step 1: Secure airway', 'Step 2: Counter attack', 'Step 3: Escape and distance'],
  },
];

describe('SelfDefenseClient', () => {
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
        <SelfDefenseClient />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders self defense data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Self Defense Techniques')).toBeInTheDocument();
    });
  });

  it('displays filter controls', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Category')).toBeInTheDocument();
      expect(screen.getByLabelText('Belt Level')).toBeInTheDocument();
      expect(screen.getByLabelText('Difficulty')).toBeInTheDocument();
    });
  });

  it('displays search functionality', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search techniques...')).toBeInTheDocument();
    });
  });

  it('displays self defense technique cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Wrist Escape')).toBeInTheDocument();
      expect(screen.getByText('Bear Hug Defense')).toBeInTheDocument();
      expect(screen.getByText('Choke Defense')).toBeInTheDocument();
    });
  });

  it('shows add technique button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    expect(screen.getByText('Add Technique')).toBeInTheDocument();
  });

  it('hides add technique button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add Technique')).not.toBeInTheDocument();
  });

  it('allows filtering by category', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    const categorySelect = screen.getByLabelText('Category');
    fireEvent.mouseDown(categorySelect);

    await waitFor(() => {
      expect(screen.getByText('All')).toBeInTheDocument();
    });
  });

  it('allows searching techniques', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search techniques...');
    fireEvent.change(searchInput, { target: { value: 'Wrist' } });

    expect(searchInput).toHaveValue('Wrist');
  });
});
