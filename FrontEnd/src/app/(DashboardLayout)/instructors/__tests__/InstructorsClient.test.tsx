import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InstructorsClient from '../InstructorsClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { instructors } from 'constants/data/Instructors';

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

describe('InstructorsClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders instructors page title', () => {
    render(
      <TestWrapper>
        <InstructorsClient />
      </TestWrapper>
    );

    expect(screen.getByText('Meet Our Instructors')).toBeInTheDocument();
  });

  it('displays instructor cards', async () => {
    render(
      <TestWrapper>
        <InstructorsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(instructors[0].name)).toBeInTheDocument();
      expect(screen.getByText(instructors[1].name)).toBeInTheDocument();
    });
  });

  it('displays instructor ranks', async () => {
    render(
      <TestWrapper>
        <InstructorsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getAllByText('3rd Degree Black Belt')).toHaveLength(3); // All 3 instructors have this rank
    });
  });

  it('displays instructor specialties', async () => {
    render(
      <TestWrapper>
        <InstructorsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Traditional Forms')).toBeInTheDocument();
      expect(screen.getAllByText('Self-Defense')).toHaveLength(2);
    });
  });

  it('displays instructor biographies', async () => {
    render(
      <TestWrapper>
        <InstructorsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      // Test for parts of the bio text since the full bio might be formatted differently
      expect(
        screen.getByText(/Raffi Erotas began his Tang Soo Do journey at age 9/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Danielle Erotas began her martial arts journey at age 8/)
      ).toBeInTheDocument();
    });
  });

  it('displays instructor achievements', async () => {
    render(
      <TestWrapper>
        <InstructorsClient />
      </TestWrapper>
    );

    await waitFor(() => {
      // Check for certification section headers
      expect(screen.getAllByText('Certifications:')).toHaveLength(3);
      expect(screen.getAllByText('Specialties:')).toHaveLength(3);
    });
  });

  it('renders instructor cards with hover effects', () => {
    render(
      <TestWrapper>
        <InstructorsClient />
      </TestWrapper>
    );

    const instructorCards = screen.getAllByRole('img');
    expect(instructorCards).toHaveLength(3); // 3 instructor images
  });

  it('renders page with proper layout structure', () => {
    render(
      <TestWrapper>
        <InstructorsClient />
      </TestWrapper>
    );

    expect(screen.getByText('Meet Our Instructors')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Our dedicated team of Tang Soo Do instructors brings decades of combined experience/
      )
    ).toBeInTheDocument();
  });
});
