import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormsClient from '../../../app/(DashboardLayout)/forms/FormsClient';
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

const mockForms = [
  {
    id: 1,
    name: 'Chon-Ji',
    description: 'First form in Taekwondo',
    difficulty: 'Beginner',
    movements: 19,
    beltLevel: 'White',
  },
  {
    id: 2,
    name: 'Dan-Gun',
    description: 'Second form in Taekwondo',
    difficulty: 'Beginner',
    movements: 21,
    beltLevel: 'Yellow',
  },
  {
    id: 3,
    name: 'Do-San',
    description: 'Third form in Taekwondo',
    difficulty: 'Intermediate',
    movements: 24,
    beltLevel: 'Orange',
  },
];

describe('FormsClient', () => {
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
        <FormsClient />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders forms data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockForms,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <FormsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tang Soo Do Forms (Hyung)')).toBeInTheDocument();
    });
  });

  it('displays forms description', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockForms,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <FormsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Forms are choreographed sequences/)).toBeInTheDocument();
    });
  });

  it('displays forms cards grid', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockForms,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <FormsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      // Check for grid container that holds the form cards
      const gridElements = document.querySelectorAll('.MuiGrid-container');
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });

  it('shows add form button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockForms,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <FormsClient />
      </TestWrapper>
    );

    expect(screen.getByText('Add Form')).toBeInTheDocument();
  });

  it('hides add form button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet.mockReturnValue({
      data: mockForms,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <FormsClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add Form')).not.toBeInTheDocument();
  });

  it('renders page container with correct title', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockForms,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <FormsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Tang Soo Do Forms (Hyung)')).toBeInTheDocument();
    });
  });
});
