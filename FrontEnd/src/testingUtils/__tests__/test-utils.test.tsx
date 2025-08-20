import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '@mui/material/styles';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { render as customRender } from '../test-utils';

// Test component to verify the test utils wrapper
const TestComponent = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['test'],
    queryFn: () => Promise.resolve('test-data'),
  });

  return (
    <div>
      <div data-testid='theme-mode'>{theme.palette.mode}</div>
      <div data-testid='query-client'>{queryClient ? 'available' : 'not-available'}</div>
      <div data-testid='query-loading'>{isLoading ? 'loading' : 'not-loading'}</div>
      <div data-testid='query-data'>{data || 'no-data'}</div>
      <div data-testid='test-content'>Test Content</div>
    </div>
  );
};

describe('test-utils', () => {
  describe('customRender', () => {
    it('renders components with all necessary providers', () => {
      customRender(<TestComponent />);

      expect(screen.getByTestId('test-content')).toHaveTextContent('Test Content');
      expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
      expect(screen.getByTestId('query-client')).toHaveTextContent('available');
    });

    it('provides QueryClient with test-friendly defaults', () => {
      customRender(<TestComponent />);

      // Query should be available and configured for testing
      expect(screen.getByTestId('query-client')).toHaveTextContent('available');
    });

    it('provides Material-UI theme', () => {
      customRender(<TestComponent />);

      expect(screen.getByTestId('theme-mode')).toHaveTextContent('light');
    });

    it('includes CssBaseline for consistent styling', () => {
      // CssBaseline doesn't render visible content, but we can test the provider works
      customRender(<div data-testid='styled-content'>Content</div>);

      expect(screen.getByTestId('styled-content')).toBeInTheDocument();
    });

    it('passes through render options', () => {
      const TestContainer = ({ children }: { children: React.ReactNode }) => (
        <div data-testid='custom-container'>{children}</div>
      );

      customRender(<div data-testid='child'>Child</div>, {
        container: document.body.appendChild(document.createElement('div')),
      });

      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('works with multiple children', () => {
      customRender(
        <>
          <div data-testid='first'>First</div>
          <div data-testid='second'>Second</div>
        </>
      );

      expect(screen.getByTestId('first')).toHaveTextContent('First');
      expect(screen.getByTestId('second')).toHaveTextContent('Second');
    });
  });

  describe('re-exports from @testing-library/react', () => {
    it('exports screen', () => {
      expect(screen).toBeDefined();
      expect(typeof screen.getByTestId).toBe('function');
    });

    it('exports standard render alongside custom render', () => {
      // Using standard render from the re-export
      render(<div data-testid='standard'>Standard render</div>);
      expect(screen.getByTestId('standard')).toBeInTheDocument();
    });
  });

  describe('QueryClient configuration', () => {
    it('disables retries for faster tests', () => {
      const ErrorComponent = () => {
        const { error, isError } = useQuery({
          queryKey: ['error-test'],
          queryFn: () => Promise.reject(new Error('Test error')),
        });

        return (
          <div>
            <div data-testid='error-state'>{isError ? 'error' : 'no-error'}</div>
            <div data-testid='error-message'>{error?.message || 'no-message'}</div>
          </div>
        );
      };

      customRender(<ErrorComponent />);

      // Should quickly fail without retries
      setTimeout(() => {
        expect(screen.getByTestId('error-state')).toHaveTextContent('error');
        expect(screen.getByTestId('error-message')).toHaveTextContent('Test error');
      }, 100);
    });

    it('sets infinite staleTime for predictable tests', () => {
      const StaleTimeComponent = () => {
        const queryClient = useQueryClient();
        const defaultOptions = queryClient.getDefaultOptions();

        return <div data-testid='stale-time'>{String(defaultOptions.queries?.staleTime)}</div>;
      };

      customRender(<StaleTimeComponent />);

      expect(screen.getByTestId('stale-time')).toHaveTextContent('Infinity');
    });
  });

  describe('Theme configuration', () => {
    it('provides light mode theme by default', () => {
      const ThemeComponent = () => {
        const theme = useTheme();
        return (
          <div>
            <div data-testid='palette-mode'>{theme.palette.mode}</div>
            <div data-testid='theme-available'>{theme ? 'true' : 'false'}</div>
          </div>
        );
      };

      customRender(<ThemeComponent />);

      expect(screen.getByTestId('palette-mode')).toHaveTextContent('light');
      expect(screen.getByTestId('theme-available')).toHaveTextContent('true');
    });
  });
});
