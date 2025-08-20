import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../Navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock useAuth hook
jest.mock('../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

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

const mockUseAuth = require('../../hooks/useAuth').useAuth;

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

  it('shows admin badge for admin users', () => {
    mockUseAuth.mockReturnValue({
      instructor: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        isAdmin: true,
      },
      isAuthenticated: true,
      logout: jest.fn(),
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    // Look for the admin text within the menu items
    expect(screen.getByText(/Admin/)).toBeInTheDocument();
  });

  it('handles logout correctly', () => {
    const mockLogout = jest.fn();

    mockUseAuth.mockReturnValue({
      instructor: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        isAdmin: false,
      },
      isAuthenticated: true,
      logout: mockLogout,
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    // Find and click the profile menu button
    const profileButton = screen.getByRole('button', { name: /account of current user/i });
    fireEvent.click(profileButton);

    // Find and click the logout button
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  it('renders login button when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      instructor: null,
      isAuthenticated: false,
      logout: jest.fn(),
    });

    render(
      <TestWrapper>
        <Navigation />
      </TestWrapper>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
