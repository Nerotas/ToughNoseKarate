import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { StudentsService } from './students.service';
import { students, CreateStudentDto } from '../models/students';

describe('StudentsService', () => {
  let service: StudentsService;
  let studentsModel: jest.Mocked<typeof students>;

  const mockStudentsModel = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockStudent = {
    studentid: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    startDateUTC: '2024-01-01T00:00:00Z',
    beltRank: 'white',
    active: true,
    child: true,
    toJSON: jest.fn(),
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getModelToken(students),
          useValue: mockStudentsModel,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    studentsModel = module.get(getModelToken(students));

    // Mock console.log to avoid noise in tests
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all students', async () => {
      const mockStudents = [
        mockStudent,
        { ...mockStudent, studentid: 2, firstName: 'Jane' },
      ];

      studentsModel.findAll.mockResolvedValue(mockStudents as any);

      const result = await service.findAll();

      expect(studentsModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockStudents);
    });

    it('should return empty array when no students found', async () => {
      studentsModel.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(studentsModel.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should handle database error', async () => {
      studentsModel.findAll.mockRejectedValue(
        new Error('Database connection error'),
      );

      await expect(service.findAll()).rejects.toThrow(
        'Database connection error',
      );
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      const studentId = 1;

      studentsModel.findOne.mockResolvedValue(mockStudent as any);

      const result = await service.findOne(studentId);

      expect(studentsModel.findOne).toHaveBeenCalledWith({
        where: { studentid: studentId },
      });
      expect(result).toEqual(mockStudent);
    });

    it('should return null when student not found', async () => {
      const studentId = 999;

      studentsModel.findOne.mockResolvedValue(null);

      const result = await service.findOne(studentId);

      expect(studentsModel.findOne).toHaveBeenCalledWith({
        where: { studentid: studentId },
      });
      expect(result).toBeNull();
    });

    it('should handle database error', async () => {
      const studentId = 1;

      studentsModel.findOne.mockRejectedValue(
        new Error('Database connection error'),
      );

      await expect(service.findOne(studentId)).rejects.toThrow(
        'Database connection error',
      );
    });
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const createStudentDto: CreateStudentDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        startDateUTC: '2024-01-01T00:00:00Z',
        beltRank: 'white',
        child: true,
      };

      studentsModel.create.mockResolvedValue(mockStudent as any);

      const result = await service.create(createStudentDto);

      expect(studentsModel.create).toHaveBeenCalledWith(createStudentDto);
      expect(result).toEqual(mockStudent);
    });

    it('should handle validation errors', async () => {
      const createStudentDto: CreateStudentDto = {
        firstName: '',
        lastName: 'Doe',
        email: 'invalid-email',
        startDateUTC: '2024-01-01T00:00:00Z',
      };

      studentsModel.create.mockRejectedValue(new Error('Validation error'));

      await expect(service.create(createStudentDto)).rejects.toThrow(
        'Validation error',
      );
    });

    it('should handle database constraints', async () => {
      const createStudentDto: CreateStudentDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'existing@example.com',
        startDateUTC: '2024-01-01T00:00:00Z',
      };

      studentsModel.create.mockRejectedValue(
        new Error('Unique constraint violation'),
      );

      await expect(service.create(createStudentDto)).rejects.toThrow(
        'Unique constraint violation',
      );
    });
  });

  describe('update', () => {
    it('should update a student successfully', async () => {
      const studentId = 1;
      const updateData = {
        firstName: 'John Updated',
        beltRank: 'yellow',
      };

      const updatedStudent = { ...mockStudent, ...updateData };

      mockStudent.toJSON.mockReturnValue(mockStudent);
      updatedStudent.get = jest.fn().mockReturnValue(updatedStudent);

      studentsModel.findOne.mockResolvedValue(mockStudent as any);
      studentsModel.update.mockResolvedValue([1, [updatedStudent]] as any);

      const result = await service.update(studentId, updateData);

      expect(studentsModel.findOne).toHaveBeenCalledWith({
        where: { studentid: studentId },
      });
      expect(studentsModel.update).toHaveBeenCalledWith(updateData, {
        where: { studentid: studentId },
        returning: true,
        logging: console.log,
      });
      expect(result).toEqual({
        updated: true,
        student: updatedStudent,
      });
    });

    it('should return updated: false when student not found', async () => {
      const studentId = 999;
      const updateData = { firstName: 'John Updated' };

      studentsModel.findOne.mockResolvedValue(mockStudent as any);
      studentsModel.update.mockResolvedValue([0, []] as any);

      const result = await service.update(studentId, updateData);

      expect(result).toEqual({ updated: false });
    });

    it('should handle database error during update', async () => {
      const studentId = 1;
      const updateData = { firstName: 'John Updated' };

      studentsModel.findOne.mockResolvedValue(mockStudent as any);
      studentsModel.update.mockRejectedValue(new Error('Database error'));

      await expect(service.update(studentId, updateData)).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('remove', () => {
    it('should remove a student successfully', async () => {
      const studentId = 1;

      studentsModel.destroy.mockResolvedValue(1);

      const result = await service.remove(studentId);

      expect(studentsModel.destroy).toHaveBeenCalledWith({
        where: { studentid: studentId },
      });
      expect(result).toBe(1);
    });

    it('should return 0 when student not found', async () => {
      const studentId = 999;

      studentsModel.destroy.mockResolvedValue(0);

      const result = await service.remove(studentId);

      expect(studentsModel.destroy).toHaveBeenCalledWith({
        where: { studentid: studentId },
      });
      expect(result).toBe(0);
    });

    it('should handle database error during removal', async () => {
      const studentId = 1;

      studentsModel.destroy.mockRejectedValue(new Error('Database error'));

      await expect(service.remove(studentId)).rejects.toThrow('Database error');
    });
  });
});
