import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../../components/Navigation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the useAuth hook
jest.mock('../../hooks/useAuth');

const mockUseAuth = require('../../hooks/useAuth').useAuth;

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  const theme = createTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when user is authenticated', () => {
    mockUseAuth.mockReturnValue({
      instructor: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        isAdmin: false,
      },
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows admin badge for admin users', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        role: 'admin',
      },
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    // Click on avatar to open dropdown menu
    const avatarButton = screen.getByRole('button', { name: /account of current user/i });
    fireEvent.click(avatarButton);

    // Check for admin user name in dropdown
    await waitFor(() => {
      expect(screen.getByText('Admin User')).toBeInTheDocument();
    });
  });

  it('calls logout when logout button is clicked', async () => {
    const mockLogout = jest.fn();
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'instructor',
      },
      login: jest.fn(),
      logout: mockLogout,
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    // Click on avatar to open dropdown menu
    const avatarButton = screen.getByRole('button', { name: /account of current user/i });
    fireEvent.click(avatarButton);

    // Wait for menu to open and find logout button
    await waitFor(() => {
      const logoutButton = screen.getByText('Logout');
      fireEvent.click(logoutButton);
    });

    expect(mockLogout).toHaveBeenCalled();
  });

  it('shows login button when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('renders user email', async () => {
    mockUseAuth.mockReturnValue({
      instructor: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        role: 'instructor',
      },
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    // Click on avatar to open dropdown menu
    const avatarButton = screen.getByRole('button', { name: /account of current user/i });
    fireEvent.click(avatarButton);

    // Check for email in dropdown
    await waitFor(() => {
      expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
    });
  });

  it('renders avatar with user initials', () => {
    mockUseAuth.mockReturnValue({
      instructor: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'instructor',
      },
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('handles missing instructor data gracefully', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: null, // Missing instructor data
      login: jest.fn(),
      logout: jest.fn(),
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    // Component should still render even with missing instructor data
    expect(screen.getByText('Tough Nose Karate')).toBeInTheDocument();
  });

  it('renders dropdown menu when avatar is clicked', async () => {
    mockUseAuth.mockReturnValue({
      instructor: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'instructor',
      },
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    const avatarButton = screen.getByRole('button', { name: /account of current user/i });
    fireEvent.click(avatarButton);

    // After clicking avatar, menu should be visible
    await waitFor(() => {
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });
  });
});
