import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ClientThemeProvider from '../theme-provider';

describe('ClientThemeProvider', () => {
  it('renders children within theme', () => {
    render(
      <ClientThemeProvider>
        <button>Inside Theme</button>
      </ClientThemeProvider>
    );
    expect(screen.getByText('Inside Theme')).toBeInTheDocument();
  });
});
