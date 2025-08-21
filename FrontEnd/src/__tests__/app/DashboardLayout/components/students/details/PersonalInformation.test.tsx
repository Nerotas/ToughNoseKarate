import { render, screen } from '@testing-library/react';
import PersonalInformation from '../../../../../../app/(DashboardLayout)/components/students/details/PersonalInformation';
import { Student } from '../../../../../../models/Students/Students';

const mockStudent: Student = {
  studentid: 1,
  firstName: 'John',
  lastName: 'Doe',
  preferredName: 'Johnny',
  age: 25,
  beltRank: 'White Belt',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  notes: 'Great student',
  active: true,
  child: false,
  eligibleForTesting: true,
  lastTestUTC: '2023-01-01T00:00:00Z',
  startDateUTC: '2022-01-01T00:00:00Z',
};

describe('PersonalInformation Component', () => {
  it('renders personal information correctly', () => {
    render(<PersonalInformation student={mockStudent} />);

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Full Name')).toBeInTheDocument();
  });

  it('displays preferred name when provided', () => {
    render(<PersonalInformation student={mockStudent} />);

    expect(screen.getByText('Preferred Name')).toBeInTheDocument();
    expect(screen.getByText('Johnny')).toBeInTheDocument();
  });

  it('does not display preferred name when not provided', () => {
    const studentWithoutPreferredName = { ...mockStudent, preferredName: undefined };
    render(<PersonalInformation student={studentWithoutPreferredName} />);

    expect(screen.queryByText('Preferred Name')).not.toBeInTheDocument();
  });

  it('displays age information', () => {
    render(<PersonalInformation student={mockStudent} />);

    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('displays email information', () => {
    render(<PersonalInformation student={mockStudent} />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
  });

  it('displays phone information', () => {
    render(<PersonalInformation student={mockStudent} />);

    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('123-456-7890')).toBeInTheDocument();
  });

  it('renders with proper card structure', () => {
    const { container } = render(<PersonalInformation student={mockStudent} />);

    const card = container.querySelector('.MuiCard-root');
    expect(card).toBeInTheDocument();
  });

  it('displays user icon', () => {
    const { container } = render(<PersonalInformation student={mockStudent} />);

    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });
});
