import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import UnauthorizedPage from '../../../app/unauthorized/page';

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

const mockPush = jest.fn();

describe('UnauthorizedPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the unauthorized page correctly', () => {
    render(<UnauthorizedPage />);

    expect(screen.getByText('Access Denied')).toBeInTheDocument();
    expect(screen.getByText("You don't have permission to access this page.")).toBeInTheDocument();
  });

  it('displays the lock icon', () => {
    const { container } = render(<UnauthorizedPage />);

    // Check for Lock icon (MUI Lock component)
    const lockIcon = container.querySelector('[data-testid="LockIcon"]');
    expect(lockIcon).toBeInTheDocument();
  });

  it('displays warning alert with helpful message', () => {
    render(<UnauthorizedPage />);

    const warningAlert = screen.getByRole('alert');
    expect(warningAlert).toBeInTheDocument();
    expect(warningAlert).toHaveTextContent(
      'This page requires special permissions. Please contact your administrator if you believe this is an error.'
    );
  });

  it('has "Go Home" button that navigates to home page', async () => {
    const user = userEvent.setup();
    render(<UnauthorizedPage />);

    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    expect(goHomeButton).toBeInTheDocument();

    await user.click(goHomeButton);

    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('has "Login" button that navigates to login page', async () => {
    const user = userEvent.setup();
    render(<UnauthorizedPage />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    await user.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith('/auth/login');
  });

  it('has proper button icons', () => {
    const { container } = render(<UnauthorizedPage />);

    // Check for Home icon
    const homeIcon = container.querySelector('[data-testid="HomeIcon"]');
    expect(homeIcon).toBeInTheDocument();

    // Check for Login icon
    const loginIcon = container.querySelector('[data-testid="LoginIcon"]');
    expect(loginIcon).toBeInTheDocument();
  });

  it('has correct button styling and layout', () => {
    render(<UnauthorizedPage />);

    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Go Home button should be outlined variant
    expect(goHomeButton).toHaveClass('MuiButton-outlined');

    // Login button should be contained variant
    expect(loginButton).toHaveClass('MuiButton-contained');
  });

  it('has proper card layout structure', () => {
    const { container } = render(<UnauthorizedPage />);

    // Check for MUI Container
    const containerElement = container.querySelector('.MuiContainer-root');
    expect(containerElement).toBeInTheDocument();

    // Check for MUI Card
    const cardElement = container.querySelector('.MuiCard-root');
    expect(cardElement).toBeInTheDocument();

    // Check for MUI CardContent
    const cardContentElement = container.querySelector('.MuiCardContent-root');
    expect(cardContentElement).toBeInTheDocument();
  });

  it('has centered text layout', () => {
    const { container } = render(<UnauthorizedPage />);

    const cardContent = container.querySelector('.MuiCardContent-root');
    expect(cardContent).toHaveStyle('text-align: center');
  });

  it('displays all key elements in correct order', () => {
    render(<UnauthorizedPage />);

    // Get all main elements and check they exist
    const heading = screen.getByRole('heading', { name: /access denied/i });
    const description = screen.getByText("You don't have permission to access this page.");
    const alert = screen.getByRole('alert');
    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    // All elements should be present
    expect(heading).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(alert).toBeInTheDocument();
    expect(goHomeButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('handles navigation correctly when buttons are clicked multiple times', async () => {
    const user = userEvent.setup();
    render(<UnauthorizedPage />);

    const goHomeButton = screen.getByRole('button', { name: /go home/i });
    const loginButton = screen.getByRole('button', { name: /login/i });

    // Click Go Home multiple times
    await user.click(goHomeButton);
    await user.click(goHomeButton);

    expect(mockPush).toHaveBeenCalledTimes(2);
    expect(mockPush).toHaveBeenNthCalledWith(1, '/');
    expect(mockPush).toHaveBeenNthCalledWith(2, '/');

    // Click Login button
    await user.click(loginButton);

    expect(mockPush).toHaveBeenCalledTimes(3);
    expect(mockPush).toHaveBeenNthCalledWith(3, '/auth/login');
  });
});
