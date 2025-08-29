import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import StudentDetailClient from 'app/(DashboardLayout)/students/[id]/StudentDetailClient';
import { getBeltColor, getBeltTextColor } from 'utils/helpers/BeltColors';
import { studentAssessmentsService } from 'services/studentAssessmentsService';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock hooks
jest.mock('hooks/useGet', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock services
jest.mock('services/studentAssessmentsService', () => ({
  studentAssessmentsService: {
    createAssessment: jest.fn(),
    completeAssessment: jest.fn(),
    cancelAssessment: jest.fn(),
  },
}));

// Mock helper functions
jest.mock('utils/helpers/BeltColors', () => ({
  getBeltColor: jest.fn(() => '#FFFFFF'),
  getBeltTextColor: jest.fn(() => '#000000'),
}));

describe('StudentDetailClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    // Mock successful data fetching
    mockUseGet.mockReturnValue({
      data: null,
      isPending: false,
      isError: false,
      refetch: jest.fn(),
    });
  });

  it('should be defined', () => {
    expect(1).toBe(1);
  });
});

// Mock services
jest.mock('services/studentAssessmentsService');

// Mock helper functions
jest.mock('utils/helpers/BeltColors', () => ({
  getBeltColor: jest.fn(),
  getBeltTextColor: jest.fn(),
}));

// Mock child components
jest.mock('../../../../../app/loading', () => {
  return function MockLoading() {
    return <div data-testid='loading-component'>Loading...</div>;
  };
});

jest.mock('../../../../../app/(DashboardLayout)/components/container/PageContainer', () => {
  return function MockPageContainer({ children, title, description }: any) {
    return (
      <div data-testid='page-container' data-title={title} data-description={description}>
        {children}
      </div>
    );
  };
});

jest.mock(
  '../../../../../app/(DashboardLayout)/components/students/details/StudentInformation',
  () => {
    return function MockStudentInformation({ student, beltColor, beltTextColor }: any) {
      return (
        <div
          data-testid='student-information'
          data-belt-color={beltColor}
          data-belt-text-color={beltTextColor}
        >
          Student: {student?.firstName} {student?.lastName}
        </div>
      );
    };
  }
);

jest.mock(
  '../../../../../app/(DashboardLayout)/components/students/details/PersonalInformation',
  () => {
    return function MockPersonalInformation({ student }: any) {
      return <div data-testid='personal-information'>Personal Info for {student?.firstName}</div>;
    };
  }
);

jest.mock(
  '../../../../../app/(DashboardLayout)/components/students/details/TrainingInformation',
  () => {
    return function MockTrainingInformation({ student }: any) {
      return <div data-testid='training-information'>Training Info for {student?.firstName}</div>;
    };
  }
);

jest.mock(
  '../../../../../app/(DashboardLayout)/components/students/details/ParentGuardianInformation',
  () => {
    return function MockParentGuardianInformation({ student, family }: any) {
      return (
        <div data-testid='parent-guardian-information'>
          Parent Info for {student?.firstName} (Family: {family?.length})
        </div>
      );
    };
  }
);

jest.mock(
  '../../../../../app/(DashboardLayout)/components/students/details/StudentAssessmentForm',
  () => {
    return function MockStudentAssessmentForm({
      currentAssessment,
      handleCreateAssessment,
      handleCompleteAssessment,
      handleCancelAssessment,
    }: any) {
      return (
        <div data-testid='student-assessment-form'>
          <button onClick={handleCreateAssessment}>Create Assessment</button>
          <button onClick={() => handleCompleteAssessment(true, 90)}>Complete Assessment</button>
          <button onClick={handleCancelAssessment}>Cancel Assessment</button>
          {currentAssessment && <div>Current Assessment: {currentAssessment.assessment_id}</div>}
        </div>
      );
    };
  }
);

jest.mock('../../../../../app/(DashboardLayout)/components/students/EditStudentModule', () => {
  return function MockEditStudentModule({ open, onClose, onStudentUpdated }: any) {
    return open ? (
      <div data-testid='edit-student-module'>
        <button onClick={onClose}>Close</button>
        <button onClick={onStudentUpdated}>Save Changes</button>
      </div>
    ) : null;
  };
});

// Mock Tabler icons
jest.mock('@tabler/icons-react', () => ({
  IconArrowLeft: () => <div data-testid='icon-arrow-left'>←</div>,
  IconEdit: () => <div data-testid='icon-edit'>✎</div>,
}));

// Mock data
const mockBeltRequirements = [
  { id: 1, belt_rank: 'White', belt_color: '#FFFFFF' },
  { id: 2, belt_rank: 'Yellow', belt_color: '#FFFF00' },
];

const mockStudent = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  beltRank: 'White',
  child: false,
  email: 'john.doe@example.com',
  phone: '123-456-7890',
};

const mockChildStudent = {
  ...mockStudent,
  child: true,
  firstName: 'Jane',
};

const mockFamily = [{ id: 1, parent_name: 'John Sr.', relationship: 'Father' }];

const mockAssessment = {
  assessment_id: 1,
  student_id: 1,
  assessment_date: '2024-01-01',
  assessment_status: 'in_progress',
  target_belt_rank: 'Yellow',
};

const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUseGet = require('hooks/useGet').default;
const mockGetBeltColor = getBeltColor as jest.MockedFunction<typeof getBeltColor>;
const mockGetBeltTextColor = getBeltTextColor as jest.MockedFunction<typeof getBeltTextColor>;

describe('StudentDetailClient', () => {
  const mockPush = jest.fn();
  const mockRefetch = jest.fn();
  const mockRefetchAssessment = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    });

    mockGetBeltColor.mockReturnValue('#FFFFFF');
    mockGetBeltTextColor.mockReturnValue('#000000');

    // Default successful data fetching
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => {
      switch (apiLabel) {
        case 'belt-requirements':
          return {
            data: mockBeltRequirements,
            isPending: false,
            error: null,
            isError: false,
            refetch: jest.fn(),
          };
        case 'students':
          return {
            data: mockStudent,
            isPending: false,
            error: null,
            isError: false,
            refetch: mockRefetch,
          };
        case 'families':
          return {
            data: [],
            isPending: false,
            error: null,
          };
        case 'current-assessment':
          return {
            data: null,
            isPending: false,
            error: null,
            refetch: mockRefetchAssessment,
          };
        default:
          return {
            data: null,
            isPending: false,
            error: null,
            refetch: jest.fn(),
          };
      }
    });
  });

  it('renders loading state when data is being fetched', () => {
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => ({
      data: null,
      isPending: apiLabel === 'students',
      isLoading: apiLabel === 'students',
      isFetching: false,
      error: null,
      isError: false,
      refetch: jest.fn(),
    }));

    render(<StudentDetailClient studentId='1' />);

    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });

  it('renders error state when student not found', () => {
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => ({
      data: apiLabel === 'students' ? null : mockBeltRequirements,
      isLoading: false,
      isFetching: false,
      error: null, // No error object means "Student not found"
      isError: apiLabel === 'students',
      refetch: jest.fn(),
    }));

    render(<StudentDetailClient studentId='1' />);

    expect(screen.getByText('Student not found.')).toBeInTheDocument();
    expect(screen.getByText('Back to Students')).toBeInTheDocument();
  });

  it('renders error state when student data fails to load', () => {
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => ({
      data: apiLabel === 'students' ? null : mockBeltRequirements,
      isPending: false,
      error: apiLabel === 'students' ? new Error('Network error') : null,
      isError: apiLabel === 'students',
      refetch: jest.fn(),
    }));

    render(<StudentDetailClient studentId='1' />);

    expect(screen.getByText('Error loading student data.')).toBeInTheDocument();
  });

  it('renders student details successfully', () => {
    render(<StudentDetailClient studentId='1' />);

    expect(screen.getByTestId('student-information')).toBeInTheDocument();
    expect(screen.getByTestId('personal-information')).toBeInTheDocument();
    expect(screen.getByTestId('training-information')).toBeInTheDocument();
    expect(screen.getByTestId('student-assessment-form')).toBeInTheDocument();
    expect(screen.getByText('Student: John Doe')).toBeInTheDocument();
  });

  it('shows belt requirements error warning', () => {
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => {
      if (apiLabel === 'belt-requirements') {
        return {
          data: null,
          isLoading: false,
          error: new Error('Belt requirements error'),
          refetch: jest.fn(),
        };
      }
      return {
        data: apiLabel === 'students' ? mockStudent : null,
        isLoading: false,
        isFetching: false,
        error: null,
        isError: false,
        refetch: jest.fn(),
      };
    });

    render(<StudentDetailClient studentId='1' />);

    expect(
      screen.getByText('Unable to load belt requirements. Some features may not work correctly.')
    ).toBeInTheDocument();
  });

  it('handles back to students navigation', () => {
    render(<StudentDetailClient studentId='1' />);

    const backButton = screen.getAllByText('Back to Students')[0];
    fireEvent.click(backButton);

    expect(mockPush).toHaveBeenCalledWith('/students');
  });

  it('opens edit student dialog', () => {
    render(<StudentDetailClient studentId='1' />);

    const editButton = screen.getByText('Edit Student');
    fireEvent.click(editButton);

    expect(screen.getByTestId('edit-student-module')).toBeInTheDocument();
  });

  it('closes edit student dialog', () => {
    render(<StudentDetailClient studentId='1' />);

    // Open dialog
    const editButton = screen.getByText('Edit Student');
    fireEvent.click(editButton);

    // Close dialog
    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByTestId('edit-student-module')).not.toBeInTheDocument();
  });

  it('handles student update from edit dialog', async () => {
    render(<StudentDetailClient studentId='1' />);

    // Open dialog
    const editButton = screen.getByText('Edit Student');
    fireEvent.click(editButton);

    // Save changes
    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('displays parent guardian information for child students', () => {
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => {
      switch (apiLabel) {
        case 'students':
          return {
            data: mockChildStudent,
            isLoading: false,
            isFetching: false,
            error: null,
            isError: false,
            refetch: mockRefetch,
          };
        case 'families':
          return {
            data: mockFamily,
            isLoading: false,
            isFetching: false,
            error: null,
          };
        default:
          return {
            data: mockBeltRequirements,
            isLoading: false,
            error: null,
            refetch: jest.fn(),
          };
      }
    });

    render(<StudentDetailClient studentId='1' />);

    expect(screen.getByTestId('parent-guardian-information')).toBeInTheDocument();
    expect(screen.getByText('Parent Info for Jane (Family: 1)')).toBeInTheDocument();
  });

  it('does not display parent guardian information for adult students', () => {
    render(<StudentDetailClient studentId='1' />);

    expect(screen.queryByTestId('parent-guardian-information')).not.toBeInTheDocument();
  });

  it('handles assessment creation', async () => {
    const mockCreateAssessment = jest.fn().mockResolvedValue({});
    (studentAssessmentsService.createAssessment as jest.Mock) = mockCreateAssessment;

    render(<StudentDetailClient studentId='1' />);

    const createButton = screen.getByText('Create Assessment');
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(mockCreateAssessment).toHaveBeenCalledWith({
        student_id: 1,
        assessment_date: expect.any(String),
        assessment_status: 'in_progress',
        target_belt_rank: 'White',
      });
      expect(mockRefetchAssessment).toHaveBeenCalled();
    });
  });

  it('handles assessment completion', async () => {
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => {
      if (apiLabel === 'current-assessment') {
        return {
          data: mockAssessment,
          isLoading: false,
          error: null,
          refetch: mockRefetchAssessment,
        };
      }
      return {
        data: apiLabel === 'students' ? mockStudent : mockBeltRequirements,
        isLoading: false,
        isFetching: false,
        error: null,
        isError: false,
        refetch: jest.fn(),
      };
    });

    const mockCompleteAssessment = jest.fn().mockResolvedValue({});
    (studentAssessmentsService.completeAssessment as jest.Mock) = mockCompleteAssessment;

    render(<StudentDetailClient studentId='1' />);

    const completeButton = screen.getByText('Complete Assessment');
    fireEvent.click(completeButton);

    await waitFor(() => {
      expect(mockCompleteAssessment).toHaveBeenCalledWith(1, {
        passed: true,
        overall_score: 90,
      });
      expect(mockRefetchAssessment).toHaveBeenCalled();
    });
  });

  it('handles assessment cancellation with confirmation', async () => {
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => {
      if (apiLabel === 'current-assessment') {
        return {
          data: mockAssessment,
          isLoading: false,
          error: null,
          refetch: mockRefetchAssessment,
        };
      }
      return {
        data: apiLabel === 'students' ? mockStudent : mockBeltRequirements,
        isLoading: false,
        isFetching: false,
        error: null,
        isError: false,
        refetch: jest.fn(),
      };
    });

    const mockCancelAssessment = jest.fn().mockResolvedValue({});
    (studentAssessmentsService.cancelAssessment as jest.Mock) = mockCancelAssessment;

    // Mock window.confirm
    const originalConfirm = window.confirm;
    window.confirm = jest.fn().mockReturnValue(true);

    render(<StudentDetailClient studentId='1' />);

    const cancelButton = screen.getByText('Cancel Assessment');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalledWith(
        'Are you sure you want to cancel this assessment? This action cannot be undone.'
      );
      expect(mockCancelAssessment).toHaveBeenCalledWith(1, 'Cancelled by user');
      expect(mockRefetchAssessment).toHaveBeenCalled();
    });

    window.confirm = originalConfirm;
  });

  it('does not cancel assessment when user declines confirmation', async () => {
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => {
      if (apiLabel === 'current-assessment') {
        return {
          data: mockAssessment,
          isLoading: false,
          error: null,
          refetch: mockRefetchAssessment,
        };
      }
      return {
        data: apiLabel === 'students' ? mockStudent : mockBeltRequirements,
        isLoading: false,
        isFetching: false,
        error: null,
        isError: false,
        refetch: jest.fn(),
      };
    });

    const mockCancelAssessment = jest.fn();
    (studentAssessmentsService.cancelAssessment as jest.Mock) = mockCancelAssessment;

    // Mock window.confirm to return false
    const originalConfirm = window.confirm;
    window.confirm = jest.fn().mockReturnValue(false);

    render(<StudentDetailClient studentId='1' />);

    const cancelButton = screen.getByText('Cancel Assessment');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(window.confirm).toHaveBeenCalled();
      expect(mockCancelAssessment).not.toHaveBeenCalled();
    });

    window.confirm = originalConfirm;
  });

  it('handles assessment creation error gracefully', async () => {
    const mockCreateAssessment = jest.fn().mockRejectedValue(new Error('Creation failed'));
    (studentAssessmentsService.createAssessment as jest.Mock) = mockCreateAssessment;

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<StudentDetailClient studentId='1' />);

    const createButton = screen.getByText('Create Assessment');
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error creating assessment:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });

  it('applies belt color and text color correctly', () => {
    mockGetBeltColor.mockReturnValue('#FF0000');
    mockGetBeltTextColor.mockReturnValue('#FFFFFF');

    render(<StudentDetailClient studentId='1' />);

    const studentInfo = screen.getByTestId('student-information');
    expect(studentInfo).toHaveAttribute('data-belt-color', '#FF0000');
    expect(studentInfo).toHaveAttribute('data-belt-text-color', '#FFFFFF');

    expect(mockGetBeltColor).toHaveBeenCalledWith('White');
    expect(mockGetBeltTextColor).toHaveBeenCalledWith('White');
  });

  it('shows loading when family data is being fetched for child student', () => {
    mockUseGet.mockImplementation(({ apiLabel }: { apiLabel: string }) => {
      if (apiLabel === 'students') {
        return {
          data: mockChildStudent,
          isLoading: false,
          isFetching: false,
          error: null,
          isError: false,
          refetch: mockRefetch,
        };
      }
      if (apiLabel === 'families') {
        return {
          data: null,
          isLoading: true,
          isFetching: false,
          error: null,
        };
      }
      return {
        data: mockBeltRequirements,
        isLoading: false,
        error: null,
        refetch: jest.fn(),
      };
    });

    render(<StudentDetailClient studentId='1' />);

    expect(screen.getByTestId('loading-component')).toBeInTheDocument();
  });
});
