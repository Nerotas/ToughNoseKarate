import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../hooks/useAuth';

// Mock the dependencies
jest.mock('../../hooks/useAuth');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockPush = jest.fn();

describe('ProtectedRoute Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner when authentication is loading', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isAuthLoading: true,
    } as any);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isAuthLoading: false,
    } as any);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(mockPush).toHaveBeenCalledWith('/auth/login');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('redirects to custom fallback path when specified', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isAuthLoading: false,
    } as any);

    render(
      <ProtectedRoute fallbackPath='/custom-login'>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(mockPush).toHaveBeenCalledWith('/custom-login');
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated without role requirement', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'student' },
      isAuthLoading: false,
    } as any);

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('renders children when user has required instructor role', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
      isAuthLoading: false,
    } as any);

    render(
      <ProtectedRoute requiredRole='instructor'>
        <div>Instructor Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Instructor Content')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('renders children when user has admin role (admin can access instructor content)', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
      isAuthLoading: false,
    } as any);

    render(
      <ProtectedRoute requiredRole='instructor'>
        <div>Instructor Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Instructor Content')).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('redirects to unauthorized when user does not have required role', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'student' },
      isAuthLoading: false,
    } as any);

    render(
      <ProtectedRoute requiredRole='instructor'>
        <div>Instructor Content</div>
      </ProtectedRoute>
    );

    expect(mockPush).toHaveBeenCalledWith('/unauthorized');
    expect(screen.queryByText('Instructor Content')).not.toBeInTheDocument();
  });

  it('does not redirect when still loading', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isAuthLoading: true,
    } as any);

    render(
      <ProtectedRoute requiredRole='instructor'>
        <div>Instructor Content</div>
      </ProtectedRoute>
    );

    expect(mockPush).not.toHaveBeenCalled();
    expect(screen.getByText('Checking authentication...')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('handles null instructor gracefully', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: null,
      isAuthLoading: false,
    } as any);

    render(
      <ProtectedRoute requiredRole='instructor'>
        <div>Instructor Content</div>
      </ProtectedRoute>
    );

    expect(mockPush).toHaveBeenCalledWith('/unauthorized');
    expect(screen.queryByText('Instructor Content')).not.toBeInTheDocument();
  });
});
