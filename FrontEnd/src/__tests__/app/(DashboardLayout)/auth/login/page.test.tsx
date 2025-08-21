import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useAuth } from 'hooks/useAuth';
import LoginPage from 'app/(DashboardLayout)/auth/login/page';

// Mock next/navigation
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

// Mock useAuth hook
jest.mock('hooks/useAuth');

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockPush = jest.fn();
const mockLogin = jest.fn();

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
      instructor: null,
      isAuthLoading: false,
    } as any);
  });

  it('renders the login form correctly', () => {
    render(<LoginPage />);

    expect(screen.getByText('Instructor Login')).toBeInTheDocument();
    expect(screen.getByText('Sign in to access the student management system')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('has correct form fields with proper attributes', () => {
    render(<LoginPage />);

    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');

    expect(emailField).toHaveAttribute('type', 'email');
    expect(emailField).toHaveAttribute('placeholder', 'instructor@toughnosekarate.com');
    expect(passwordField).toHaveAttribute('type', 'password');
    expect(passwordField).toHaveAttribute('placeholder', 'Enter your password');
  });

  it('toggles password visibility when icon is clicked', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const passwordField = screen.getByLabelText('Password');
    expect(passwordField).toHaveAttribute('type', 'password');

    // Find and click the visibility toggle button
    const visibilityToggle = screen.getByRole('button', { name: /toggle password visibility/i });
    await user.click(visibilityToggle);

    expect(passwordField).toHaveAttribute('type', 'text');

    // Click again to toggle back
    await user.click(visibilityToggle);
    expect(passwordField).toHaveAttribute('type', 'password');
  });

  it('displays validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const submitButton = screen.getByText('Sign In');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
  });

  it('displays validation error for invalid email format', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const emailField = screen.getByLabelText('Email Address');
    await user.type(emailField, 'invalid-email');

    const submitButton = screen.getByText('Sign In');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('displays validation error for short password', async () => {
    const user = userEvent.setup();
    render(<LoginPage />);

    const passwordField = screen.getByLabelText('Password');
    await user.type(passwordField, '123');

    const submitButton = screen.getByText('Sign In');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument();
    });
  });

  it('calls login function with correct credentials when form is submitted', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce({});

    render(<LoginPage />);

    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');

    await user.type(emailField, 'instructor@toughnosekarate.com');
    await user.type(passwordField, 'password123');

    // Look for submit button by text instead of role
    const submitButton = screen.getByText('Sign In');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(mockLogin).toHaveBeenCalledWith('instructor@toughnosekarate.com', 'password123');
      },
      { timeout: 10000 }
    );
  }, 15000);

  it('redirects to students page on successful login', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValueOnce({});

    render(<LoginPage />);

    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign In');

    await user.type(emailField, 'instructor@toughnosekarate.com');
    await user.type(passwordField, 'password123');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(mockPush).toHaveBeenCalledWith('/students');
      },
      { timeout: 10000 }
    );
  }, 15000);

  it('displays error message when login fails', async () => {
    const user = userEvent.setup();
    const errorMessage = 'Invalid credentials';
    mockLogin.mockRejectedValueOnce(new Error(errorMessage));

    render(<LoginPage />);

    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign In');

    await user.type(emailField, 'instructor@toughnosekarate.com');
    await user.type(passwordField, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Check that the error is displayed in an alert
    const errorAlert = screen.getByRole('alert');
    expect(errorAlert).toBeInTheDocument();
    expect(errorAlert).toHaveTextContent(errorMessage);
  }, 15000);

  it('displays generic error message for non-Error objects', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValueOnce('Some string error');

    render(<LoginPage />);

    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign In');

    await user.type(emailField, 'instructor@toughnosekarate.com');
    await user.type(passwordField, 'password123');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText('Login failed')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  }, 15000);

  it('clears error message when new login attempt is made', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<LoginPage />);

    const emailField = screen.getByLabelText('Email Address');
    const passwordField = screen.getByLabelText('Password');
    const submitButton = screen.getByText('Sign In');

    // First failed attempt
    await user.type(emailField, 'instructor@toughnosekarate.com');
    await user.type(passwordField, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(
      () => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      },
      { timeout: 10000 }
    );

    // Clear fields and try again
    await user.clear(emailField);
    await user.clear(passwordField);

    mockLogin.mockResolvedValueOnce({});

    await user.type(emailField, 'instructor@toughnosekarate.com');
    await user.type(passwordField, 'correctpassword');
    await user.click(submitButton);

    // Error should be cleared during new submission
    await waitFor(
      () => {
        expect(screen.queryByText('Invalid credentials')).not.toBeInTheDocument();
      },
      { timeout: 10000 }
    );
  }, 20000);

  it('has help text at the bottom', () => {
    render(<LoginPage />);

    expect(screen.getByText('Need help? Contact the system administrator')).toBeInTheDocument();
  });

  it('has proper card layout structure', () => {
    const { container } = render(<LoginPage />);

    // Check for MUI Container
    const containerElement = container.querySelector('.MuiContainer-root');
    expect(containerElement).toBeInTheDocument();

    // Check for MUI Card
    const cardElement = container.querySelector('.MuiCard-root');
    expect(cardElement).toBeInTheDocument();
  });
});
