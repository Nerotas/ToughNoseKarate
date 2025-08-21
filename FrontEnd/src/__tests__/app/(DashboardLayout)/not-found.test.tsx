import { render, screen, fireEvent } from '@testing-library/react';
import NotFound from 'app/(DashboardLayout)/not-found';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

// Mock Tabler icons
jest.mock('@tabler/icons-react', () => ({
  IconKarate: ({ size, color }: { size?: number; color?: string }) => (
    <div data-testid='karate-icon' data-size={size} data-color={color}>
      Karate Icon
    </div>
  ),
  IconHome: () => <div data-testid='home-icon'>Home Icon</div>,
  IconArrowLeft: () => <div data-testid='arrow-left-icon'>Arrow Left Icon</div>,
}));

// Mock window.history.back
const mockHistoryBack = jest.fn();
Object.defineProperty(window, 'history', {
  value: {
    back: mockHistoryBack,
  },
  writable: true,
});

describe('NotFound Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main 404 heading', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('displays martial arts themed error message', () => {
    render(<NotFound />);

    expect(screen.getByText('Technique Not Found!')).toBeInTheDocument();
    expect(
      screen.getByText('"The page you seek is like a hidden technique..."')
    ).toBeInTheDocument();
  });

  it('shows descriptive error text', () => {
    render(<NotFound />);

    expect(screen.getByText(/This page has mastered the art of invisibility/)).toBeInTheDocument();
  });

  it('renders the animated karate icon', () => {
    render(<NotFound />);

    const icon = screen.getByTestId('karate-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-size', '120');
    expect(icon).toHaveAttribute('data-color', '#1976d2');
  });

  it('displays return to dojo button with correct link', () => {
    render(<NotFound />);

    const dojoButton = screen.getByRole('link', { name: /return to dojo/i });
    expect(dojoButton).toBeInTheDocument();
    expect(dojoButton).toHaveAttribute('href', '/');
    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('displays previous stance button', () => {
    render(<NotFound />);

    const previousButton = screen.getByRole('button', { name: /previous stance/i });
    expect(previousButton).toBeInTheDocument();
    expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument();
  });

  it('calls window.history.back when previous stance button is clicked', () => {
    render(<NotFound />);

    const previousButton = screen.getByRole('button', { name: /previous stance/i });
    fireEvent.click(previousButton);

    expect(mockHistoryBack).toHaveBeenCalledTimes(1);
  });

  it('displays martial arts wisdom section', () => {
    render(<NotFound />);

    expect(screen.getByText('Martial Arts Wisdom:')).toBeInTheDocument();
    expect(screen.getByText(/A true martial artist adapts to any situation/)).toBeInTheDocument();
  });

  it('shows error code for developers', () => {
    render(<NotFound />);

    expect(
      screen.getByText(/Error Code: 404 \| Page Status: Missing in Action/)
    ).toBeInTheDocument();
  });

  it('has proper responsive structure', () => {
    render(<NotFound />);

    // Check that main container exists by finding the 404 text and its container
    const container = screen.getByText('404').closest('div');
    expect(container).toBeInTheDocument();
  });
  it('renders all key UI elements', () => {
    render(<NotFound />);

    // Check for all major sections
    expect(screen.getByTestId('karate-icon')).toBeInTheDocument();
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Technique Not Found!')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to dojo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /previous stance/i })).toBeInTheDocument();
    expect(screen.getByText('Martial Arts Wisdom:')).toBeInTheDocument();
  });

  it('has accessible button labels', () => {
    render(<NotFound />);

    const dojoLink = screen.getByRole('link', { name: /return to dojo/i });
    const previousButton = screen.getByRole('button', { name: /previous stance/i });

    expect(dojoLink).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
  });

  it('handles multiple button interactions', () => {
    render(<NotFound />);

    const previousButton = screen.getByRole('button', { name: /previous stance/i });

    // Click multiple times
    fireEvent.click(previousButton);
    fireEvent.click(previousButton);

    expect(mockHistoryBack).toHaveBeenCalledTimes(2);
  });

  it('displays all expected text content', () => {
    render(<NotFound />);

    // Key text elements
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Technique Not Found!')).toBeInTheDocument();
    expect(screen.getByText(/The page you seek is like a hidden technique/)).toBeInTheDocument();
    expect(screen.getByText(/This page has mastered the art of invisibility/)).toBeInTheDocument();
    expect(screen.getByText('Return to Dojo')).toBeInTheDocument();
    expect(screen.getByText('Previous Stance')).toBeInTheDocument();
    expect(screen.getByText('Martial Arts Wisdom:')).toBeInTheDocument();
  });
});
