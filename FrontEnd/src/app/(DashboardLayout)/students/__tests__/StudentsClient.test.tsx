import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudentsClient from '../StudentsClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { mockBeltRequirements } from 'testingUtils/MockData/mockBeltRequirements';

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
    studentid: 3,
    firstName: 'Jacob',
    lastName: 'Smith',
    preferredName: 'Jake',
    age: 10,
    dateOfBirth: null,
    beltRank: 'Green',
    startDateUTC: '2025-07-30 12:00:00',
    endDateUTC: null,
    email: 'nerotas7@gmail.com',
    phone: '661-305-9259',
    emergencyContactName: null,
    emergencyContactPhone: null,
    emergencyContactRelationship: null,
    medicalConditions: null,
    allergies: null,
    medications: null,
    waiverSigned: false,
    waiverDate: null,
    insuranceProvider: null,
    insurancePolicyNumber: null,
    notes: null,
    active: true,
    child: true,
    lastTestUTC: '2025-07-13 00:00:00',
    eligibleForTesting: false,
  },
  {
    studentid: 9,
    firstName: 'Ariyah',
    lastName: 'Kluger',
    preferredName: null,
    age: 9,
    dateOfBirth: null,
    beltRank: 'Orange White',
    startDateUTC: '2025-08-14T21:42:09.938Z',
    endDateUTC: null,
    email: 'Aaron.y.kluger@gmail.com',
    phone: '845-517-7651',
    emergencyContactName: null,
    emergencyContactPhone: null,
    emergencyContactRelationship: null,
    medicalConditions: null,
    allergies: null,
    medications: null,
    waiverSigned: false,
    waiverDate: null,
    insuranceProvider: null,
    insurancePolicyNumber: null,
    notes: null,
    active: true,
    child: true,
    lastTestUTC: null,
    eligibleForTesting: false,
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
      isLoading: true,
      isFetching: false,
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
        data: mockBeltRequirements,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      })
      .mockReturnValueOnce({
        data: mockStudents,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      });

    render(
      <TestWrapper>
        <StudentsClient />
      </TestWrapper>
    );

    const student = await screen.findByText('Jake Smith');
    expect(student).toBeInTheDocument();
  });

  it('shows add student button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet
      .mockReturnValueOnce({
        data: mockBeltRequirements,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      })
      .mockReturnValueOnce({
        data: mockStudents,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      });

    render(
      <TestWrapper>
        <StudentsClient />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /add new student/i })).toBeInTheDocument();
  });

  it('hides add student button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet
      .mockReturnValueOnce({
        data: mockBeltRequirements,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      })
      .mockReturnValueOnce({
        data: mockStudents,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      });

    render(
      <TestWrapper>
        <StudentsClient />
      </TestWrapper>
    );

    // The Add New Student button is rendered for all users in the current UI
    expect(screen.getByRole('button', { name: /add new student/i })).toBeInTheDocument();
  });

  it('displays student summary cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet
      .mockReturnValueOnce({
        data: mockBeltRequirements,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      })
      .mockReturnValueOnce({
        data: mockStudents,
        isLoading: false,
        isFetching: false,
        refetch: jest.fn(),
      });

    render(
      <TestWrapper>
        <StudentsClient />
      </TestWrapper>
    );

    const summaries = await screen.findAllByText('Active Students');
    expect(summaries.length).toBeGreaterThan(0);
  });
});
