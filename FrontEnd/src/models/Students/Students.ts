export class Student {
  studentid: number = 0;
  firstName: string = '';
  lastName: string = '';
  preferredName: string = '';
  age: number = 0;
  beltRank: string = '';
  startDateUTC: string = '';
  endDateUTC?: string;
  email: string = '';
  phone?: string;
  notes?: string;
  active: number = 1;
  child: number = 0;
  lastTestUTC?: string;
  eligibleForTesting: number = 0;

  constructor(init?: Partial<Student>) {
    Object.assign(this, init);
  }
}

export class StudentDisplay extends Student {
  id: number = 0;
  name: string = '';
  currentBelt: string = '';
  beltColor: string = '';
  joinDate: string = '';
  lastTest: string | null = null;
  isChild: boolean = false;
  isActive: boolean = true;

  constructor(init?: Partial<StudentDisplay>) {
    super(init);
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
