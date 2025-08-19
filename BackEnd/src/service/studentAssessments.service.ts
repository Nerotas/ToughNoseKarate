import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StudentAssessments } from '../models/student_assessments';
import { students } from '../models/students';

export type CreateStudentAssessmentDto = Partial<
  Omit<
    StudentAssessments,
    'assessment_id' | 'created_at' | 'updated_at' | 'student'
  >
>;

export type UpdateStudentAssessmentDto = Partial<
  Omit<
    StudentAssessments,
    'assessment_id' | 'created_at' | 'updated_at' | 'student'
  >
>;

export interface AssessmentSummary {
  totalAssessments: number;
  completedAssessments: number;
  inProgressAssessments: number;
  averageScore: number;
  passRate: number;
  assessments: StudentAssessments[];
}

@Injectable()
export class StudentAssessmentsService {
  constructor(
    @InjectModel(StudentAssessments)
    private studentAssessmentsModel: typeof StudentAssessments,
  ) {}

  async findAll(): Promise<StudentAssessments[]> {
    return this.studentAssessmentsModel.findAll({
      include: [
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
        },
      ],
      order: [['assessment_date', 'DESC']],
    });
  }

  async findByStudentId(studentId: number): Promise<StudentAssessments[]> {
    return this.studentAssessmentsModel.findAll({
      where: { student_id: studentId },
      include: [
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
        },
      ],
      order: [['assessment_date', 'DESC']],
    });
  }

  async getAssessmentSummary(studentId: number): Promise<AssessmentSummary> {
    const assessments = await this.findByStudentId(studentId);
    const totalAssessments = assessments.length;
    const completedAssessments = assessments.filter(
      (a) => a.assessment_status === 'completed',
    ).length;
    const inProgressAssessments = assessments.filter(
      (a) => a.assessment_status === 'in_progress',
    ).length;

    const completedWithScores = assessments.filter(
      (a) => a.assessment_status === 'completed' && a.overall_score !== null,
    );

    const averageScore =
      completedWithScores.length > 0
        ? completedWithScores.reduce(
            (sum, a) => sum + (a.overall_score || 0),
            0,
          ) / completedWithScores.length
        : 0;

    const passedAssessments = assessments.filter(
      (a) => a.passed === true,
    ).length;
    const passRate =
      completedAssessments > 0
        ? (passedAssessments / completedAssessments) * 100
        : 0;

    return {
      totalAssessments,
      completedAssessments,
      inProgressAssessments,
      averageScore: Number(averageScore.toFixed(2)),
      passRate: Number(passRate.toFixed(2)),
      assessments,
    };
  }

  async findOne(id: number): Promise<StudentAssessments | null> {
    return this.studentAssessmentsModel.findByPk(id, {
      include: [
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
        },
      ],
    });
  }

  async getCurrentAssessment(
    studentId: number,
  ): Promise<StudentAssessments | null> {
    const result = await this.studentAssessmentsModel.findOne({
      where: {
        student_id: studentId,
        assessment_status: 'in_progress',
      },
      include: [
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
        },
      ],
      order: [['assessment_date', 'DESC']],
    });
    return result;
  }

  async create(
    createStudentAssessmentDto: CreateStudentAssessmentDto,
  ): Promise<StudentAssessments> {
    // Set default assessment_date if not provided
    if (!createStudentAssessmentDto.assessment_date) {
      createStudentAssessmentDto.assessment_date = new Date();
    }

    return this.studentAssessmentsModel.create(createStudentAssessmentDto);
  }

  async update(
    id: number,
    updateStudentAssessmentDto: UpdateStudentAssessmentDto,
  ): Promise<StudentAssessments | null> {
    const [affectedCount] = await this.studentAssessmentsModel.update(
      updateStudentAssessmentDto,
      { where: { assessment_id: id } },
    );

    if (affectedCount === 0) {
      return null;
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const deletedCount = await this.studentAssessmentsModel.destroy({
      where: { assessment_id: id },
    });
    return deletedCount > 0;
  }

  async completeAssessment(
    id: number,
    finalData: {
      overall_score?: number;
      passed?: boolean;
      examiner_notes?: string;
    },
  ): Promise<StudentAssessments | null> {
    const updateData: UpdateStudentAssessmentDto = {
      ...finalData,
      assessment_status: 'completed',
    };

    return this.update(id, updateData);
  }

  async cancelAssessment(
    id: number,
    reason?: string,
  ): Promise<StudentAssessments | null> {
    const updateData: UpdateStudentAssessmentDto = {
      assessment_status: 'cancelled',
      examiner_notes: reason ? `Cancelled: ${reason}` : 'Assessment cancelled',
    };

    return this.update(id, updateData);
  }

  async getAssessmentsByStatus(
    status: 'in_progress' | 'completed' | 'cancelled',
  ): Promise<StudentAssessments[]> {
    return this.studentAssessmentsModel.findAll({
      where: { assessment_status: status },
      include: [
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
        },
      ],
      order: [['assessment_date', 'DESC']],
    });
  }

  async getAssessmentsByBeltRank(
    targetBeltRank: string,
  ): Promise<StudentAssessments[]> {
    return this.studentAssessmentsModel.findAll({
      where: { target_belt_rank: targetBeltRank },
      include: [
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
        },
      ],
      order: [['assessment_date', 'DESC']],
    });
  }
}
