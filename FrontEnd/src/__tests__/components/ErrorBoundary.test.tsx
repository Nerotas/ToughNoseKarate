import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '../../components/ErrorBoundary';

// Mock console.error to prevent error output during tests
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

// Component that throws an error for testing
const ThrowErrorComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    mockConsoleError.mockClear();
  });

  afterAll(() => {
    mockConsoleError.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText(
        "We're sorry, but something unexpected happened. Please try refreshing the page or return to the home page."
      )
    ).toBeInTheDocument();
  });

  it('renders retry button when error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /go to home/i })).toBeInTheDocument();
  });

  it('has proper error boundary structure', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for error boundary container
    expect(container.firstChild).toHaveClass('MuiContainer-root');
  });

  it('displays error details when available', () => {
    render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // The error boundary should handle the error and show the fallback UI
    expect(screen.queryByText('No error')).not.toBeInTheDocument();
    expect(screen.getByText('Oops! Something went wrong')).toBeInTheDocument();
  });

  it('renders alert with proper severity', () => {
    const { container } = render(
      <ErrorBoundary>
        <ThrowErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for MUI Alert component
    expect(container.querySelector('.MuiAlert-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiAlert-standardError')).toBeInTheDocument();
  });
});
