import { render, screen } from '@testing-library/react';
import HomeClient from '../(DashboardLayout)/HomeClient';
import ClientThemeProvider from '../theme-provider';

describe('HomeClient hero image', () => {
  it('loads the above-the-fold photograph eagerly without losing its intrinsic dimensions', () => {
    render(
      <ClientThemeProvider>
        <HomeClient />
      </ClientThemeProvider>
    );

    const image = screen.getByRole('img', { name: 'Erotas performing a legendary Kick' });
    expect(image).toHaveAttribute('loading', 'eager');
    expect(image).toHaveAttribute('fetchpriority', 'high');
    expect(image).toHaveAttribute('width', '400');
    expect(image).toHaveAttribute('height', '500');
  });
});
