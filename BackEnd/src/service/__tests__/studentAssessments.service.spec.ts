import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { StudentAssessmentsService } from '../studentAssessments.service';
import { StudentAssessments } from '../../models/student_assessments';
import { students } from '../../models/students';

describe('StudentAssessmentsService', () => {
  let service: StudentAssessmentsService;
  let mockStudentAssessmentsModel: any;

  const mockStudent = {
    firstName: 'John',
    lastName: 'Doe',
    preferredName: 'Johnny',
    beltRank: '8th Gup',
  };

  const mockStudentAssessment = {
    assessment_id: 1,
    student_id: 1,
    assessment_date: new Date('2023-01-15'),
    target_belt_rank: '7th Gup',
    assessment_status: 'completed',
    overall_score: 85.5,
    passed: true,
    examiner_notes: 'Excellent performance',
    created_at: new Date(),
    updated_at: new Date(),
    student: mockStudent,
  };

  const mockStudentAssessmentArray = [
    mockStudentAssessment,
    {
      assessment_id: 2,
      student_id: 1,
      assessment_date: new Date('2023-02-15'),
      target_belt_rank: '6th Gup',
      assessment_status: 'in_progress',
      overall_score: null,
      passed: null,
      examiner_notes: null,
      created_at: new Date(),
      updated_at: new Date(),
      student: mockStudent,
    },
    {
      assessment_id: 3,
      student_id: 2,
      assessment_date: new Date('2023-01-20'),
      target_belt_rank: '8th Gup',
      assessment_status: 'completed',
      overall_score: 75.0,
      passed: false,
      examiner_notes: 'Needs improvement in forms',
      created_at: new Date(),
      updated_at: new Date(),
      student: { ...mockStudent, firstName: 'Jane', lastName: 'Smith' },
    },
  ];

  beforeEach(async () => {
    mockStudentAssessmentsModel = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentAssessmentsService,
        {
          provide: getModelToken(StudentAssessments),
          useValue: mockStudentAssessmentsModel,
        },
      ],
    }).compile();

    service = module.get<StudentAssessmentsService>(StudentAssessmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all student assessments with student details', async () => {
      mockStudentAssessmentsModel.findAll.mockResolvedValue(
        mockStudentAssessmentArray,
      );

      const result = await service.findAll();

      expect(result).toEqual(mockStudentAssessmentArray);
      expect(mockStudentAssessmentsModel.findAll).toHaveBeenCalledWith({
        include: [
          {
            model: students,
            as: 'student',
            attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
          },
        ],
        order: [['assessment_date', 'DESC']],
      });
    });

    it('should return empty array when no assessments exist', async () => {
      mockStudentAssessmentsModel.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findByStudentId', () => {
    it('should return assessments for a specific student', async () => {
      const studentAssessments = mockStudentAssessmentArray.filter(
        (a) => a.student_id === 1,
      );
      mockStudentAssessmentsModel.findAll.mockResolvedValue(studentAssessments);

      const result = await service.findByStudentId(1);

      expect(result).toEqual(studentAssessments);
      expect(mockStudentAssessmentsModel.findAll).toHaveBeenCalledWith({
        where: { student_id: 1 },
        include: [
          {
            model: students,
            as: 'student',
            attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
          },
        ],
        order: [['assessment_date', 'DESC']],
      });
    });

    it('should return empty array when no assessments found for student', async () => {
      mockStudentAssessmentsModel.findAll.mockResolvedValue([]);

      const result = await service.findByStudentId(999);

      expect(result).toEqual([]);
    });
  });

  describe('getAssessmentSummary', () => {
    it('should calculate assessment summary correctly', async () => {
      const studentAssessments = [
        { ...mockStudentAssessmentArray[0], overall_score: 85, passed: true },
        { ...mockStudentAssessmentArray[1], assessment_status: 'in_progress' },
        {
          assessment_id: 4,
          student_id: 1,
          assessment_status: 'completed',
          overall_score: 75,
          passed: false,
        },
      ];
      mockStudentAssessmentsModel.findAll.mockResolvedValue(studentAssessments);

      const result = await service.getAssessmentSummary(1);

      expect(result).toEqual({
        totalAssessments: 3,
        completedAssessments: 2,
        inProgressAssessments: 1,
        averageScore: 80, // (85 + 75) / 2
        passRate: 50, // 1 passed out of 2 completed
        assessments: studentAssessments,
      });
    });

    it('should handle case with no assessments', async () => {
      mockStudentAssessmentsModel.findAll.mockResolvedValue([]);

      const result = await service.getAssessmentSummary(999);

      expect(result).toEqual({
        totalAssessments: 0,
        completedAssessments: 0,
        inProgressAssessments: 0,
        averageScore: 0,
        passRate: 0,
        assessments: [],
      });
    });

    it('should handle assessments without scores', async () => {
      const assessmentsWithoutScores = [
        {
          assessment_id: 1,
          student_id: 1,
          assessment_status: 'completed',
          overall_score: null,
          passed: false,
        },
        {
          assessment_id: 2,
          student_id: 1,
          assessment_status: 'completed',
          overall_score: null,
          passed: true,
        },
      ];
      mockStudentAssessmentsModel.findAll.mockResolvedValue(
        assessmentsWithoutScores,
      );

      const result = await service.getAssessmentSummary(1);

      expect(result).toEqual({
        totalAssessments: 2,
        completedAssessments: 2,
        inProgressAssessments: 0,
        averageScore: 0, // No scores to average
        passRate: 50, // 1 passed out of 2 completed
        assessments: assessmentsWithoutScores,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single assessment by id', async () => {
      mockStudentAssessmentsModel.findByPk.mockResolvedValue(
        mockStudentAssessment,
      );

      const result = await service.findOne(1);

      expect(result).toEqual(mockStudentAssessment);
      expect(mockStudentAssessmentsModel.findByPk).toHaveBeenCalledWith(1, {
        include: [
          {
            model: students,
            as: 'student',
            attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
          },
        ],
      });
    });

    it('should return null when assessment not found', async () => {
      mockStudentAssessmentsModel.findByPk.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });

  describe('getCurrentAssessment', () => {
    it('should return current in-progress assessment for student', async () => {
      const inProgressAssessment = {
        ...mockStudentAssessment,
        assessment_status: 'in_progress',
      };
      mockStudentAssessmentsModel.findOne.mockResolvedValue(
        inProgressAssessment,
      );

      const result = await service.getCurrentAssessment(1);

      expect(result).toEqual(inProgressAssessment);
      expect(mockStudentAssessmentsModel.findOne).toHaveBeenCalledWith({
        where: {
          student_id: 1,
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
    });

    it('should return null when no current assessment found', async () => {
      mockStudentAssessmentsModel.findOne.mockResolvedValue(null);

      const result = await service.getCurrentAssessment(999);

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new student assessment', async () => {
      const createDto = {
        student_id: 1,
        target_belt_rank: '6th Gup',
        assessment_status: 'in_progress' as const,
      };

      const expectedResult = {
        ...createDto,
        assessment_id: 4,
        assessment_date: expect.any(Date),
      };
      mockStudentAssessmentsModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockStudentAssessmentsModel.create).toHaveBeenCalledWith({
        ...createDto,
        assessment_date: expect.any(Date),
      });
    });

    it('should create with provided assessment_date', async () => {
      const assessmentDate = new Date('2023-03-15');
      const createDto = {
        student_id: 1,
        target_belt_rank: '6th Gup',
        assessment_status: 'in_progress' as const,
        assessment_date: assessmentDate,
      };

      const expectedResult = { ...createDto, assessment_id: 5 };
      mockStudentAssessmentsModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockStudentAssessmentsModel.create).toHaveBeenCalledWith(
        createDto,
      );
    });
  });

  describe('update', () => {
    it('should update an existing assessment', async () => {
      const updateDto = {
        overall_score: 90,
        passed: true,
        examiner_notes: 'Excellent improvement',
      };

      const updatedAssessment = { ...mockStudentAssessment, ...updateDto };
      mockStudentAssessmentsModel.update.mockResolvedValue([1]);
      mockStudentAssessmentsModel.findByPk.mockResolvedValue(updatedAssessment);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(updatedAssessment);
      expect(mockStudentAssessmentsModel.update).toHaveBeenCalledWith(
        updateDto,
        {
          where: { assessment_id: 1 },
        },
      );
    });

    it('should return null when assessment not found', async () => {
      const updateDto = { overall_score: 90 };
      mockStudentAssessmentsModel.update.mockResolvedValue([0]);

      const result = await service.update(999, updateDto);

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove an assessment and return true', async () => {
      mockStudentAssessmentsModel.destroy.mockResolvedValue(1);

      const result = await service.remove(1);

      expect(result).toBe(true);
      expect(mockStudentAssessmentsModel.destroy).toHaveBeenCalledWith({
        where: { assessment_id: 1 },
      });
    });

    it('should return false when assessment not found', async () => {
      mockStudentAssessmentsModel.destroy.mockResolvedValue(0);

      const result = await service.remove(999);

      expect(result).toBe(false);
    });
  });

  describe('completeAssessment', () => {
    it('should complete an assessment with final data', async () => {
      const finalData = {
        overall_score: 88,
        passed: true,
        examiner_notes: 'Good performance',
      };

      const completedAssessment = {
        ...mockStudentAssessment,
        ...finalData,
        assessment_status: 'completed',
      };

      mockStudentAssessmentsModel.update.mockResolvedValue([1]);
      mockStudentAssessmentsModel.findByPk.mockResolvedValue(
        completedAssessment,
      );

      const result = await service.completeAssessment(1, finalData);

      expect(result).toEqual(completedAssessment);
      expect(mockStudentAssessmentsModel.update).toHaveBeenCalledWith(
        { ...finalData, assessment_status: 'completed' },
        { where: { assessment_id: 1 } },
      );
    });

    it('should return null when assessment not found', async () => {
      mockStudentAssessmentsModel.update.mockResolvedValue([0]);

      const result = await service.completeAssessment(999, {
        overall_score: 88,
      });

      expect(result).toBeNull();
    });
  });

  describe('cancelAssessment', () => {
    it('should cancel an assessment with reason', async () => {
      const reason = 'Student illness';
      const cancelledAssessment = {
        ...mockStudentAssessment,
        assessment_status: 'cancelled',
        examiner_notes: `Cancelled: ${reason}`,
      };

      mockStudentAssessmentsModel.update.mockResolvedValue([1]);
      mockStudentAssessmentsModel.findByPk.mockResolvedValue(
        cancelledAssessment,
      );

      const result = await service.cancelAssessment(1, reason);

      expect(result).toEqual(cancelledAssessment);
      expect(mockStudentAssessmentsModel.update).toHaveBeenCalledWith(
        {
          assessment_status: 'cancelled',
          examiner_notes: `Cancelled: ${reason}`,
        },
        { where: { assessment_id: 1 } },
      );
    });

    it('should cancel an assessment without reason', async () => {
      const cancelledAssessment = {
        ...mockStudentAssessment,
        assessment_status: 'cancelled',
        examiner_notes: 'Assessment cancelled',
      };

      mockStudentAssessmentsModel.update.mockResolvedValue([1]);
      mockStudentAssessmentsModel.findByPk.mockResolvedValue(
        cancelledAssessment,
      );

      const result = await service.cancelAssessment(1);

      expect(result).toEqual(cancelledAssessment);
      expect(mockStudentAssessmentsModel.update).toHaveBeenCalledWith(
        {
          assessment_status: 'cancelled',
          examiner_notes: 'Assessment cancelled',
        },
        { where: { assessment_id: 1 } },
      );
    });
  });

  describe('getAssessmentsByStatus', () => {
    it('should return assessments by status', async () => {
      const completedAssessments = mockStudentAssessmentArray.filter(
        (a) => a.assessment_status === 'completed',
      );
      mockStudentAssessmentsModel.findAll.mockResolvedValue(
        completedAssessments,
      );

      const result = await service.getAssessmentsByStatus('completed');

      expect(result).toEqual(completedAssessments);
      expect(mockStudentAssessmentsModel.findAll).toHaveBeenCalledWith({
        where: { assessment_status: 'completed' },
        include: [
          {
            model: students,
            as: 'student',
            attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
          },
        ],
        order: [['assessment_date', 'DESC']],
      });
    });

    it('should handle all status types', async () => {
      mockStudentAssessmentsModel.findAll.mockResolvedValue([]);

      await service.getAssessmentsByStatus('in_progress');
      await service.getAssessmentsByStatus('cancelled');

      expect(mockStudentAssessmentsModel.findAll).toHaveBeenCalledTimes(2);
    });
  });

  describe('getAssessmentsByBeltRank', () => {
    it('should return assessments by target belt rank', async () => {
      const beltRankAssessments = mockStudentAssessmentArray.filter(
        (a) => a.target_belt_rank === '7th Gup',
      );
      mockStudentAssessmentsModel.findAll.mockResolvedValue(
        beltRankAssessments,
      );

      const result = await service.getAssessmentsByBeltRank('7th Gup');

      expect(result).toEqual(beltRankAssessments);
      expect(mockStudentAssessmentsModel.findAll).toHaveBeenCalledWith({
        where: { target_belt_rank: '7th Gup' },
        include: [
          {
            model: students,
            as: 'student',
            attributes: ['firstName', 'lastName', 'preferredName', 'beltRank'],
          },
        ],
        order: [['assessment_date', 'DESC']],
      });
    });

    it('should return empty array when no assessments found for belt rank', async () => {
      mockStudentAssessmentsModel.findAll.mockResolvedValue([]);

      const result = await service.getAssessmentsByBeltRank('1st Dan');

      expect(result).toEqual([]);
    });
  });
});
