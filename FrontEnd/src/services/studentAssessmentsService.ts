import axiosInstance from 'utils/helpers/AxiosInstance';
import {
  AssessmentSummary,
  CreateStudentAssessmentRequest,
  StudentAssessment,
  UpdateStudentAssessmentRequest,
} from '../models/Assessments/Assessments';

class StudentAssessmentsService {
  // Get all assessments for a student
  async getAssessmentsByStudent(studentId: number): Promise<StudentAssessment[]> {
    const response = await axiosInstance.get(`/student-assessments/student/${studentId}`);
    return response.data;
  }

  // Get assessment summary for a student
  async getAssessmentSummary(studentId: number): Promise<AssessmentSummary> {
    const response = await axiosInstance.get(`/student-assessments/student/${studentId}/summary`);
    return response.data;
  }

  // Get current assessment for a student
  async getCurrentAssessment(studentId: number): Promise<StudentAssessment | null> {
    try {
      const response = await axiosInstance.get(`/student-assessments/student/${studentId}/current`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // Get a specific assessment by ID
  async getAssessment(assessmentId: number): Promise<StudentAssessment> {
    const response = await axiosInstance.get(`/student-assessments/${assessmentId}`);
    return response.data;
  }

  // Create a new assessment
  async createAssessment(data: CreateStudentAssessmentRequest): Promise<StudentAssessment> {
    const response = await axiosInstance.post('/student-assessments', data);
    return response.data;
  }

  // Update an existing assessment
  async updateAssessment(
    assessmentId: number,
    data: UpdateStudentAssessmentRequest
  ): Promise<StudentAssessment> {
    const response = await axiosInstance.patch(`/student-assessments/${assessmentId}`, data);
    return response.data;
  }

  // Complete an assessment
  async completeAssessment(
    assessmentId: number,
    data: {
      overall_score?: number;
      passed?: boolean;
      examiner_notes?: string;
    }
  ): Promise<StudentAssessment> {
    const response = await axiosInstance.patch(
      `/student-assessments/${assessmentId}/complete`,
      data
    );
    return response.data;
  }

  // Cancel an assessment
  async cancelAssessment(assessmentId: number, reason?: string): Promise<StudentAssessment> {
    const response = await axiosInstance.patch(`/student-assessments/${assessmentId}/cancel`, {
      reason,
    });
    return response.data;
  }

  // Delete an assessment
  async deleteAssessment(assessmentId: number): Promise<void> {
    await axiosInstance.delete(`/student-assessments/${assessmentId}`);
  }

  // Get all assessments by status
  async getAssessmentsByStatus(
    status: 'in_progress' | 'completed' | 'cancelled'
  ): Promise<StudentAssessment[]> {
    const response = await axiosInstance.get(`/student-assessments?status=${status}`);
    return response.data;
  }

  // Get all assessments by belt rank
  async getAssessmentsByBeltRank(beltRank: string): Promise<StudentAssessment[]> {
    const response = await axiosInstance.get(`/student-assessments/belt-rank/${beltRank}`);
    return response.data;
  }
}

export const studentAssessmentsService = new StudentAssessmentsService();
