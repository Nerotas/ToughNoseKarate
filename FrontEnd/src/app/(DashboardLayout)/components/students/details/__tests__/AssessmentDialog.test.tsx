import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssessmentDialog from '../AssessmentDialog';
import { StudentAssessment } from '../../../../../../models/Assessments/Assessments';
import { BeltRequirements } from '../../../../../../models/BeltRequirements/BeltRequirements';

// Mock the services
jest.mock('services/studentAssessmentsService', () => ({
  studentAssessmentsService: {
    updateAssessment: jest.fn(),
  },
}));

// Mock the helper functions
jest.mock('helpers/Student', () => ({
  assessmentValidationSchema: {
    validate: jest.fn().mockResolvedValue({}),
  },
  getInitialValues: jest.fn((assessment) => ({
    assessment_date: assessment?.assessment_date || '2023-01-01',
    target_belt_rank: assessment?.target_belt_rank || 'Yellow',
    examiner_notes: assessment?.examiner_notes || '',
    overall_score: assessment?.overall_score || 0,
    geocho_hyung_il_bu: assessment?.geocho_hyung_il_bu || null,
    pyong_an_cho_dan: assessment?.pyong_an_cho_dan || null,
    front_kick: assessment?.front_kick || null,
    upper_cut: assessment?.upper_cut || null,
  })),
  getTargetBeltRequirements: jest.fn((beltRequirements: any[], targetBelt: string) => 
    beltRequirements.find((belt: any) => belt.beltRank === targetBelt) || null
  ),
}));

describe('AssessmentDialog', () => {
  const mockAssessment: StudentAssessment = {
    assessment_id: 1,
    student_id: 1,
    assessment_date: '2023-01-01',
    target_belt_rank: 'Yellow',
    examiner_notes: 'Good progress',
    overall_score: 8,
    geocho_hyung_il_bu: 9,
    pyong_an_cho_dan: 6,
    front_kick: 8,
    upper_cut: 7,
    assessment_status: 'completed',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
  };

  const mockBeltRequirements: BeltRequirements[] = [
    {
      beltOrder: 1,
      beltRank: 'Yellow',
      forms: ['Geocho Hyung Il Bu'],
      stances: ['Front Stance'],
      blocks: ['High Block'],
      punches: ['Jab'],
      kicks: ['Front Kick'],
      jumps: [],
      falling: [],
      oneSteps: [],
      selfDefense: [],
      color: '#FFFF00',
      textColor: '#000000',
    },
  ];

  const defaultProps = {
    editDialogOpen: true,
    closeEditDialog: jest.fn(),
    editingAssessment: mockAssessment,
    beltRequirements: mockBeltRequirements,
    onAssessmentUpdate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render dialog when editDialogOpen is true', () => {
    render(<AssessmentDialog {...defaultProps} />);

    expect(screen.getByText('Edit Assessment')).toBeInTheDocument();
  });

  it('should not render dialog when editDialogOpen is false', () => {
    render(<AssessmentDialog {...defaultProps} editDialogOpen={false} />);

    expect(screen.queryByText('Edit Assessment')).not.toBeInTheDocument();
  });

  it('should call closeEditDialog when close button is clicked', () => {
    const closeEditDialog = jest.fn();
    render(<AssessmentDialog {...defaultProps} closeEditDialog={closeEditDialog} />);

    // Look for Cancel button or close action
    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(closeEditDialog).toHaveBeenCalledTimes(1);
  });

  it('should display form fields', () => {
    render(<AssessmentDialog {...defaultProps} />);

    expect(screen.getByLabelText(/Assessment Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target Belt/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Examiner Notes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Overall Score/i)).toBeInTheDocument();
  });

  it('should handle form submission', async () => {
    const onAssessmentUpdate = jest.fn().mockResolvedValue(undefined);
    const { studentAssessmentsService } = require('services/studentAssessmentsService');
    studentAssessmentsService.updateAssessment.mockResolvedValue(mockAssessment);

    render(<AssessmentDialog {...defaultProps} onAssessmentUpdate={onAssessmentUpdate} />);

    // Submit the form
    const saveButton = screen.getByText('Save Assessment');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(studentAssessmentsService.updateAssessment).toHaveBeenCalled();
    });
  });

  it('should handle form submission error', async () => {
    const { studentAssessmentsService } = require('services/studentAssessmentsService');
    studentAssessmentsService.updateAssessment.mockRejectedValue(new Error('Update failed'));

    render(<AssessmentDialog {...defaultProps} />);

    // Submit the form
    const saveButton = screen.getByText('Save Assessment');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/Error updating assessment/i)).toBeInTheDocument();
    });
  });

  it('should not submit when editingAssessment is null', async () => {
    const { studentAssessmentsService } = require('services/studentAssessmentsService');

    render(<AssessmentDialog {...defaultProps} editingAssessment={null} />);

    // Submit the form
    const saveButton = screen.getByText('Save Assessment');
    fireEvent.click(saveButton);

    // Wait a bit to ensure no API call is made
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(studentAssessmentsService.updateAssessment).not.toHaveBeenCalled();
  });

  it('should update form values', async () => {
    const user = userEvent.setup();
    render(<AssessmentDialog {...defaultProps} />);

    // Update examiner notes
    const notesField = screen.getByLabelText(/Examiner Notes/i);
    await user.clear(notesField);
    await user.type(notesField, 'Updated notes');

    expect(notesField).toHaveValue('Updated notes');
  });

  it('should display belt requirement sections', () => {
    render(<AssessmentDialog {...defaultProps} />);

    // Check for form sections
    expect(screen.getByText(/Forms/i)).toBeInTheDocument();
    expect(screen.getByText(/Kicks/i)).toBeInTheDocument();
    expect(screen.getByText(/Punches/i)).toBeInTheDocument();
  });

  it('should handle select field changes', async () => {
    const user = userEvent.setup();
    render(<AssessmentDialog {...defaultProps} />);

    // Find and interact with a select field (e.g., Overall Score)
    const overallScoreSelect = screen.getByLabelText(/Overall Score/i);
    await user.click(overallScoreSelect);

    // Select a different value
    const passOption = screen.getByText('Pass');
    await user.click(passOption);

    expect(overallScoreSelect).toHaveDisplayValue('Pass');
  });

  it('should initialize form with correct values', () => {
    const { getInitialValues } = require('helpers/Student');

    render(<AssessmentDialog {...defaultProps} />);

    expect(getInitialValues).toHaveBeenCalledWith(mockAssessment);
  });

  it('should call onAssessmentUpdate after successful submission', async () => {
    const onAssessmentUpdate = jest.fn().mockResolvedValue(undefined);
    const { studentAssessmentsService } = require('services/studentAssessmentsService');
    studentAssessmentsService.updateAssessment.mockResolvedValue(mockAssessment);

    render(<AssessmentDialog {...defaultProps} onAssessmentUpdate={onAssessmentUpdate} />);

    // Submit the form
    const saveButton = screen.getByText('Save Assessment');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(onAssessmentUpdate).toHaveBeenCalledWith(mockAssessment);
    });
  });

  it('should close dialog after successful submission', async () => {
    const closeEditDialog = jest.fn();
    const { studentAssessmentsService } = require('services/studentAssessmentsService');
    studentAssessmentsService.updateAssessment.mockResolvedValue(mockAssessment);

    render(<AssessmentDialog {...defaultProps} closeEditDialog={closeEditDialog} />);

    // Submit the form
    const saveButton = screen.getByText('Save Assessment');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(closeEditDialog).toHaveBeenCalled();
    });
  });

  it('should render technique assessment fields based on belt requirements', () => {
    const requirements = [
      { technique_name: 'Front Kick', belt_requirement: 'Yellow' },
      { technique_name: 'Side Kick', belt_requirement: 'Yellow' },
    ];

    render(<AssessmentDialog {...defaultProps} beltRequirements={requirements} />);

    // These would appear as assessment options in the form
    expect(screen.getByText(/Kicks/i)).toBeInTheDocument();
  });
});
