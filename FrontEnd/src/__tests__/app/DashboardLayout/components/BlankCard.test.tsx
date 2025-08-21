import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlankCard from '../BlankCard';
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

describe('BlankCard', () => {
  it('renders without crashing', () => {
    render(
      <TestWrapper>
        <BlankCard>
          <div>Test content</div>
        </BlankCard>
      </TestWrapper>
    );
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    render(
      <TestWrapper>
        <BlankCard>
          <h1>Test Title</h1>
          <p>Test paragraph</p>
        </BlankCard>
      </TestWrapper>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test paragraph')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <TestWrapper>
        <BlankCard className='custom-class'>
          <div>Content</div>
        </BlankCard>
      </TestWrapper>
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
