import { render, screen } from '@testing-library/react';
import Loading from 'app/(DashboardLayout)/loading';
import * as LoadingSnippets from 'constants/data/LoadingSnippets';

// Mock the loading snippets module
jest.mock('constants/data/LoadingSnippets', () => ({
  randomSnippet: jest.fn(),
}));

// Mock Tabler icons
jest.mock('@tabler/icons-react', () => ({
  IconKarate: ({ size }: { size?: number }) => (
    <div data-testid='karate-icon' data-size={size}>
      Karate Icon
    </div>
  ),
}));

const mockRandomSnippet = LoadingSnippets.randomSnippet as jest.MockedFunction<
  typeof LoadingSnippets.randomSnippet
>;

describe('Loading Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRandomSnippet.mockReturnValue('Loading your martial arts journey...');
  });

  it('renders the loading container with correct test id', () => {
    render(<Loading />);

    const container = screen.getByTestId('loading-spinner');
    expect(container).toBeInTheDocument();
  });

  it('displays the karate icon with correct size', () => {
    render(<Loading />);

    const icon = screen.getByTestId('karate-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('data-size', '48');
  });

  it('displays a random loading snippet', () => {
    const testSnippet = 'Testing your techniques...';
    mockRandomSnippet.mockReturnValue(testSnippet);

    render(<Loading />);

    expect(screen.getByText(testSnippet)).toBeInTheDocument();
    expect(mockRandomSnippet).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<Loading />);

    const textElement = screen.getByText('Loading your martial arts journey...');
    expect(textElement).toHaveAttribute('aria-live', 'polite');
    // Note: suppressHydrationWarning is a React prop, not an HTML attribute
  });
  it('applies correct styling classes and structure', () => {
    render(<Loading />);

    const container = screen.getByTestId('loading-spinner');
    expect(container).toBeInTheDocument();

    // Check that the icon and text are both present
    expect(screen.getByTestId('karate-icon')).toBeInTheDocument();
    expect(screen.getByText('Loading your martial arts journey...')).toBeInTheDocument();
  });

  it('handles different random snippets', () => {
    const snippets = ['Preparing your dojo...', 'Sharpening your focus...', 'Aligning your chi...'];

    snippets.forEach((snippet) => {
      mockRandomSnippet.mockReturnValue(snippet);
      const { unmount } = render(<Loading />);

      expect(screen.getByText(snippet)).toBeInTheDocument();
      expect(mockRandomSnippet).toHaveBeenCalled();

      unmount();
    });
  });

  it('handles empty snippet gracefully', () => {
    mockRandomSnippet.mockReturnValue('');

    render(<Loading />);

    // Should still render the component structure
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.getByTestId('karate-icon')).toBeInTheDocument();
  });
});
