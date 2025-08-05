import axiosInstance from 'utils/helpers/AxiosInstance';

// Student interface for API data
export interface Student {
  studentid: number;
  firstName: string;
  lastName: string;
  preferedName?: string;
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
  preferedName?: string;
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
  preferedName?: string;
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

class StudentsService {
  // Get all students
  async getAllStudents(): Promise<Student[]> {
    const response = await axiosInstance.get('/v1/students');
    return response.data;
  }

  // Get a single student by ID
  async getStudentById(studentId: number): Promise<Student> {
    const response = await axiosInstance.get(`/v1/students/${studentId}`);
    return response.data;
  }

  // Create a new student
  async createStudent(studentData: CreateStudentRequest): Promise<Student> {
    const response = await axiosInstance.post('/v1/students', studentData);
    return response.data;
  }

  // Update an existing student
  async updateStudent(studentId: number, studentData: UpdateStudentRequest): Promise<Student> {
    const response = await axiosInstance.patch(`/v1/students/${studentId}`, studentData);
    // Backend returns [affectedRows, updatedInstances], we want the updated instance
    return response.data[1]?.[0] || response.data;
  }

  // Delete a student
  async deleteStudent(studentId: number): Promise<void> {
    await axiosInstance.delete(`/v1/students/${studentId}`);
  }

  // Toggle student active status
  async toggleActiveStatus(studentId: number, active: boolean): Promise<Student> {
    return this.updateStudent(studentId, { active: active ? 1 : 0 });
  }

  // Update student belt rank
  async updateBeltRank(studentId: number, beltRank: string): Promise<Student> {
    return this.updateStudent(studentId, {
      beltRank,
      lastTestUTC: new Date().toISOString(),
    });
  }

  // Update testing eligibility
  async updateTestingEligibility(studentId: number, eligible: boolean): Promise<Student> {
    return this.updateStudent(studentId, { eligibleForTesting: eligible ? 1 : 0 });
  }
}

export const studentsService = new StudentsService();
export default studentsService;
