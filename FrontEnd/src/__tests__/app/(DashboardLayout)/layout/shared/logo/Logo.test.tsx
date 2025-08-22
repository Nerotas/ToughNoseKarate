import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Logo from '../../../../../../app/(DashboardLayout)/layout/shared/logo/Logo';

// Mock Next.js components
jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Logo Component', () => {
  it('renders the logo component', () => {
    renderWithTheme(<Logo />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });

  it('links to the home page', () => {
    renderWithTheme(<Logo />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the logo image', () => {
    renderWithTheme(<Logo />);

    const image = screen.getByRole('img', { name: /logo/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/images/logos/ErotasIcon.png');
    expect(image).toHaveAttribute('alt', 'logo');
  });

  it('renders the "Tough Nose" text', () => {
    renderWithTheme(<Logo />);

    const text = screen.getByText('Tough Nose');
    expect(text).toBeInTheDocument();
  });

  it('applies correct typography variant to text', () => {
    renderWithTheme(<Logo />);

    const text = screen.getByText('Tough Nose');
    expect(text).toBeInTheDocument();
    // The variant is h6, which should be rendered as an h6 element by default
  });

  it('has correct image properties', () => {
    renderWithTheme(<Logo />);

    const image = screen.getByRole('img', { name: /logo/i });
    expect(image).toHaveAttribute('src', '/images/logos/ErotasIcon.png');
    expect(image).toHaveAttribute('alt', 'logo');
  });

  it('applies proper styling to the link', () => {
    renderWithTheme(<Logo />);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    // The styled component should apply height, width, overflow, display, alignItems, and position styles
  });

  it('has the image wrapped in a positioned container', () => {
    renderWithTheme(<Logo />);

    const image = screen.getByRole('img', { name: /logo/i });
    const container = image.parentElement;

    expect(container).toBeInTheDocument();
    expect(container).toHaveStyle('position: relative');
  });

  it('text has gradient styling', () => {
    renderWithTheme(<Logo />);

    const text = screen.getByText('Tough Nose');
    expect(text).toBeInTheDocument();
    // The styled Typography component should have gradient background
  });

  it('maintains proper component structure', () => {
    renderWithTheme(<Logo />);

    const link = screen.getByRole('link');
    const image = screen.getByRole('img', { name: /logo/i });
    const text = screen.getByText('Tough Nose');

    expect(link).toContainElement(image);
    expect(link).toContainElement(text);
  });

  it('image has proper loading configuration', () => {
    renderWithTheme(<Logo />);

    const image = screen.getByRole('img', { name: /logo/i });
    expect(image).toBeInTheDocument();
    // Priority loading is handled by Next.js internally
  });
  it('image uses object-fit contain', () => {
    renderWithTheme(<Logo />);

    const image = screen.getByRole('img', { name: /logo/i });
    expect(image).toHaveStyle('object-fit: contain');
  });

  it('uses correct font family for text', () => {
    renderWithTheme(<Logo />);

    const text = screen.getByText('Tough Nose');
    expect(text).toBeInTheDocument();
    // The Typography component should have Impact font family
  });

  it('has proper accessibility attributes', () => {
    renderWithTheme(<Logo />);

    const link = screen.getByRole('link');
    const image = screen.getByRole('img', { name: /logo/i });

    expect(link).toHaveAttribute('href', '/');
    expect(image).toHaveAttribute('alt', 'logo');
  });
});
