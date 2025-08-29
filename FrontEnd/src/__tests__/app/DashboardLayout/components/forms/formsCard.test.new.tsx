import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormsCard from '../../../../../app/(DashboardLayout)/components/forms/formsCard';
import { FormDefinitions } from 'models/Forms/FormDefinitions';

// Mock the hooks and modules
jest.mock('../../../../../hooks/useAuth');
jest.mock('../../../../../app/(DashboardLayout)/components/forms/formEditModule', () => {
  return function MockFormEditModule() {
    return <div data-testid='form-edit-module'>Form Edit Module</div>;
  };
});
jest.mock('../../../../../app/(DashboardLayout)/components/forms/formDeleteModule', () => {
  return function MockFormDeleteModule() {
    return <div data-testid='form-delete-module'>Form Delete Module</div>;
  };
});

const mockUseAuth = require('../../../../../hooks/useAuth').useAuth as jest.MockedFunction<any>;

describe('FormsCard Component', () => {
  const mockForm: FormDefinitions = {
    id: 1,
    formName: 'Basic Form 1',
    koreanName: 'Taegeuk Il Jang',
    meaning: 'Heaven and Earth',
    description: 'Fundamental techniques',
    beltRank: 'White Belt',
    difficultyLevel: 1,
    keyPoints: ['Proper stance', 'Hand placement', 'Breathing'],
    videoLink: 'https://example.com/video',
  };

  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form information correctly', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    expect(screen.getByText('Basic Form 1')).toBeInTheDocument();
    expect(screen.getByText('Fundamental techniques')).toBeInTheDocument();
    expect(screen.getByText('White Belt')).toBeInTheDocument();
  });

  it('shows edit and delete buttons for authenticated instructors', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('shows edit and delete buttons for authenticated admins', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'admin' },
    });

    render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('does not show edit and delete buttons for unauthenticated users', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('does not show edit and delete buttons for authenticated students', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'student' },
    });

    render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('opens edit modal when Edit button is clicked', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(screen.getByTestId('form-edit-module')).toBeInTheDocument();
  });

  it('opens delete modal when Delete button is clicked', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: true,
      instructor: { role: 'instructor' },
    });

    render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.getByTestId('form-delete-module')).toBeInTheDocument();
  });

  it('renders accordions for form details', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    // Check for accordion sections
    expect(screen.getByText('Key Points')).toBeInTheDocument();
  });

  it('renders proper card structure', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    const { container } = render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    // Check for card structure
    expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    expect(container.querySelector('.MuiCardContent-root')).toBeInTheDocument();
  });

  it('displays video link when available', () => {
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    render(<FormsCard form={mockForm} refetchForms={mockRefetch} />);

    const videoButton = screen.getByText('Watch Video');
    expect(videoButton).toBeInTheDocument();
    expect(videoButton.closest('a')).toHaveAttribute('href', 'https://example.com/video');
  });

  it('disables video button when no video link is available', () => {
    const formWithoutVideo: FormDefinitions = {
      ...mockForm,
      videoLink: undefined,
    };

    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    render(<FormsCard form={formWithoutVideo} refetchForms={mockRefetch} />);

    const videoButton = screen.getByText('Watch Video');
    expect(videoButton).toBeDisabled();
  });

  it('handles form with empty key points gracefully', () => {
    const formWithEmptyKeyPoints: FormDefinitions = {
      ...mockForm,
      keyPoints: [],
    };

    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      instructor: null,
    });

    render(<FormsCard form={formWithEmptyKeyPoints} refetchForms={mockRefetch} />);

    expect(screen.getByText('Key Points')).toBeInTheDocument();
  });
});
