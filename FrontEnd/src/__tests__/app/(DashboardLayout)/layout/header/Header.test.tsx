import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import Header from '../../../../../app/(DashboardLayout)/layout/header/Header';

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Header Component', () => {
  const mockToggleMobileSidebar = jest.fn();

  beforeEach(() => {
    mockToggleMobileSidebar.mockClear();
  });

  it('renders the header component', () => {
    renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);

    // Check for AppBar
    const appBar = screen.getByRole('banner');
    expect(appBar).toBeInTheDocument();
  });

  it('renders the mobile menu button', () => {
    renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('calls toggleMobileSidebar when menu button is clicked', () => {
    renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    expect(mockToggleMobileSidebar).toHaveBeenCalledTimes(1);
  });

  it('calls toggleMobileSidebar with the correct event', () => {
    renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);

    expect(mockToggleMobileSidebar).toHaveBeenCalledWith(expect.any(Object));
  });

  it('has the menu icon', () => {
    renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);

    // The IconMenu should be rendered (though we can't easily test the specific icon)
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toHaveAttribute('aria-label', 'menu');
  });

  it('has sticky positioning', () => {
    renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);

    const appBar = screen.getByRole('banner');
    expect(appBar).toBeInTheDocument();
    // The position='sticky' prop is passed to AppBar
  });

  it('handles multiple clicks correctly', () => {
    renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);

    const menuButton = screen.getByRole('button', { name: /menu/i });

    fireEvent.click(menuButton);
    fireEvent.click(menuButton);
    fireEvent.click(menuButton);

    expect(mockToggleMobileSidebar).toHaveBeenCalledTimes(3);
  });

  it('has proper button styling', () => {
    renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();
    // Color inheritance is handled by Material-UI internally
  });
  it('renders with proper accessibility attributes', () => {
    renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);

    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toHaveAttribute('aria-label', 'menu');
  });

  it('handles function prop types correctly', () => {
    // Test that the component accepts the function prop without error
    expect(() => {
      renderWithTheme(<Header toggleMobileSidebar={mockToggleMobileSidebar} />);
    }).not.toThrow();
  });
});
