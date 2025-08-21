import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '../../../../../hooks/useAuth';
import BlockCard from '../../../../../app/(DashboardLayout)/components/blocks/blockCard';
import { BlockDefinition } from '../../../../../models/Blocks/Blocks';

// Mock hooks and components
jest.mock('../../../../../hooks/useAuth');
jest.mock('../../../../../app/(DashboardLayout)/components/blocks/blockEditModule', () => {
  return function MockEditModule({ open, handleCloseEdit }: any) {
    return open ? <div data-testid='edit-modal'>Edit Modal</div> : null;
  };
});
jest.mock('../../../../../app/(DashboardLayout)/components/blocks/blockDeleteModule', () => {
  return function MockDeleteModule({ open, handleClose }: any) {
    return open ? <div data-testid='delete-modal'>Delete Modal</div> : null;
  };
});

const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

describe('BlockCard Component', () => {
  const mockBlock: BlockDefinition = {
    id: 1,
    blockName: 'High Block',
    technique: 'Defensive Block',
    belt: 'White Belt',
    beltColor: '#FFFFFF',
    stance: 'Front stance',
    execution: ['Step 1: Prepare position', 'Step 2: Execute block', 'Step 3: Return to ready'],
    keyPoints: ['Keep elbow up', 'Use forearm', 'Maintain balance'],
    commonMistakes: ['Dropping elbow', 'Poor timing', 'Wrong distance'],
    applications: ['Against overhead attacks', 'Self defense', 'Forms'],
  };

  const mockGetBeltTextColor = jest.fn((color: string) =>
    color === '#FFFFFF' ? '#000000' : '#FFFFFF'
  );
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders block information correctly', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.getByText('High Block')).toBeInTheDocument();
    expect(screen.getByText('Defensive Block')).toBeInTheDocument();
    expect(screen.getByText('White Belt')).toBeInTheDocument();
  });

  it('renders stance information when provided', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.getByText('Stance:')).toBeInTheDocument();
    expect(screen.getByText('Front stance')).toBeInTheDocument();
  });

  it('does not render stance section when stance is not provided', () => {
    const blockWithoutStance = { ...mockBlock, stance: undefined };
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={blockWithoutStance}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.queryByText('Stance:')).not.toBeInTheDocument();
  });

  it('renders execution steps when provided', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.getByText('Execution Steps:')).toBeInTheDocument();
    expect(screen.getByText('1. Step 1: Prepare position')).toBeInTheDocument();
    expect(screen.getByText('2. Step 2: Execute block')).toBeInTheDocument();
    expect(screen.getByText('3. Step 3: Return to ready')).toBeInTheDocument();
  });

  it('does not render execution section when execution is empty', () => {
    const blockWithoutExecution = { ...mockBlock, execution: [] };
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={blockWithoutExecution}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.queryByText('Execution Steps:')).not.toBeInTheDocument();
  });

  it('renders key points', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.getByText('Key Points:')).toBeInTheDocument();
    expect(screen.getByText('• Keep elbow up')).toBeInTheDocument();
    expect(screen.getByText('• Use forearm')).toBeInTheDocument();
    expect(screen.getByText('• Maintain balance')).toBeInTheDocument();
  });

  it('renders common mistakes', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.getByText('Common Mistakes:')).toBeInTheDocument();
    expect(screen.getByText('• Dropping elbow')).toBeInTheDocument();
    expect(screen.getByText('• Poor timing')).toBeInTheDocument();
    expect(screen.getByText('• Wrong distance')).toBeInTheDocument();
  });

  it('renders applications as chips', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.getByText('Applications:')).toBeInTheDocument();
    expect(screen.getByText('Against overhead attacks')).toBeInTheDocument();
    expect(screen.getByText('Self defense')).toBeInTheDocument();
    expect(screen.getByText('Forms')).toBeInTheDocument();
  });

  it('shows edit and delete buttons for authenticated instructors', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' as const, id: 1, name: 'Test Instructor' },
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('does not show edit and delete buttons for unauthenticated users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('opens edit modal when edit button is clicked', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' as const, id: 1, name: 'Test Instructor' },
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(screen.getByTestId('edit-modal')).toBeInTheDocument();
  });

  it('opens delete modal when delete button is clicked', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' as const, id: 1, name: 'Test Instructor' },
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.getByTestId('delete-modal')).toBeInTheDocument();
  });

  it('calls getBeltTextColor function', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    expect(mockGetBeltTextColor).toHaveBeenCalledWith('#FFFFFF');
  });

  it('applies correct styling for white belt', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
      isLoading: false,
      login: jest.fn(),
      logout: jest.fn(),
      profile: null,
    });

    const { container } = render(
      <BlockCard
        block={mockBlock}
        getBeltTextColor={mockGetBeltTextColor}
        refetchBlocks={mockRefetch}
      />
    );

    // Check that the chip component is rendered
    const chip = container.querySelector('.MuiChip-root');
    expect(chip).toBeInTheDocument();
  });
});
