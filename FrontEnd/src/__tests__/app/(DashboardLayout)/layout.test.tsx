import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import RootLayout from '../../../app/(DashboardLayout)/layout';

// Mock the child components
jest.mock('../../../app/(DashboardLayout)/layout/sidebar/Sidebar', () => {
  return function MockSidebar({
    isSidebarOpen,
    isMobileSidebarOpen,
    onSidebarClose,
  }: {
    isSidebarOpen: boolean;
    isMobileSidebarOpen: boolean;
    onSidebarClose: () => void;
  }) {
    return (
      <div data-testid='mock-sidebar'>
        <div data-testid='sidebar-open'>{isSidebarOpen ? 'open' : 'closed'}</div>
        <div data-testid='mobile-sidebar-open'>{isMobileSidebarOpen ? 'open' : 'closed'}</div>
        <button onClick={onSidebarClose} data-testid='close-sidebar'>
          Close
        </button>
      </div>
    );
  };
});

jest.mock('../../../app/(DashboardLayout)/layout/header/Header', () => {
  return function MockHeader({ toggleMobileSidebar }: { toggleMobileSidebar: () => void }) {
    return (
      <div data-testid='mock-header'>
        <button onClick={toggleMobileSidebar} data-testid='toggle-mobile-sidebar'>
          Toggle Mobile Sidebar
        </button>
      </div>
    );
  };
});

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('RootLayout', () => {
  const TestChild = () => <div data-testid='test-child'>Test Content</div>;

  it('renders the layout with all components', () => {
    renderWithTheme(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('initializes with sidebar open and mobile sidebar closed', () => {
    renderWithTheme(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    expect(screen.getByTestId('sidebar-open')).toHaveTextContent('open');
    expect(screen.getByTestId('mobile-sidebar-open')).toHaveTextContent('closed');
  });

  it('toggles mobile sidebar when header button is clicked', () => {
    renderWithTheme(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    // Initially closed
    expect(screen.getByTestId('mobile-sidebar-open')).toHaveTextContent('closed');

    // Click toggle button
    fireEvent.click(screen.getByTestId('toggle-mobile-sidebar'));

    // Should now be open
    expect(screen.getByTestId('mobile-sidebar-open')).toHaveTextContent('open');
  });

  it('closes mobile sidebar when close button is clicked', () => {
    renderWithTheme(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    // Open mobile sidebar first
    fireEvent.click(screen.getByTestId('toggle-mobile-sidebar'));
    expect(screen.getByTestId('mobile-sidebar-open')).toHaveTextContent('open');

    // Close it
    fireEvent.click(screen.getByTestId('close-sidebar'));
    expect(screen.getByTestId('mobile-sidebar-open')).toHaveTextContent('closed');
  });

  it('renders children in the correct container', () => {
    renderWithTheme(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    const child = screen.getByTestId('test-child');
    expect(child).toBeInTheDocument();
    expect(child.textContent).toBe('Test Content');
  });

  it('has the correct CSS classes for styling', () => {
    const { container } = renderWithTheme(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    const mainWrapper = container.querySelector('.mainwrapper');
    const pageWrapper = container.querySelector('.page-wrapper');

    expect(mainWrapper).toBeInTheDocument();
    expect(pageWrapper).toBeInTheDocument();
  });

  it('renders multiple children correctly', () => {
    renderWithTheme(
      <RootLayout>
        <div data-testid='child-1'>Child 1</div>
        <div data-testid='child-2'>Child 2</div>
        <div data-testid='child-3'>Child 3</div>
      </RootLayout>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('child-3')).toBeInTheDocument();
  });

  it('maintains sidebar state independently of mobile sidebar', () => {
    renderWithTheme(
      <RootLayout>
        <TestChild />
      </RootLayout>
    );

    // Desktop sidebar should be open initially
    expect(screen.getByTestId('sidebar-open')).toHaveTextContent('open');

    // Toggle mobile sidebar
    fireEvent.click(screen.getByTestId('toggle-mobile-sidebar'));

    // Desktop sidebar should still be open
    expect(screen.getByTestId('sidebar-open')).toHaveTextContent('open');
    expect(screen.getByTestId('mobile-sidebar-open')).toHaveTextContent('open');
  });
});
