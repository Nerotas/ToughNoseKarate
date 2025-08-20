import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentsClient from '../StudentsClient';
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

const mockStudents = [
  {
    studentid: 1,
    firstName: 'John',
    lastName: 'Doe',
    preferredName: 'Johnny',
    age: 25,
    beltRank: 'White',
    email: 'john.doe@example.com',
    phone: '555-1234',
    active: true,
    eligibleForTesting: true,
    child: false,
    startDateUTC: '2023-01-01T00:00:00.000Z',
    endDateUTC: null,
    lastTestUTC: null,
    notes: 'Test notes',
  },
  {
    studentid: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    preferredName: 'Jane',
    age: 30,
    beltRank: 'Yellow',
    email: 'jane.smith@example.com',
    phone: '555-5678',
    active: true,
    eligibleForTesting: false,
    child: false,
    startDateUTC: '2023-01-01T00:00:00.000Z',
    endDateUTC: null,
    lastTestUTC: null,
    notes: 'Test notes',
  },
];

const mockBeltRequirements = [
  {
    id: 1,
    beltColor: 'White',
    beltName: 'White Belt',
    requirements: 'Basic stances and punches',
  },
];

describe('StudentsClient', () => {
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
        <StudentsClient />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders students data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet
      .mockReturnValueOnce({
        data: mockStudents,
        isPending: false,
        refetch: jest.fn(),
      })
      .mockReturnValueOnce({
        data: mockBeltRequirements,
        isPending: false,
        refetch: jest.fn(),
      });

    render(
      <TestWrapper>
        <StudentsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Students')).toBeInTheDocument();
    });
  });

  it('shows add student button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet
      .mockReturnValueOnce({
        data: mockStudents,
        isPending: false,
        refetch: jest.fn(),
      })
      .mockReturnValueOnce({
        data: mockBeltRequirements,
        isPending: false,
        refetch: jest.fn(),
      });

    render(
      <TestWrapper>
        <StudentsClient />
      </TestWrapper>
    );

    expect(screen.getByText('Add Student')).toBeInTheDocument();
  });

  it('hides add student button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet
      .mockReturnValueOnce({
        data: mockStudents,
        isPending: false,
        refetch: jest.fn(),
      })
      .mockReturnValueOnce({
        data: mockBeltRequirements,
        isPending: false,
        refetch: jest.fn(),
      });

    render(
      <TestWrapper>
        <StudentsClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add Student')).not.toBeInTheDocument();
  });

  it('displays student summary cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet
      .mockReturnValueOnce({
        data: mockStudents,
        isPending: false,
        refetch: jest.fn(),
      })
      .mockReturnValueOnce({
        data: mockBeltRequirements,
        isPending: false,
        refetch: jest.fn(),
      });

    render(
      <TestWrapper>
        <StudentsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Active Students')).toBeInTheDocument();
    });
  });
});
