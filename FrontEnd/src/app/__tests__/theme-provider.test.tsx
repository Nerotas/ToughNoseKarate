import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTheme } from '@mui/material/styles';
import ClientThemeProvider from '../theme-provider';

// Test component to access theme
const ThemeTestComponent = () => {
  const theme = useTheme();

  return (
    <div>
      <div data-testid='theme-available'>{theme ? 'true' : 'false'}</div>
      <div data-testid='primary-color'>{theme.palette.primary.main}</div>
      <div data-testid='font-family'>{theme.typography.fontFamily}</div>
      <div data-testid='direction'>{theme.direction}</div>
    </div>
  );
};

describe('ClientThemeProvider', () => {
  it('renders children within theme', () => {
    render(
      <ClientThemeProvider>
        <button>Inside Theme</button>
      </ClientThemeProvider>
    );
    expect(screen.getByText('Inside Theme')).toBeInTheDocument();
  });

  it('provides theme to child components', () => {
    render(
      <ClientThemeProvider>
        <ThemeTestComponent />
      </ClientThemeProvider>
    );

    expect(screen.getByTestId('theme-available')).toHaveTextContent('true');
    expect(screen.getByTestId('primary-color')).toHaveTextContent('#5D87FF');
    expect(screen.getByTestId('direction')).toHaveTextContent('ltr');
  });

  it('applies custom color palette', () => {
    const ColorTestComponent = () => {
      const theme = useTheme();
      return (
        <div>
          <div data-testid='primary-main'>{theme.palette.primary.main}</div>
          <div data-testid='primary-light'>{theme.palette.primary.light}</div>
          <div data-testid='primary-dark'>{theme.palette.primary.dark}</div>
          <div data-testid='secondary-main'>{theme.palette.secondary.main}</div>
          <div data-testid='success-main'>{theme.palette.success.main}</div>
          <div data-testid='error-main'>{theme.palette.error.main}</div>
          <div data-testid='warning-main'>{theme.palette.warning.main}</div>
        </div>
      );
    };

    render(
      <ClientThemeProvider>
        <ColorTestComponent />
      </ClientThemeProvider>
    );

    expect(screen.getByTestId('primary-main')).toHaveTextContent('#5D87FF');
    expect(screen.getByTestId('primary-light')).toHaveTextContent('#ECF2FF');
    expect(screen.getByTestId('primary-dark')).toHaveTextContent('#4570EA');
    expect(screen.getByTestId('secondary-main')).toHaveTextContent('#49BEFF');
    expect(screen.getByTestId('success-main')).toHaveTextContent('#13DEB9');
    expect(screen.getByTestId('error-main')).toHaveTextContent('#FA896B');
    expect(screen.getByTestId('warning-main')).toHaveTextContent('#FFAE1F');
  });

  it('applies custom typography settings', () => {
    const TypographyTestComponent = () => {
      const theme = useTheme();
      return (
        <div>
          <div data-testid='h1-weight'>{theme.typography.h1.fontWeight}</div>
          <div data-testid='h1-size'>{theme.typography.h1.fontSize}</div>
          <div data-testid='body1-size'>{theme.typography.body1.fontSize}</div>
          <div data-testid='button-transform'>{theme.typography.button.textTransform}</div>
        </div>
      );
    };

    render(
      <ClientThemeProvider>
        <TypographyTestComponent />
      </ClientThemeProvider>
    );

    expect(screen.getByTestId('h1-weight')).toHaveTextContent('600');
    expect(screen.getByTestId('h1-size')).toHaveTextContent('2.25rem');
    expect(screen.getByTestId('body1-size')).toHaveTextContent('0.875rem');
    expect(screen.getByTestId('button-transform')).toHaveTextContent('capitalize');
  });

  it('applies custom grey color scale', () => {
    const GreyTestComponent = () => {
      const theme = useTheme();
      return (
        <div>
          <div data-testid='grey-100'>{theme.palette.grey[100]}</div>
          <div data-testid='grey-200'>{theme.palette.grey[200]}</div>
          <div data-testid='grey-300'>{theme.palette.grey[300]}</div>
          <div data-testid='grey-400'>{theme.palette.grey[400]}</div>
          <div data-testid='grey-500'>{theme.palette.grey[500]}</div>
          <div data-testid='grey-600'>{theme.palette.grey[600]}</div>
        </div>
      );
    };

    render(
      <ClientThemeProvider>
        <GreyTestComponent />
      </ClientThemeProvider>
    );

    expect(screen.getByTestId('grey-100')).toHaveTextContent('#F2F6FA');
    expect(screen.getByTestId('grey-200')).toHaveTextContent('#EAEFF4');
    expect(screen.getByTestId('grey-300')).toHaveTextContent('#DFE5EF');
    expect(screen.getByTestId('grey-400')).toHaveTextContent('#7C8FAC');
    expect(screen.getByTestId('grey-500')).toHaveTextContent('#5A6A85');
    expect(screen.getByTestId('grey-600')).toHaveTextContent('#2A3547');
  });

  it('applies custom text colors', () => {
    const TextColorTestComponent = () => {
      const theme = useTheme();
      return (
        <div>
          <div data-testid='text-primary'>{theme.palette.text.primary}</div>
          <div data-testid='text-secondary'>{theme.palette.text.secondary}</div>
        </div>
      );
    };

    render(
      <ClientThemeProvider>
        <TextColorTestComponent />
      </ClientThemeProvider>
    );

    expect(screen.getByTestId('text-primary')).toHaveTextContent('#2A3547');
    expect(screen.getByTestId('text-secondary')).toHaveTextContent('#5A6A85');
  });

  it('applies custom component styles', () => {
    const ComponentStyleTestComponent = () => {
      const theme = useTheme();
      const cardStyles = theme.components?.MuiCard?.styleOverrides?.root as any;

      return (
        <div>
          <div data-testid='card-radius'>{cardStyles?.borderRadius || 'not-set'}</div>
        </div>
      );
    };

    render(
      <ClientThemeProvider>
        <ComponentStyleTestComponent />
      </ClientThemeProvider>
    );

    expect(screen.getByTestId('card-radius')).toHaveTextContent('7px');
  });

  it('renders multiple children', () => {
    render(
      <ClientThemeProvider>
        <div>First child</div>
        <span>Second child</span>
        <button>Third child</button>
      </ClientThemeProvider>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('includes CssBaseline for consistent styling', () => {
    // CssBaseline doesn't render visible content, but we can test that the provider works
    render(
      <ClientThemeProvider>
        <div data-testid='baseline-test'>Content with baseline</div>
      </ClientThemeProvider>
    );

    expect(screen.getByTestId('baseline-test')).toBeInTheDocument();
  });
});
