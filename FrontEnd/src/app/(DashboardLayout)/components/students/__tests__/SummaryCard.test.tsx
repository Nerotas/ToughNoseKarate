import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SummaryCard from '../SummaryCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

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

describe('SummaryCard', () => {
  it('displays active students correctly', () => {
    render(
      <TestWrapper>
        <SummaryCard students={mockStudents} showActiveOnly={true} allStudents={10} />
      </TestWrapper>
    );

    expect(screen.getByText('Active Students')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays inactive students when showActiveOnly is false', () => {
    render(
      <TestWrapper>
        <SummaryCard students={[]} showActiveOnly={false} allStudents={5} />
      </TestWrapper>
    );

    expect(screen.getByText('Inactive Students')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('displays total students count', () => {
    render(
      <TestWrapper>
        <SummaryCard students={mockStudents} showActiveOnly={true} allStudents={15} />
      </TestWrapper>
    );

    expect(screen.getByText('15')).toBeInTheDocument();
  });
});
