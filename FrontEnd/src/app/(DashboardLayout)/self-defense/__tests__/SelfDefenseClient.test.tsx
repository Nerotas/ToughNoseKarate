import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SelfDefenseClient from '../SelfDefenseClient';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock useAuth hook
jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

// Mock useGet hook
jest.mock('../../../../hooks/useGet', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock loading component
jest.mock('../../../../app/loading', () => {
  return function Loading() {
    return <div data-testid='loading'>Loading...</div>;
  };
});

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

const mockUseAuth = require('../../../../hooks/useAuth').useAuth;
const mockUseGet = require('../../../../hooks/useGet').default;

const mockSelfDefense = [
  {
    id: 1,
    name: 'Release Front Grab (Basic)',
    korean: 'Ap Jab Gi Hae Je',
    belt: 'Green White',
    beltColor: '#90EE90',
    description: 'Basic technique to escape from a front lapel or shirt grab.',
    category: 'Releases',
    difficulty: 'Beginner',
    scenario: 'Opponent grabs your shirt or lapel from the front',
    technique: 'Simple circular hand motion to break grip',
    setup: [
      'Opponent grabs your shirt with one hand',
      'Maintain balance and stay calm',
      'Assess the situation quickly',
    ],
    execution: [
      'Raise both arms up and to the sides',
      'Bring arms down in circular motion',
      "Strike through opponent's thumbs (weakest point)",
      'Step back to create distance',
      'Prepare counter-attack if needed',
    ],
    keyPoints: [
      'Strike at the thumbs, not the strong grip',
      'Use circular motion, not straight pull',
      'Immediate movement after release',
      'Basic footwork for distance',
    ],
    commonMistakes: [
      'Pulling straight back against strong grip',
      'Not moving through the thumbs',
      'Standing still after release',
      'Panic instead of technique',
    ],
    applications: [
      'Basic street self-defense',
      'De-escalation situations',
      'Introduction to releases',
    ],
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 2,
    name: 'Release Rear Grab (Basic)',
    korean: 'Dwi Jab Gi Hae Je',
    belt: 'Green White',
    beltColor: '#90EE90',
    description: 'Basic technique to escape from someone grabbing from behind.',
    category: 'Releases',
    difficulty: 'Beginner',
    scenario: 'Opponent grabs your shirt or arms from behind',
    technique: 'Simple turn and break technique',
    setup: [
      'Opponent grabs from behind',
      'Feel the direction of the grab',
      'Maintain balance and composure',
    ],
    execution: [
      'Drop your weight slightly',
      'Turn quickly to the outside',
      'Raise arms and break at weak point',
      'Face the attacker',
      'Create distance immediately',
    ],
    keyPoints: [
      'Turn into the technique, not away',
      'Use body weight to assist break',
      'Quick decisive movement',
      'Always face the threat after escape',
    ],
    commonMistakes: [
      'Turning the wrong direction',
      'Not dropping weight first',
      'Slow or hesitant movement',
      'Not creating distance after escape',
    ],
    applications: ['Rear attack defense', 'Grab escape fundamentals', 'Basic positioning'],
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 3,
    name: 'Basic Wrist Control',
    korean: 'Gi Bon Son Mok Control',
    belt: 'Green White',
    beltColor: '#90EE90',
    description: "Fundamental technique for controlling and redirecting an opponent's wrist grab.",
    category: 'Wrist Control',
    difficulty: 'Beginner',
    scenario: 'Opponent grabs your wrist with one hand',
    technique: 'Basic leverage and rotation to control wrist',
    setup: ['Opponent grabs your wrist', 'Remain calm and assess grip', 'Position for leverage'],
    execution: [
      "Rotate wrist toward opponent's thumb",
      'Apply leverage with other hand',
      'Step to create better angle',
      "Control opponent's balance",
      'Create distance or counter',
    ],
    keyPoints: [
      'Attack the grip weakness (thumb side)',
      'Use both hands for leverage',
      'Step for better positioning',
      "Control opponent's movement",
    ],
    commonMistakes: [
      'Fighting against the strong grip',
      'Using only one hand',
      'Poor foot positioning',
      'Not following through',
    ],
    applications: ['Grip escape basics', 'Control techniques', 'Fundamental leverage'],
    createdAt: null,
    updatedAt: null,
  },
];

describe('SelfDefenseClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: undefined,
      isPending: true,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders self defense data when loaded', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Self Defense Techniques')).toBeInTheDocument();
    });
  });

  it('displays filter controls', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Category')).toBeInTheDocument();
      expect(screen.getByLabelText('Belt Level')).toBeInTheDocument();
      expect(screen.getByLabelText('Difficulty')).toBeInTheDocument();
    });
  });

  it('displays search functionality', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search techniques...')).toBeInTheDocument();
    });
  });

  it('displays self defense technique cards', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Wrist Escape')).toBeInTheDocument();
      expect(screen.getByText('Bear Hug Defense')).toBeInTheDocument();
      expect(screen.getByText('Choke Defense')).toBeInTheDocument();
    });
  });

  it('shows add technique button for admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    expect(screen.getByText('Add Technique')).toBeInTheDocument();
  });

  it('hides add technique button for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    expect(screen.queryByText('Add Technique')).not.toBeInTheDocument();
  });

  it('allows filtering by category', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    const categorySelect = screen.getByLabelText('Category');
    fireEvent.mouseDown(categorySelect);

    await waitFor(() => {
      expect(screen.getByText('All')).toBeInTheDocument();
    });
  });

  it('allows searching techniques', async () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    mockUseGet.mockReturnValue({
      data: mockSelfDefense,
      isPending: false,
      refetch: jest.fn(),
    });

    render(
      <TestWrapper>
        <SelfDefenseClient />
      </TestWrapper>
    );

    const searchInput = screen.getByPlaceholderText('Search techniques...');
    fireEvent.change(searchInput, { target: { value: 'Wrist' } });

    expect(searchInput).toHaveValue('Wrist');
  });
});
