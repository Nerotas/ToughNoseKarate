import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Providers from '../providers';

// Mock ReactQueryDevtools to avoid side effects
jest.mock('@tanstack/react-query-devtools', () => ({
  ReactQueryDevtools: () => <div data-testid='devtools' />,
}));

describe('Providers wrapper', () => {
  it('renders children and devtools', () => {
    render(
      <Providers>
        <div>Child</div>
      </Providers>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
    expect(screen.getByTestId('devtools')).toBeInTheDocument();
  });
});
