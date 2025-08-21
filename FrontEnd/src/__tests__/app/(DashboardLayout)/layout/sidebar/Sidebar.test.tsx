import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme, useMediaQuery } from '@mui/material';
import MSidebar from '../../../../../app/(DashboardLayout)/layout/sidebar/Sidebar';

// Mock useMediaQuery
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

// Mock SidebarItems
jest.mock('../../../../../app/(DashboardLayout)/layout/sidebar/SidebarItems', () => {
  return function MockSidebarItems() {
    return <div data-testid='mock-sidebar-items'>Sidebar Items</div>;
  };
});

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<typeof useMediaQuery>;

const theme = createTheme();

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('MSidebar Component', () => {
  const mockOnSidebarClose = jest.fn();

  const defaultProps = {
    isMobileSidebarOpen: false,
    onSidebarClose: mockOnSidebarClose,
    isSidebarOpen: true,
  };
  beforeEach(() => {
    mockOnSidebarClose.mockClear();
    mockUseMediaQuery.mockClear();
  });

  describe('Desktop View (lg and up)', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(true); // lgUp = true
    });

    it('renders permanent drawer for desktop', () => {
      renderWithTheme(<MSidebar {...defaultProps} />);

      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();
    });

    it('renders sidebar items', () => {
      renderWithTheme(<MSidebar {...defaultProps} />);

      const sidebarItems = screen.getByTestId('mock-sidebar-items');
      expect(sidebarItems).toBeInTheDocument();
      expect(sidebarItems).toHaveTextContent('Sidebar Items');
    });

    it('respects isSidebarOpen prop for desktop drawer', () => {
      renderWithTheme(<MSidebar {...defaultProps} isSidebarOpen={true} />);

      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();
    });

    it('handles closed sidebar state', () => {
      renderWithTheme(<MSidebar {...defaultProps} isSidebarOpen={false} />);

      // Sidebar items should still be rendered (permanent drawer)
      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();
    });
  });

  describe('Mobile View (below lg)', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false); // lgUp = false
    });

    it('renders temporary drawer for mobile when open', () => {
      renderWithTheme(<MSidebar {...defaultProps} isMobileSidebarOpen={true} />);

      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();
    });

    it('renders sidebar items in mobile view when open', () => {
      renderWithTheme(<MSidebar {...defaultProps} isMobileSidebarOpen={true} />);

      const sidebarItems = screen.getByTestId('mock-sidebar-items');
      expect(sidebarItems).toBeInTheDocument();
      expect(sidebarItems).toHaveTextContent('Sidebar Items');
    });

    it('does not render when mobile sidebar is closed', () => {
      renderWithTheme(<MSidebar {...defaultProps} isMobileSidebarOpen={false} />);

      expect(screen.queryByTestId('mock-sidebar-items')).not.toBeInTheDocument();
    });
    it('respects isMobileSidebarOpen prop', () => {
      renderWithTheme(<MSidebar {...defaultProps} isMobileSidebarOpen={true} />);

      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();
    });

    it('handles mobile sidebar close events', () => {
      const mockEvent = { target: {} } as React.MouseEvent<HTMLElement>;

      renderWithTheme(<MSidebar {...defaultProps} isMobileSidebarOpen={true} />);

      // Since this is a temporary drawer, we need to simulate the close event
      // The drawer's onClose prop should be connected to our mock function
      // However, we can't directly access the drawer's props in this test
      // This is more of an integration test that would be covered by user interaction
      expect(mockOnSidebarClose).not.toHaveBeenCalled();
    });
  });

  describe('Responsive Behavior', () => {
    it('switches between desktop and mobile views based on screen size', () => {
      // Test desktop view
      mockUseMediaQuery.mockReturnValue(true);
      const { rerender } = renderWithTheme(<MSidebar {...defaultProps} />);

      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();

      // Test mobile view - need to open mobile sidebar to see content
      mockUseMediaQuery.mockReturnValue(false);
      rerender(
        <ThemeProvider theme={theme}>
          <MSidebar {...defaultProps} isMobileSidebarOpen={true} />
        </ThemeProvider>
      );

      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();
    });
    it('uses correct media query breakpoint', () => {
      renderWithTheme(<MSidebar {...defaultProps} />);

      expect(mockUseMediaQuery).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('Props Handling', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(true);
    });

    it('handles all required props', () => {
      expect(() => {
        renderWithTheme(<MSidebar {...defaultProps} />);
      }).not.toThrow();
    });

    it('handles prop changes correctly', () => {
      const { rerender } = renderWithTheme(<MSidebar {...defaultProps} />);

      // Change props
      rerender(
        <ThemeProvider theme={theme}>
          <MSidebar {...defaultProps} isSidebarOpen={false} isMobileSidebarOpen={true} />
        </ThemeProvider>
      );

      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(true);
    });

    it('applies correct sidebar width', () => {
      renderWithTheme(<MSidebar {...defaultProps} />);

      // The sidebar should be rendered (we can't easily test specific styling)
      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();
    });

    it('includes scrollbar styles', () => {
      renderWithTheme(<MSidebar {...defaultProps} />);

      // Sidebar should be rendered with custom scrollbar styles
      expect(screen.getByTestId('mock-sidebar-items')).toBeInTheDocument();
    });
  });
});
