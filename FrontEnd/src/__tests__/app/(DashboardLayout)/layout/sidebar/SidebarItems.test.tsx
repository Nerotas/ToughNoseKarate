import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import SidebarItems from '../../../../../app/(DashboardLayout)/layout/sidebar/SidebarItems';
import { useAuth } from '../../../../../hooks/useAuth';

// Mock dependencies
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('../../../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/link', () => {
  return function MockLink({ href, children, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock the Logo component
jest.mock('../../../../../app/(DashboardLayout)/layout/shared/logo/Logo', () => {
  return function MockLogo() {
    return <div data-testid='mock-logo'>Logo</div>;
  };
});

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

const theme = createTheme();

const mockUser = {
  isAuthenticated: false, // Changed to false so login items show
  instructor: null,
  isAuthLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  refreshToken: jest.fn(),
  ensureProfile: jest.fn(),
  loginError: null,
  profileError: null,
};

const mockUserInstructor = {
  isAuthenticated: true,
  instructor: {
    id: 1,
    role: 'instructor',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  },
  isAuthLoading: false,
  login: jest.fn(),
  logout: jest.fn(),
  refreshToken: jest.fn(),
  ensureProfile: jest.fn(),
  loginError: null,
  profileError: null,
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('SidebarItems Component', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
    mockUseAuth.mockReturnValue(mockUser); // Default to unauthenticated
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders the logo', () => {
      renderWithTheme(<SidebarItems />);

      expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
    });

    it('renders main menu items when unauthenticated', () => {
      renderWithTheme(<SidebarItems />);

      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /instructors/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /belt requirements/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /forms/i })).toBeInTheDocument();
    });

    it('renders training section header', () => {
      renderWithTheme(<SidebarItems />);

      expect(screen.getByText('TRAINING')).toBeInTheDocument();
    });
  });

  describe('Authentication States', () => {
    it('shows login menu items when unauthenticated', () => {
      mockUseAuth.mockReturnValue(mockUser); // unauthenticated user

      renderWithTheme(<SidebarItems />);

      expect(screen.getByRole('link', { name: /instructor login/i })).toBeInTheDocument();
    });

    it('shows auth menu items when authenticated', () => {
      mockUseAuth.mockReturnValue(mockUserInstructor);

      renderWithTheme(<SidebarItems />);

      expect(screen.getByRole('link', { name: /students/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /documents/i })).toBeInTheDocument();
      expect(screen.getByText('MANAGEMENT')).toBeInTheDocument();
    });

    it('shows user info when authenticated with instructor details', () => {
      mockUseAuth.mockReturnValue(mockUserInstructor);

      renderWithTheme(<SidebarItems />);

      expect(screen.getByText('Signed in as')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('INSTRUCTOR • john@example.com')).toBeInTheDocument();
    });

    it('does not show user info when authenticated but no instructor details', () => {
      mockUseAuth.mockReturnValue({ ...mockUserInstructor, instructor: null });

      renderWithTheme(<SidebarItems />);

      expect(screen.queryByText('Signed in as')).not.toBeInTheDocument();
    });
  });

  describe('Navigation and Selection', () => {
    it('renders the current page path correctly', () => {
      mockUsePathname.mockReturnValue('/belt-requirements');

      renderWithTheme(<SidebarItems />);

      const beltRequirementsLink = screen.getByRole('link', { name: /belt requirements/i });
      expect(beltRequirementsLink).toBeInTheDocument();
      expect(beltRequirementsLink).toHaveAttribute('href', '/belt-requirements');
    });

    it('renders home page link correctly', () => {
      mockUsePathname.mockReturnValue('/');

      renderWithTheme(<SidebarItems />);

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveAttribute('href', '/');
    });

    it('renders authenticated menu items correctly', () => {
      mockUseAuth.mockReturnValue(mockUserInstructor);
      mockUsePathname.mockReturnValue('/students');

      renderWithTheme(<SidebarItems />);

      const studentsLink = screen.getByRole('link', { name: /students/i });
      expect(studentsLink).toBeInTheDocument();
      expect(studentsLink).toHaveAttribute('href', '/students');
    });
  });

  describe('Menu Item Links', () => {
    it('has correct href attributes for main menu items', () => {
      renderWithTheme(<SidebarItems />);

      expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
      expect(screen.getByRole('link', { name: /instructors/i })).toHaveAttribute(
        'href',
        '/instructors'
      );
      expect(screen.getByRole('link', { name: /belt requirements/i })).toHaveAttribute(
        'href',
        '/belt-requirements'
      );
      expect(screen.getByRole('link', { name: /forms/i })).toHaveAttribute('href', '/forms');
      expect(screen.getByRole('link', { name: /stances/i })).toHaveAttribute('href', '/stances');
      expect(screen.getByRole('link', { name: /blocks/i })).toHaveAttribute('href', '/blocks');
    });

    it('has correct href attributes for training menu items', () => {
      renderWithTheme(<SidebarItems />);

      expect(screen.getByRole('link', { name: /punches/i })).toHaveAttribute('href', '/punches');
      expect(screen.getByRole('link', { name: /kicks/i })).toHaveAttribute('href', '/kicks');
      expect(screen.getByRole('link', { name: /one-step sparring/i })).toHaveAttribute(
        'href',
        '/one-steps'
      );
      expect(screen.getByRole('link', { name: /self-defense/i })).toHaveAttribute(
        'href',
        '/self-defense'
      );
    });

    it('has correct href for login when unauthenticated', () => {
      mockUseAuth.mockReturnValue(mockUser); // Use unauthenticated user
      renderWithTheme(<SidebarItems />);

      expect(screen.getByRole('link', { name: /instructor login/i })).toHaveAttribute(
        'href',
        '/auth/login'
      );
    });

    it('has correct href attributes for auth menu items', () => {
      mockUseAuth.mockReturnValue(mockUserInstructor);

      renderWithTheme(<SidebarItems />);

      expect(screen.getByRole('link', { name: /students/i })).toHaveAttribute('href', '/students');
      expect(screen.getByRole('link', { name: /documents/i })).toHaveAttribute(
        'href',
        '/documents'
      );
    });
  });

  describe('Menu Sections', () => {
    it('shows training section correctly', () => {
      renderWithTheme(<SidebarItems />);

      expect(screen.getByText('TRAINING')).toBeInTheDocument();

      // Training items should be present
      expect(screen.getByRole('link', { name: /belt requirements/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /forms/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /stances/i })).toBeInTheDocument();
    });

    it('shows management section when authenticated', () => {
      mockUseAuth.mockReturnValue(mockUserInstructor);

      renderWithTheme(<SidebarItems />);

      expect(screen.getByText('MANAGEMENT')).toBeInTheDocument();
    });

    it('shows management section in login items when unauthenticated', () => {
      mockUseAuth.mockReturnValue(mockUser); // Use unauthenticated user
      renderWithTheme(<SidebarItems />);

      // There should be a MANAGEMENT section for login items
      expect(screen.getByText('MANAGEMENT')).toBeInTheDocument();
    });
  });

  describe('User Information Display', () => {
    it('displays user role in uppercase', () => {
      const mockAdminUser = {
        ...mockUserInstructor,
        instructor: {
          ...mockUserInstructor.instructor,
          firstName: 'Jane',
          lastName: 'Smith',
          role: 'admin',
          email: 'jane@example.com',
        },
      };
      mockUseAuth.mockReturnValue(mockAdminUser);

      renderWithTheme(<SidebarItems />);

      expect(screen.getByText('ADMIN • jane@example.com')).toBeInTheDocument();
    });

    it('handles different user roles correctly', () => {
      const mockStudentUser = {
        ...mockUserInstructor,
        instructor: {
          ...mockUserInstructor.instructor,
          firstName: 'Student',
          lastName: 'Test',
          role: 'student',
          email: 'student@example.com',
        },
      };
      mockUseAuth.mockReturnValue(mockStudentUser);

      renderWithTheme(<SidebarItems />);

      expect(screen.getByText('STUDENT • student@example.com')).toBeInTheDocument();
    });
  });
});
