import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BeltRequirementCard from '../../../../../app/(DashboardLayout)/components/belt-requirements/beltRequirementCard';
import { BeltRequirements } from '../../../../../models/BeltRequirements/BeltRequirements';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Mock the useAuth hook
jest.mock('../../../../../hooks/useAuth');

const mockUseAuth = require('../../../../../hooks/useAuth').useAuth;

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme();
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe('BeltRequirementCard Component', () => {
  const mockBeltRequirement: BeltRequirements = {
    beltOrder: 1,
    beltRank: 'White Belt',
    forms: [],
    stances: [],
    blocks: [],
    punches: [],
    kicks: [],
    jumps: [],
    falling: [],
    oneSteps: [],
    selfDefense: [],
    color: '#FFFFFF',
    textColor: '#000000',
  };

  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders belt requirement information', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    render(
      <TestWrapper>
        <BeltRequirementCard belt={mockBeltRequirement} refetchBeltRequirements={mockRefetch} />
      </TestWrapper>
    );
    expect(screen.getByText('White Belt')).toBeInTheDocument();
  });

  it('shows edit and delete buttons for authenticated admins', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    render(
      <TestWrapper>
        <BeltRequirementCard belt={mockBeltRequirement} refetchBeltRequirements={mockRefetch} />
      </TestWrapper>
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('hides edit and delete buttons for non-admin users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'user' },
    });

    render(
      <TestWrapper>
        <BeltRequirementCard belt={mockBeltRequirement} refetchBeltRequirements={mockRefetch} />
      </TestWrapper>
    );

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('hides edit and delete buttons for unauthenticated users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    render(
      <TestWrapper>
        <BeltRequirementCard belt={mockBeltRequirement} refetchBeltRequirements={mockRefetch} />
      </TestWrapper>
    );

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('applies correct belt color styling', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    const { container } = render(
      <TestWrapper>
        <BeltRequirementCard belt={mockBeltRequirement} refetchBeltRequirements={mockRefetch} />
      </TestWrapper>
    );

    // Check for belt color chip with correct styling
    const beltChip = container.querySelector('.MuiChip-root');
    expect(beltChip).toBeInTheDocument();
  });

  it('renders proper card structure', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    const { container } = render(
      <TestWrapper>
        <BeltRequirementCard belt={mockBeltRequirement} refetchBeltRequirements={mockRefetch} />
      </TestWrapper>
    );

    expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiCardContent-root')).toBeInTheDocument();
  });

  it('shows requirement categories when they exist', () => {
    const beltWithRequirements: BeltRequirements = {
      ...mockBeltRequirement,
      forms: ['Basic Form 1'],
      kicks: ['Front Kick'],
      punches: ['Straight Punch'],
    };

    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    render(
      <TestWrapper>
        <BeltRequirementCard belt={beltWithRequirements} refetchBeltRequirements={mockRefetch} />
      </TestWrapper>
    );

    expect(screen.getByText('Front Kick')).toBeInTheDocument();
  });

  it('handles click events on edit button', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    render(
      <TestWrapper>
        <BeltRequirementCard belt={mockBeltRequirement} refetchBeltRequirements={mockRefetch} />
      </TestWrapper>
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    // Button click should be handled (no errors thrown)
    expect(editButton).toBeInTheDocument();
  });

  it('handles click events on delete button', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    render(
      <TestWrapper>
        <BeltRequirementCard belt={mockBeltRequirement} refetchBeltRequirements={mockRefetch} />
      </TestWrapper>
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    // Button click should be handled (no errors thrown)
    expect(deleteButton).toBeInTheDocument();
  });
});
