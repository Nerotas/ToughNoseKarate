import { render, screen } from '@testing-library/react';
import TrainingInformation from '../../../../../../app/(DashboardLayout)/components/students/details/TrainingInformation';
import { Student } from '../../../../../../models/Students/Students';

const mockStudent: Student = {
  studentid: 456,
  firstName: 'Bob',
  lastName: 'Johnson',
  beltRank: 'Blue Belt',
  startDateUTC: '2022-03-15T10:30:00Z',
  endDateUTC: '2023-12-31T23:59:59Z',
  lastTestUTC: '2023-06-15T14:00:00Z',
  active: true,
  child: false,
  eligibleForTesting: false,
  email: 'bob.johnson@example.com',
};

describe('TrainingInformation Component', () => {
  it('renders training information correctly', () => {
    render(<TrainingInformation student={mockStudent} />);

    expect(screen.getByText('Training Information')).toBeInTheDocument();
  });

  it('displays start date', () => {
    render(<TrainingInformation student={mockStudent} />);

    expect(screen.getByText('Start Date')).toBeInTheDocument();
    expect(screen.getByText('3/15/2022')).toBeInTheDocument();
  });

  it('displays end date when provided', () => {
    render(<TrainingInformation student={mockStudent} />);

    expect(screen.getByText('End Date')).toBeInTheDocument();
    expect(screen.getByText('12/31/2023')).toBeInTheDocument();
  });

  it('does not display end date when not provided', () => {
    const studentWithoutEndDate = { ...mockStudent, endDateUTC: undefined };
    render(<TrainingInformation student={studentWithoutEndDate} />);

    expect(screen.queryByText('End Date')).not.toBeInTheDocument();
  });

  it('displays last test date when provided', () => {
    render(<TrainingInformation student={mockStudent} />);

    expect(screen.getByText('Last Test Date')).toBeInTheDocument();
    expect(screen.getByText('6/15/2023')).toBeInTheDocument();
  });

  it('displays "No test recorded" when last test date is not provided', () => {
    const studentWithoutLastTest = { ...mockStudent, lastTestUTC: undefined };
    render(<TrainingInformation student={studentWithoutLastTest} />);

    expect(screen.getByText('Last Test Date')).toBeInTheDocument();
    expect(screen.getByText('No test recorded')).toBeInTheDocument();
  });

  it('displays current belt rank', () => {
    render(<TrainingInformation student={mockStudent} />);

    expect(screen.getByText('Current Belt Rank')).toBeInTheDocument();
    expect(screen.getByText('Blue Belt')).toBeInTheDocument();
  });

  it('renders with proper card structure', () => {
    const { container } = render(<TrainingInformation student={mockStudent} />);

    const card = container.querySelector('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });

  it('displays award icon', () => {
    const { container } = render(<TrainingInformation student={mockStudent} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('handles null last test date', () => {
    const studentWithNullLastTest = { ...mockStudent, lastTestUTC: null };
    render(<TrainingInformation student={studentWithNullLastTest} />);

    expect(screen.getByText('No test recorded')).toBeInTheDocument();
  });

  it('handles null end date', () => {
    const studentWithNullEndDate = { ...mockStudent, endDateUTC: null };
    render(<TrainingInformation student={studentWithNullEndDate} />);

    expect(screen.queryByText('End Date')).not.toBeInTheDocument();
  });
});
