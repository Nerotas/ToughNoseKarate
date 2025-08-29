import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BeltRequirementDeleteModule from '../../../../../app/(DashboardLayout)/components/belt-requirements/beltRequirementDeleteModule';
import { BeltRequirements } from '../../../../../models/BeltRequirements/BeltRequirements';
import axiosInstance from 'utils/helpers/AxiosInstance';

// Mock axios
jest.mock('utils/helpers/AxiosInstance');
const mockAxiosInstance = axiosInstance as jest.Mocked<typeof axiosInstance>;

const mockBeltRequirement: BeltRequirements = {
  beltOrder: 1,
  beltRank: 'White Belt',
  color: '#FFFFFF',
  textColor: '#000000',
  forms: ['Basic Form 1'],
  stances: [],
  blocks: ['High Block'],
  punches: ['Straight Punch'],
  kicks: ['Front Kick'],
  jumps: [],
  falling: [],
  oneSteps: [],
  selfDefense: [],
  comments: 'Basic requirements',
};

describe('BeltRequirementDeleteModule Component', () => {
  const mockHandleClose = jest.fn();
  const mockRefetchBeltRequirements = jest.fn();

  const defaultProps = {
    open: true,
    handleClose: mockHandleClose,
    beltRequirement: mockBeltRequirement,
    refetchBeltRequirements: mockRefetchBeltRequirements,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Suppress unhandled promise rejection warnings for these tests
  const originalConsoleError = console.error;
  const originalProcessOn = process.on;

  beforeAll(() => {
    console.error = jest.fn();
    // Suppress unhandled promise rejection warnings
    process.on = jest.fn((event, handler) => {
      if (event === 'unhandledRejection') {
        return process;
      }
      return originalProcessOn.call(process, event, handler);
    }) as any;
  });

  afterAll(() => {
    console.error = originalConsoleError;
    process.on = originalProcessOn;
  });

  it('renders the delete dialog when open', () => {
    render(<BeltRequirementDeleteModule {...defaultProps} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/delete belt requirement/i)).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<BeltRequirementDeleteModule {...defaultProps} open={false} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays the dialog with correct content', () => {
    render(<BeltRequirementDeleteModule {...defaultProps} />);

    expect(screen.getByText('Delete Belt Requirement')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to delete this belt requirement?')
    ).toBeInTheDocument();
  });

  it('calls handleClose when Cancel button is clicked', () => {
    render(<BeltRequirementDeleteModule {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('calls delete API and refetch when Delete button is clicked', async () => {
    mockAxiosInstance.delete.mockResolvedValueOnce({ data: {} });
    mockRefetchBeltRequirements.mockResolvedValueOnce(undefined);

    render(<BeltRequirementDeleteModule {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/belt-requirements/White Belt');
    });

    await waitFor(() => {
      expect(mockRefetchBeltRequirements).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });
  });

  it('calls handleClose even if delete API fails', async () => {
    // Mock console.error to prevent error output in test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockAxiosInstance.delete.mockRejectedValueOnce(new Error('Delete failed'));

    render(<BeltRequirementDeleteModule {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Wait for the delete call
    await waitFor(() => {
      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/belt-requirements/White Belt');
    });

    // Wait for handleClose to be called (should happen in finally block)
    await waitFor(
      () => {
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 }
    );

    consoleErrorSpy.mockRestore();
  });

  it('calls handleClose even if refetch fails', async () => {
    // Mock console.error to prevent error output in test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockAxiosInstance.delete.mockResolvedValueOnce({ data: {} });
    mockRefetchBeltRequirements.mockRejectedValueOnce(new Error('Refetch failed'));

    render(<BeltRequirementDeleteModule {...defaultProps} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    // Wait for the refetch call
    await waitFor(() => {
      expect(mockRefetchBeltRequirements).toHaveBeenCalledTimes(1);
    });

    // Wait for handleClose to be called (should happen in finally block)
    await waitFor(
      () => {
        expect(mockHandleClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 3000 }
    );

    consoleErrorSpy.mockRestore();
  });

  it('has proper dialog structure with title, content, and actions', () => {
    render(<BeltRequirementDeleteModule {...defaultProps} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/delete belt requirement/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });
});
