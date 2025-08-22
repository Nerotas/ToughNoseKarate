import { render, screen } from '@testing-library/react';
import StudentInformation from '../../../../../../app/(DashboardLayout)/components/students/details/StudentInformation';
import { Student } from '../../../../../../models/Students/Students';

// Mock the DashboardCard component
jest.mock('../../../../../../app/(DashboardLayout)/components/shared/DashboardCard', () => {
  return function MockDashboardCard({ title, children }: any) {
    return (
      <div data-testid='dashboard-card'>
        <h2>{title}</h2>
        {children}
      </div>
    );
  };
});

const mockStudent: Student = {
  studentid: 123,
  firstName: 'Jane',
  lastName: 'Smith',
  preferredName: 'Janie',
  age: 28,
  beltRank: 'Yellow Belt',
  email: 'jane.smith@example.com',
  phone: '987-654-3210',
  active: true,
  child: false,
  eligibleForTesting: true,
  startDateUTC: '2022-01-01T00:00:00Z',
};

describe('StudentInformation Component', () => {
  const defaultProps = {
    student: mockStudent,
    beltColor: '#FFFF00',
    beltTextColor: '#000000',
  };

  it('renders student information correctly', () => {
    render(<StudentInformation {...defaultProps} />);

    expect(screen.getByTestId('dashboard-card')).toBeInTheDocument();
    expect(screen.getByText('Student Information')).toBeInTheDocument();
  });

  it('displays student name using preferred name when available', () => {
    render(<StudentInformation {...defaultProps} />);

    expect(screen.getByText('Janie Smith')).toBeInTheDocument();
  });

  it('displays student name using first name when preferred name is not available', () => {
    const studentWithoutPreferredName = { ...mockStudent, preferredName: undefined };
    const props = { ...defaultProps, student: studentWithoutPreferredName };

    render(<StudentInformation {...props} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('displays student ID', () => {
    render(<StudentInformation {...defaultProps} />);

    expect(screen.getByText('Student ID: 123')).toBeInTheDocument();
  });

  it('displays current belt correctly', () => {
    render(<StudentInformation {...defaultProps} />);

    expect(screen.getByText('Yellow Belt Belt')).toBeInTheDocument();
  });

  it('displays status as Active when student is active', () => {
    render(<StudentInformation {...defaultProps} />);

    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('displays status as Inactive when student is not active', () => {
    const inactiveStudent = { ...mockStudent, active: false };
    const props = { ...defaultProps, student: inactiveStudent };

    render(<StudentInformation {...props} />);

    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('displays Ready for Testing when student is eligible', () => {
    render(<StudentInformation {...defaultProps} />);

    expect(screen.getByText('Ready for Testing')).toBeInTheDocument();
  });

  it('displays Not Ready when student is not eligible for testing', () => {
    const notEligibleStudent = { ...mockStudent, eligibleForTesting: false };
    const props = { ...defaultProps, student: notEligibleStudent };

    render(<StudentInformation {...props} />);

    expect(screen.getByText('Not Ready')).toBeInTheDocument();
  });

  it('renders user icon', () => {
    const { container } = render(<StudentInformation {...defaultProps} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('applies belt color styling to belt chip', () => {
    const { container } = render(<StudentInformation {...defaultProps} />);

    const chip = container.querySelector('.MuiChip-root');
    expect(chip).toBeInTheDocument();
  });

  it('handles null/undefined preferred name gracefully', () => {
    const studentWithNullPreferredName = { ...mockStudent, preferredName: null };
    const props = { ...defaultProps, student: studentWithNullPreferredName };

    render(<StudentInformation {...props} />);

    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
