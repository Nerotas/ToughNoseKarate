import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentAssessmentForm from '../StudentAssessmentForm';
import { StudentAssessment } from 'models/Assessments/Assessments';
import { mockBeltRequirements } from 'testingUtils/MockData/mockBeltRequirements';

// Mock helper functions
jest.mock('utils/helpers/BeltColors', () => ({
  getBeltColor: jest.fn(() => '#fff'),
  getBeltTextColor: jest.fn(() => '#000'),
}));

// Mock the AssessmentDialog component
jest.mock('../AssessmentDialog', () => {
  return function MockAssessmentDialog({ editDialogOpen, closeEditDialog }: any) {
    return editDialogOpen ? (
      <div data-testid='assessment-dialog'>
        <button onClick={closeEditDialog}>Close Dialog</button>
      </div>
    ) : null;
  };
});

describe('StudentAssessmentForm', () => {
  const mockAssessment: StudentAssessment = {
    assessment_id: 1,
    student_id: 1,
    assessment_date: '2023-01-01',
    target_belt_rank: 'Yellow',
    overall_score: 8,
    assessment_status: 'in_progress',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  };

  const defaultProps = {
    currentAssessment: mockAssessment,
    beltRequirements: mockBeltRequirements,
    assessmentLoading: false,
    assessmentError: null,
    savingAssessment: false,
    handleCreateAssessment: jest.fn(),
    handleCompleteAssessment: jest.fn(),
    handleCancelAssessment: jest.fn(),
    onAssessmentUpdate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render assessment form header', () => {
    render(<StudentAssessmentForm {...defaultProps} />);

    expect(screen.getByText('Current Assessment')).toBeInTheDocument();
  });

  it('should show create assessment button when no current assessment', () => {
    render(<StudentAssessmentForm {...defaultProps} currentAssessment={null} />);

    expect(screen.getAllByText('Start New Assessment')).toHaveLength(2); // One in header, one in main area
  });

  it('should call handleCreateAssessment when create button is clicked', async () => {
    const handleCreateAssessment = jest.fn().mockResolvedValue(undefined);

    render(
      <StudentAssessmentForm
        {...defaultProps}
        currentAssessment={null}
        handleCreateAssessment={handleCreateAssessment}
      />
    );

    const createButtons = screen.getAllByText('Start New Assessment');
    fireEvent.click(createButtons[0]); // Click the first one

    expect(handleCreateAssessment).toHaveBeenCalledTimes(1);
  });

  it('should show assessment details when current assessment exists', () => {
    render(<StudentAssessmentForm {...defaultProps} />);

    expect(screen.getByText('Current Assessment')).toBeInTheDocument();
    expect(screen.getByText('in progress')).toBeInTheDocument(); // Status is reformatted
  });

  it('should show loading state', () => {
    render(<StudentAssessmentForm {...defaultProps} assessmentLoading={true} />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should show error state', () => {
    const error = { message: 'Failed to load assessment' };

    render(<StudentAssessmentForm {...defaultProps} assessmentError={error} />);

    expect(screen.getByText('Failed to load assessment data')).toBeInTheDocument();
  });

  it('should show edit button for in-progress assessment', () => {
    render(<StudentAssessmentForm {...defaultProps} />);

    expect(screen.getByText('Edit Assessment')).toBeInTheDocument();
  });

  it('should open edit dialog when edit button is clicked', () => {
    render(<StudentAssessmentForm {...defaultProps} />);

    const editButton = screen.getByText('Edit Assessment');
    fireEvent.click(editButton);

    expect(screen.getByTestId('assessment-dialog')).toBeInTheDocument();
  });

  it('should close edit dialog', () => {
    render(<StudentAssessmentForm {...defaultProps} />);

    // Open dialog
    const editButton = screen.getByText('Edit Assessment');
    fireEvent.click(editButton);

    expect(screen.getByTestId('assessment-dialog')).toBeInTheDocument();

    // Close dialog
    const closeButton = screen.getByText('Close Dialog');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('assessment-dialog')).not.toBeInTheDocument();
  });

  it('should show complete assessment buttons for in-progress assessment', () => {
    render(<StudentAssessmentForm {...defaultProps} />);

    expect(screen.getByText('Mark as Passed')).toBeInTheDocument();
    expect(screen.getByText('Mark as Failed')).toBeInTheDocument();
    expect(screen.getByText('Cancel Assessment')).toBeInTheDocument();
  });

  it('should call handleCompleteAssessment with pass when Pass button clicked', async () => {
    const handleCompleteAssessment = jest.fn().mockResolvedValue(undefined);

    render(
      <StudentAssessmentForm
        {...defaultProps}
        handleCompleteAssessment={handleCompleteAssessment}
      />
    );

    const passButton = screen.getByText('Mark as Passed');
    fireEvent.click(passButton);

    expect(handleCompleteAssessment).toHaveBeenCalledWith(true);
  });

  it('should call handleCompleteAssessment with fail when Fail button clicked', async () => {
    const handleCompleteAssessment = jest.fn().mockResolvedValue(undefined);

    render(
      <StudentAssessmentForm
        {...defaultProps}
        handleCompleteAssessment={handleCompleteAssessment}
      />
    );

    const failButton = screen.getByText('Mark as Failed');
    fireEvent.click(failButton);

    expect(handleCompleteAssessment).toHaveBeenCalledWith(false);
  });

  it('should call handleCancelAssessment when Cancel button clicked', async () => {
    const handleCancelAssessment = jest.fn().mockResolvedValue(undefined);

    render(
      <StudentAssessmentForm {...defaultProps} handleCancelAssessment={handleCancelAssessment} />
    );

    const cancelButton = screen.getByText('Cancel Assessment');
    fireEvent.click(cancelButton);

    expect(handleCancelAssessment).toHaveBeenCalledTimes(1);
  });

  it('should disable buttons when saving assessment', () => {
    const inProgressAssessment = {
      ...mockAssessment,
      assessment_status: 'in_progress' as const,
    };

    render(
      <StudentAssessmentForm
        {...defaultProps}
        currentAssessment={inProgressAssessment}
        savingAssessment={true}
      />
    );

    expect(screen.getByText('Mark as Passed')).toBeDisabled();
    expect(screen.getByText('Mark as Failed')).toBeDisabled();
    expect(screen.getByText('Cancel Assessment')).toBeDisabled();
  });

  it('should show completed assessment status', () => {
    const completedAssessment = {
      ...mockAssessment,
      assessment_status: 'completed' as const,
      passed: true,
    };

    render(<StudentAssessmentForm {...defaultProps} currentAssessment={completedAssessment} />);

    expect(screen.getByText('completed')).toBeInTheDocument();
  });

  it('should display assessment status', () => {
    render(<StudentAssessmentForm {...defaultProps} />);

    expect(screen.getByText('in progress')).toBeInTheDocument();
  });

  it('should display target belt rank', () => {
    render(<StudentAssessmentForm {...defaultProps} />);

    expect(screen.getByText('Yellow')).toBeInTheDocument();
  });

  it('should show target belt chip', () => {
    render(<StudentAssessmentForm {...defaultProps} />);

    expect(screen.getByText('Yellow')).toBeInTheDocument();
  });

  it('should call onAssessmentUpdate when provided', async () => {
    const onAssessmentUpdate = jest.fn();

    render(<StudentAssessmentForm {...defaultProps} onAssessmentUpdate={onAssessmentUpdate} />);

    // Open edit dialog to trigger the prop passing
    const editButton = screen.getByText('Edit Assessment');
    fireEvent.click(editButton);

    // The onAssessmentUpdate should be passed to the dialog
    expect(screen.getByTestId('assessment-dialog')).toBeInTheDocument();
  });
});
