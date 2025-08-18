export class Student {
  studentid: number = 0;
  firstName: string = '';
  lastName: string = '';
  preferredName?: string | null;
  age?: number | null;
  dateOfBirth?: string | null; // maps date_of_birth
  beltRank: string = 'White'; // default white
  startDateUTC: string = '';
  endDateUTC?: string | null;
  email: string = '';
  phone?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  emergencyContactRelationship?: string | null;
  medicalConditions?: string | null;
  allergies?: string | null;
  medications?: string | null;
  waiverSigned?: boolean | null;
  waiverDate?: string | null; // date
  insuranceProvider?: string | null;
  insurancePolicyNumber?: string | null;
  notes?: string | null;
  active?: boolean = true; // DB default true
  child?: boolean = false; // DB default false
  lastTestUTC?: string | null;
  eligibleForTesting?: boolean = false; // DB default false

  constructor(init?: Partial<Student>) {
    Object.assign(this, init);
  }
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

export interface StudentFormData extends Partial<Student> {}
