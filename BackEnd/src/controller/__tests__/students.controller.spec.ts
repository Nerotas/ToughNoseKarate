import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from '../students.controller';
import { StudentsService } from '../../service/students.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { CreateStudentDto, StudentsAttributes } from '../../models/students';
import { InstructorPayload } from '../../auth/jwt.strategy';

describe('StudentsController', () => {
  let controller: StudentsController;
  let studentsService: jest.Mocked<StudentsService>;

  const mockStudentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockInstructorPayload: InstructorPayload = {
    instructorId: 1,
    email: 'instructor@example.com',
    role: 'instructor',
  };

  const mockStudent = {
    studentid: 1,
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '2010-01-01',
    beltRank: 'white',
    startDateUTC: '2024-01-01T00:00:00Z',
    email: 'john.doe@example.com',
    active: true,
    child: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: mockStudentsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<StudentsController>(StudentsController);
    studentsService = module.get(StudentsService);

    // Mock console.log to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const createStudentDto: CreateStudentDto = {
        firstName: 'John',
        lastName: 'Doe',
        startDateUTC: '2024-01-01T00:00:00Z',
        email: 'john.doe@example.com',
        beltRank: 'white',
        child: true,
      };

      studentsService.create.mockResolvedValue(mockStudent as any);

      const result = await controller.create(
        createStudentDto,
        mockInstructorPayload,
      );

      expect(studentsService.create).toHaveBeenCalledWith(createStudentDto);
      expect(result).toEqual(mockStudent);
      expect(console.log).toHaveBeenCalledWith(
        `Instructor ${mockInstructorPayload.email} is creating a new student`,
      );
    });

    it('should handle creation error', async () => {
      const createStudentDto: CreateStudentDto = {
        firstName: 'John',
        lastName: 'Doe',
        startDateUTC: '2024-01-01T00:00:00Z',
        email: 'john.doe@example.com',
      };

      studentsService.create.mockRejectedValue(new Error('Database error'));

      await expect(
        controller.create(createStudentDto, mockInstructorPayload),
      ).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    it('should return all students', async () => {
      const mockStudents = [
        mockStudent,
        { ...mockStudent, studentid: 2, firstName: 'Jane' },
      ];

      studentsService.findAll.mockResolvedValue(mockStudents as any);

      const result = await controller.findAll(mockInstructorPayload);

      expect(studentsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockStudents);
      expect(console.log).toHaveBeenCalledWith(
        `Instructor ${mockInstructorPayload.email} (${mockInstructorPayload.role}) accessed students list`,
      );
    });

    it('should handle findAll with pagination parameters', async () => {
      const mockStudents = [mockStudent];
      const limit = 10;
      const offset = 0;

      studentsService.findAll.mockResolvedValue(mockStudents as any);

      const result = await controller.findAll(
        mockInstructorPayload,
        limit,
        offset,
      );

      expect(studentsService.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockStudents);
    });

    it('should handle findAll error', async () => {
      studentsService.findAll.mockRejectedValue(new Error('Database error'));

      await expect(controller.findAll(mockInstructorPayload)).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      const studentId = '1';

      studentsService.findOne.mockResolvedValue(mockStudent as any);

      const result = await controller.findOne(studentId, mockInstructorPayload);

      expect(studentsService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockStudent);
      expect(console.log).toHaveBeenCalledWith(
        `Instructor ${mockInstructorPayload.email} accessed student ${studentId}`,
      );
    });

    it('should handle student not found', async () => {
      const studentId = '999';

      studentsService.findOne.mockResolvedValue(null);

      const result = await controller.findOne(studentId, mockInstructorPayload);

      expect(studentsService.findOne).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });

    it('should handle findOne error', async () => {
      const studentId = '1';

      studentsService.findOne.mockRejectedValue(new Error('Database error'));

      await expect(
        controller.findOne(studentId, mockInstructorPayload),
      ).rejects.toThrow('Database error');
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const studentId = '1';
      const updateStudentsDto: StudentsAttributes = {
        firstName: 'John Updated',
        lastName: 'Doe',
        beltRank: 'yellow',
        email: 'john.updated@example.com',
        startDateUTC: '2024-01-01T00:00:00Z',
      };

      const updatedStudent = { ...mockStudent, ...updateStudentsDto };

      studentsService.update.mockResolvedValue(updatedStudent as any);

      const result = await controller.update(
        studentId,
        updateStudentsDto,
        mockInstructorPayload,
      );

      expect(studentsService.update).toHaveBeenCalledWith(1, updateStudentsDto);
      expect(result).toEqual(updatedStudent);
      expect(console.log).toHaveBeenCalledWith(
        `Instructor ${mockInstructorPayload.email} is updating student ${studentId}`,
      );
    });

    it('should handle update error', async () => {
      const studentId = '1';
      const updateStudentsDto: StudentsAttributes = {
        firstName: 'John Updated',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        startDateUTC: '2024-01-01T00:00:00Z',
      };

      studentsService.update.mockRejectedValue(new Error('Student not found'));

      await expect(
        controller.update(studentId, updateStudentsDto, mockInstructorPayload),
      ).rejects.toThrow('Student not found');
    });
  });

  describe('remove', () => {
    it('should delete a student', async () => {
      const studentId = '1';
      const deleteResult = { message: 'Student deleted successfully' };

      studentsService.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(studentId, mockInstructorPayload);

      expect(studentsService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
      expect(console.log).toHaveBeenCalledWith(
        `Instructor ${mockInstructorPayload.email} is deleting student ${studentId}`,
      );
    });

    it('should handle delete error', async () => {
      const studentId = '999';

      studentsService.remove.mockRejectedValue(new Error('Student not found'));

      await expect(
        controller.remove(studentId, mockInstructorPayload),
      ).rejects.toThrow('Student not found');
    });
  });
});
