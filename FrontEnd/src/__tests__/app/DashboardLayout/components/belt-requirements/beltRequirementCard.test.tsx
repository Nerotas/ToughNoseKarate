import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '../../../../../hooks/useAuth';
import BeltRequirementCard from '../../../../../app/(DashboardLayout)/components/belt-requirements/beltRequirementCard';
import { BeltRequirements } from '../../../../../models/BeltRequirements/BeltRequirements';
import { mockBeltRequirements } from 'testingUtils/MockData/mockBeltRequirements';

// Mock hooks and components
jest.mock('../../../../../hooks/useAuth');
jest.mock(
  '../../../../../app/(DashboardLayout)/components/belt-requirements/RequirementsList',
  () => {
    return function MockRequirementsList({ requirements, requirementName }: any) {
      return (
        <div data-testid={`requirements-${requirementName.toLowerCase().replace(' ', '-')}`}>
          {requirementName}: {requirements.join(', ')}
        </div>
      );
    };
  }
);
jest.mock(
  '../../../../../app/(DashboardLayout)/components/belt-requirements/beltRequirementsEditModule',
  () => {
    return function MockEditModule({ open, handleCloseEdit }: any) {
      return open ? <div data-testid='edit-modal'>Edit Modal</div> : null;
    };
  }
);
jest.mock(
  '../../../../../app/(DashboardLayout)/components/belt-requirements/beltRequirementDeleteModule',
  () => {
    return function MockDeleteModule({ open, handleClose }: any) {
      return open ? <div data-testid='delete-modal'>Delete Modal</div> : null;
    };
  }
);

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('BeltRequirementCard Component', () => {
  const mockBelt: BeltRequirements = mockBeltRequirements[0];

  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders belt information correctly', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(<BeltRequirementCard belt={mockBelt} refetchBeltRequirements={mockRefetch} />);

    // Check belt rank chip
    expect(screen.getByText('White Belt')).toBeInTheDocument();
  });

  it('renders requirements lists when they have content', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(<BeltRequirementCard belt={mockBelt} refetchBeltRequirements={mockRefetch} />);

    // Check that requirements lists are rendered for non-empty arrays
    expect(screen.getByTestId('requirements-forms')).toBeInTheDocument();
    expect(screen.getByTestId('requirements-blocks')).toBeInTheDocument();
    expect(screen.getByTestId('requirements-punches')).toBeInTheDocument();
    expect(screen.getByTestId('requirements-kicks')).toBeInTheDocument();
    expect(screen.getByTestId('requirements-one-steps')).toBeInTheDocument();

    // Check that empty arrays don't render lists
    expect(screen.queryByTestId('requirements-jumps')).not.toBeInTheDocument();
    expect(screen.queryByTestId('requirements-falling')).not.toBeInTheDocument();
    expect(screen.queryByTestId('requirements-self-defense')).not.toBeInTheDocument();
  });

  it('renders comments when present', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(<BeltRequirementCard belt={mockBelt} refetchBeltRequirements={mockRefetch} />);

    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
  });

  it('does not render comments when not present', () => {
    const beltWithoutComments = { ...mockBelt, comments: undefined };
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,

      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(
      <BeltRequirementCard belt={beltWithoutComments} refetchBeltRequirements={mockRefetch} />
    );

    expect(screen.queryByText('This is a test comment')).not.toBeInTheDocument();
  });

  it('shows edit and delete buttons for authenticated instructors', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' as const, id: 1, name: 'Test Instructor' },

      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(<BeltRequirementCard belt={mockBelt} refetchBeltRequirements={mockRefetch} />);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('shows edit and delete buttons for authenticated admins', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' as const, id: 1, name: 'Test Admin' },

      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(<BeltRequirementCard belt={mockBelt} refetchBeltRequirements={mockRefetch} />);

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('does not show edit and delete buttons for unauthenticated users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,

      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(<BeltRequirementCard belt={mockBelt} refetchBeltRequirements={mockRefetch} />);

    expect(screen.queryByRole('button', { name: /edit/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /delete/i })).not.toBeInTheDocument();
  });

  it('opens edit modal when edit button is clicked', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' as const, id: 1, name: 'Test Instructor' },

      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(<BeltRequirementCard belt={mockBelt} refetchBeltRequirements={mockRefetch} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
  });

  it('opens delete modal when delete button is clicked', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' as const, id: 1, name: 'Test Instructor' },

      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(<BeltRequirementCard belt={mockBelt} refetchBeltRequirements={mockRefetch} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  });

  it('applies correct chip styling for white belt', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,

      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    const { container } = render(
      <BeltRequirementCard belt={mockBelt} refetchBeltRequirements={mockRefetch} />
    );

    // Check that the chip component is rendered
    const chip = container.querySelector('.MuiChip-root');
    expect(chip).toBeInTheDocument();
  });

  it('applies correct chip styling for colored belts', () => {
    const coloredBelt = { ...mockBelt, color: '#FF0000', beltRank: 'Red Belt' };
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,

      login: jest.fn(),
      logout: jest.fn(),
      isAuthLoading: false,
      refreshToken: jest.fn(),
      ensureProfile: jest.fn(),
      loginError: null,
      profileError: null,
    });

    render(<BeltRequirementCard belt={coloredBelt} refetchBeltRequirements={mockRefetch} />);

    expect(screen.getByText('Red Belt')).toBeInTheDocument();
  });
});
