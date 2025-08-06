export interface Student {
  studentid: number;
  firstName: string;
  lastName: string;
  preferredName?: string;
  age?: number;
  beltRank: string;
  startDateUTC: string;
  endDateUTC?: string;
  email: string;
  phone?: string;
  notes?: string;
  active: number;
  child: number;
  lastTestUTC?: string;
  eligibleForTesting: number;
}

// DTO for creating a new student
export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  preferredName?: string;
  age?: number;
  beltRank?: string;
  startDateUTC: string;
  endDateUTC?: string;
  email: string;
  phone?: string;
  notes?: string;
  active?: number;
  child?: number;
  lastTestUTC?: string;
  eligibleForTesting?: number;
}

// DTO for updating a student
export interface UpdateStudentRequest {
  firstName?: string;
  lastName?: string;
  preferredName?: string;
  age?: number;
  beltRank?: string;
  startDateUTC?: string;
  endDateUTC?: string;
  email?: string;
  phone?: string;
  notes?: string;
  active?: number;
  child?: number;
  lastTestUTC?: string;
  eligibleForTesting?: number;
}

// Family/Parent interface for API data (based on the updated families VIEW)
export interface Family {
  parentid?: number;
  studentid?: number;
  firstName: string; // Student first name
  lastName: string; // Student last name
  preferredName?: string; // Student preferred name
  parentFirstName?: string;
  parentLastName?: string;
  age?: number; // Student age
  beltRank?: string; // Student belt rank (updated field name)
  startDate: string; // Updated field name
  endDate?: string; // Updated field name
  lastTest?: string; // Updated field name
  email: string; // Student email
  phone?: string; // Student phone
  notes?: string; // Student notes
  active?: number; // Student active status
  eligibleForTesting?: number; // Student eligibility for testing
}

export interface StudentDetailClientProps {
  studentId: string;
}
