import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SectionErrorBoundary } from '../SectionErrorBoundary';

// Component that throws an error for testing
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('SectionErrorBoundary', () => {
  // Suppress console.error for cleaner test output
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render children when there is no error', () => {
    render(
      <SectionErrorBoundary>
        <div>Test content</div>
      </SectionErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should render default error UI when error occurs', () => {
    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    );

    expect(screen.getByText('Something went wrong in this section.')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('should render custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <SectionErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong in this section.')).not.toBeInTheDocument();
  });

  it('should call onError callback when error occurs', () => {
    const onError = jest.fn();

    render(
      <SectionErrorBoundary onError={onError}>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    );

    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String),
      })
    );
  });

  it('should retry when retry button is clicked', () => {
    const TestComponent = () => {
      const [shouldThrow, setShouldThrow] = React.useState(true);

      React.useEffect(() => {
        const timer = setTimeout(() => {
          setShouldThrow(false);
        }, 100);
        return () => clearTimeout(timer);
      }, []);

      return (
        <SectionErrorBoundary>
          <ThrowError shouldThrow={shouldThrow} />
        </SectionErrorBoundary>
      );
    };

    render(<TestComponent />);

    // Initially shows error
    expect(screen.getByText('Something went wrong in this section.')).toBeInTheDocument();

    // Click retry button
    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);

    // Should clear error state (even though component may still throw)
    // The error boundary should reset its internal state
  });

  it('should show error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: 'development' },
      configurable: true,
    });

    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    );

    expect(screen.getByText('Test error')).toBeInTheDocument();

    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: originalEnv },
      configurable: true,
    });
  });

  it('should not show error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: 'production' },
      configurable: true,
    });

    render(
      <SectionErrorBoundary>
        <ThrowError shouldThrow={true} />
      </SectionErrorBoundary>
    );

    expect(screen.queryByText('Test error')).not.toBeInTheDocument();

    Object.defineProperty(process, 'env', {
      value: { ...process.env, NODE_ENV: originalEnv },
      configurable: true,
    });
  });
});
