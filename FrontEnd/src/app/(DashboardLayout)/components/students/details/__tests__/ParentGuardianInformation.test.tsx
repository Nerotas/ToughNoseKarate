import React from 'react';
import { render, screen } from '@testing-library/react';
import ParentGuardianInformation from '../ParentGuardianInformation';
import { Student, Family } from '../../../../../../models/Students/Students';

// Mock the loading component
jest.mock('../../../../../../app/loading', () => {
  return function MockLoading() {
    return <div data-testid='loading'>Loading...</div>;
  };
});

describe('ParentGuardianInformation', () => {
  const mockStudent: Student = {
    studentid: 1,
    firstName: 'John',
    lastName: 'Doe',
    child: true,
    dateOfBirth: '2010-01-01',
    beltRank: 'White',
    startDateUTC: '2020-01-01',
    endDateUTC: null,
    email: 'john@test.com',
    phone: '555-1234',
    emergencyContactName: 'Jane Doe',
    emergencyContactPhone: '555-5678',
    active: true,
  };

  const mockFamily: Family[] = [
    {
      parentid: 1,
      parentFirstName: 'Jane',
      parentLastName: 'Doe',
      studentid: 1,
      firstName: 'John',
      lastName: 'Doe',
      startDate: '2020-01-01',
      email: 'john@test.com',
    },
    {
      parentid: 2,
      parentFirstName: 'Bob',
      parentLastName: 'Smith',
      studentid: 1,
      firstName: 'John',
      lastName: 'Doe',
      startDate: '2020-01-01',
      email: 'john@test.com',
    },
  ];

  const defaultProps = {
    student: mockStudent,
    studentId: '1',
    family: mockFamily,
    familyLoading: false,
    familyFetching: false,
    familyError: null,
  };

  it('should render the component header', () => {
    render(<ParentGuardianInformation {...defaultProps} />);

    expect(screen.getByText('Parent/Guardian Information')).toBeInTheDocument();
  });

  it('should display parent information when available', () => {
    render(<ParentGuardianInformation {...defaultProps} />);

    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Bob Smith')).toBeInTheDocument();
  });

  it('should show loading state when familyLoading is true', () => {
    render(<ParentGuardianInformation {...defaultProps} familyLoading={true} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should show loading state when familyFetching is true', () => {
    render(<ParentGuardianInformation {...defaultProps} familyFetching={true} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should display error message when familyError is present', () => {
    const error = { message: 'Network error' };
    render(<ParentGuardianInformation {...defaultProps} familyError={error} />);

    expect(screen.getByText(/Unable to load parent\/guardian information/)).toBeInTheDocument();
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
  });

  it('should show no parent information message when no family data and student is child', () => {
    render(
      <ParentGuardianInformation
        {...defaultProps}
        family={[]}
        student={{ ...mockStudent, child: true }}
      />
    );

    expect(
      screen.getByText('No parent/guardian information found for this student.')
    ).toBeInTheDocument();
  });

  it('should show contact information note', () => {
    render(<ParentGuardianInformation {...defaultProps} />);

    expect(
      screen.getAllByText('Contact information is managed separately from parent records.')
    ).toHaveLength(2); // Should appear twice for both parents
  });
});
