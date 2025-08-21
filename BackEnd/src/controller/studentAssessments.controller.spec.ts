import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { StudentAssessmentsController } from './studentAssessments.controller';
import {
  StudentAssessmentsService,
  CreateStudentAssessmentDto,
  UpdateStudentAssessmentDto,
} from '../service/studentAssessments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

describe('StudentAssessmentsController', () => {
  let controller: StudentAssessmentsController;
  let service: jest.Mocked<StudentAssessmentsService>;

  const mockStudentAssessmentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByStudentId: jest.fn(),
    findByStatus: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findAssessmentSummary: jest.fn(),
    getAssessmentSummary: jest.fn(),
    getCurrentAssessment: jest.fn(),
    completeAssessment: jest.fn(),
    cancelAssessment: jest.fn(),
    getAssessmentsByBeltRank: jest.fn(),
  };

  const mockAssessment = {
    assessment_id: 1,
    student_id: 1,
    status: 'in_progress',
    created_at: new Date(),
    updated_at: new Date(),
    belt_rank: 'white',
    instructor_notes: null,
    completed_at: null,
    cancelled_at: null,
    cancellation_reason: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentAssessmentsController],
      providers: [
        {
          provide: StudentAssessmentsService,
          useValue: mockStudentAssessmentsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<StudentAssessmentsController>(
      StudentAssessmentsController,
    );
    service = module.get(StudentAssessmentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new student assessment', async () => {
      const createDto: CreateStudentAssessmentDto = {
        student_id: 1,
        target_belt_rank: 'white',
        belt_size: '100',
      };

      service.create.mockResolvedValue(mockAssessment as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockAssessment);
    });

    it('should handle creation error', async () => {
      const createDto: CreateStudentAssessmentDto = {
        student_id: 1,
        target_belt_rank: 'white',
      };

      service.create.mockRejectedValue(new Error('Database error'));

      await expect(controller.create(createDto)).rejects.toThrow(HttpException);
      await expect(controller.create(createDto)).rejects.toThrow(
        'Failed to create student assessment',
      );
    });
  });

  describe('findAll', () => {
    it('should return all assessments', async () => {
      const mockAssessments = [
        mockAssessment,
        { ...mockAssessment, assessment_id: 2 },
      ];

      service.findAll.mockResolvedValue(mockAssessments as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockAssessments);
    });

    it('should handle findAll error', async () => {
      service.findAll.mockRejectedValue(new Error('Database error'));

      await expect(controller.findAll()).rejects.toThrow(
        'Failed to retrieve student assessments',
      );
    });
  });

  describe('findOne', () => {
    it('should return a specific assessment', async () => {
      const assessmentId = 1;

      service.findOne.mockResolvedValue(mockAssessment as any);

      const result = await controller.findOne(assessmentId);

      expect(service.findOne).toHaveBeenCalledWith(assessmentId);
      expect(result).toEqual(mockAssessment);
    });

    it('should handle assessment not found', async () => {
      const assessmentId = 999;

      service.findOne.mockResolvedValue(null);

      await expect(controller.findOne(assessmentId)).rejects.toThrow(
        'Assessment not found',
      );

      expect(service.findOne).toHaveBeenCalledWith(assessmentId);
    });
  });

  describe('findByStudentId', () => {
    it('should return assessments for a specific student', async () => {
      const studentId = 1;
      const mockAssessments = [mockAssessment];

      service.findByStudentId.mockResolvedValue(mockAssessments as any);

      const result = await controller.findByStudentId(studentId);

      expect(service.findByStudentId).toHaveBeenCalledWith(studentId);
      expect(result).toEqual(mockAssessments);
    });

    it('should return empty array when no assessments found', async () => {
      const studentId = 999;

      service.findByStudentId.mockResolvedValue([]);

      const result = await controller.findByStudentId(studentId);

      expect(service.findByStudentId).toHaveBeenCalledWith(studentId);
      expect(result).toEqual([]);
    });
  });

  describe('update', () => {
    it('should update an assessment', async () => {
      const assessmentId = 1;
      const updateDto: UpdateStudentAssessmentDto = {
        belt_size: '2',
        target_belt_rank: 'gold',
      };

      const updatedAssessment = { ...mockAssessment, ...updateDto };

      service.update.mockResolvedValue(updatedAssessment as any);

      const result = await controller.update(assessmentId, updateDto);

      expect(service.update).toHaveBeenCalledWith(assessmentId, updateDto);
      expect(result).toEqual(updatedAssessment);
    });

    it('should handle update error', async () => {
      const assessmentId = 999;
      const updateDto: UpdateStudentAssessmentDto = {
        target_belt_rank: 'yellow',
      };

      service.update.mockRejectedValue(new Error('Assessment not found'));

      await expect(controller.update(assessmentId, updateDto)).rejects.toThrow(
        'Failed to update assessment',
      );
    });
  });

  describe('remove', () => {
    it('should remove an assessment', async () => {
      const assessmentId = 1;
      const deleteResult = {
        message: 'Assessment deleted successfully',
      };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(assessmentId);

      expect(service.remove).toHaveBeenCalledWith(assessmentId);
      expect(result).toEqual(deleteResult);
    });

    it('should handle remove error', async () => {
      const assessmentId = 999;

      service.remove.mockRejectedValue(new Error('Assessment not found'));

      await expect(controller.remove(assessmentId)).rejects.toThrow(
        'Failed to delete assessment',
      );
    });
  });

  describe('findAssessmentSummary', () => {
    it('should return assessment summary for a student', async () => {
      const studentId = 1;
      const mockSummary = {
        total_assessments: 3,
        completed_assessments: 2,
        in_progress_assessments: 1,
        cancelled_assessments: 0,
        current_belt_rank: 'yellow',
      };

      service.getAssessmentSummary.mockResolvedValue(mockSummary as any);

      const result = await controller.getAssessmentSummary(studentId);

      expect(service.getAssessmentSummary).toHaveBeenCalledWith(studentId);
      expect(result).toEqual(mockSummary);
    });
  });

  describe('getCurrentAssessment', () => {
    it('should return current assessment for a student', async () => {
      const studentId = 1;

      service.getCurrentAssessment.mockResolvedValue(mockAssessment as any);

      const result = await controller.getCurrentAssessment(studentId);

      expect(service.getCurrentAssessment).toHaveBeenCalledWith(studentId);
      expect(result).toEqual(mockAssessment);
    });

    it('should return null when no current assessment', async () => {
      const studentId = 1;

      service.getCurrentAssessment.mockResolvedValue(null);

      const result = await controller.getCurrentAssessment(studentId);

      expect(service.getCurrentAssessment).toHaveBeenCalledWith(studentId);
      expect(result).toBeNull();
    });
  });

  describe('cancelAssessment', () => {
    it('should cancel an assessment', async () => {
      const assessmentId = 1;
      const reason = 'Student unavailable';
      const cancelledAssessment = {
        ...mockAssessment,
        status: 'cancelled',
        cancelled_at: new Date(),
        cancellation_reason: reason,
      };

      service.cancelAssessment.mockResolvedValue(cancelledAssessment as any);

      const result = await controller.cancelAssessment(assessmentId, {
        reason,
      });

      expect(service.cancelAssessment).toHaveBeenCalledWith(
        assessmentId,
        reason,
      );
      expect(result).toEqual(cancelledAssessment);
    });

    it('should handle cancellation error', async () => {
      const assessmentId = 999;
      const reason = 'Student unavailable';

      service.cancelAssessment.mockRejectedValue(
        new Error('Assessment not found'),
      );

      await expect(
        controller.cancelAssessment(assessmentId, { reason }),
      ).rejects.toThrow('Failed to cancel assessment');
    });
  });
});
