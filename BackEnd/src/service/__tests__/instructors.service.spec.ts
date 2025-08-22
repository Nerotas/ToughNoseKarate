import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { InstructorsService } from '../instructors.service';
import { Instructors } from '../../models/instructors';
import * as bcrypt from 'bcrypt';

// Mock bcrypt
jest.mock('bcrypt');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('InstructorsService', () => {
  let service: InstructorsService;
  let instructorModel: jest.Mocked<typeof Instructors>;

  const mockInstructor = {
    instructor_id: 1,
    email: 'test@example.com',
    password_hash: 'hashedPassword',
    first_name: 'John',
    last_name: 'Doe',
    role: 'instructor',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date(),
    last_login: new Date(),
    update: jest.fn(),
    destroy: jest.fn(),
    getDataValue: jest.fn(),
  };

  beforeEach(async () => {
    const mockInstructorModel = {
      create: jest.fn(),
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstructorsService,
        {
          provide: getModelToken(Instructors),
          useValue: mockInstructorModel,
        },
      ],
    }).compile();

    service = module.get<InstructorsService>(InstructorsService);
    instructorModel = module.get(getModelToken(Instructors));

    // Reset mocks
    jest.clearAllMocks();
    mockedBcrypt.hash.mockResolvedValue('hashedPassword' as never);
    mockedBcrypt.compare.mockResolvedValue(true as never);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto = {
      email: 'test@example.com',
      password: 'password123',
      first_name: 'John',
      last_name: 'Doe',
      role: 'instructor' as const,
    };

    it('should create an instructor successfully', async () => {
      instructorModel.create.mockResolvedValue(mockInstructor as any);

      const result = await service.create(createDto);

      expect(mockedBcrypt.hash).toHaveBeenCalledWith('password123', 10);
      expect(instructorModel.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        password_hash: 'hashedPassword',
        first_name: 'John',
        last_name: 'Doe',
        role: 'instructor',
        is_active: true,
      });
      expect(result).toEqual(mockInstructor);
    });

    it('should default role to instructor when not provided', async () => {
      const dtoWithoutRole = { ...createDto };
      delete dtoWithoutRole.role;
      instructorModel.create.mockResolvedValue(mockInstructor as any);

      await service.create(dtoWithoutRole);

      expect(instructorModel.create).toHaveBeenCalledWith({
        email: 'test@example.com',
        password_hash: 'hashedPassword',
        first_name: 'John',
        last_name: 'Doe',
        role: 'instructor',
        is_active: true,
      });
    });

    it('should throw ConflictException when email already exists', async () => {
      const error = new Error('Unique constraint error');
      error.name = 'SequelizeUniqueConstraintError';
      instructorModel.create.mockRejectedValue(error);

      await expect(service.create(createDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.create(createDto)).rejects.toThrow(
        'Email already exists',
      );
    });

    it('should throw other errors as-is', async () => {
      const error = new Error('Database error');
      instructorModel.create.mockRejectedValue(error);

      await expect(service.create(createDto)).rejects.toThrow('Database error');
    });
  });

  describe('findAll', () => {
    it('should return all instructors without password hashes', async () => {
      const instructors = [mockInstructor];
      instructorModel.findAll.mockResolvedValue(instructors as any);

      const result = await service.findAll();

      expect(instructorModel.findAll).toHaveBeenCalledWith({
        attributes: { exclude: ['password_hash'] },
      });
      expect(result).toEqual(instructors);
    });
  });

  describe('findById', () => {
    it('should return instructor by id', async () => {
      instructorModel.findByPk.mockResolvedValue(mockInstructor as any);

      const result = await service.findById(1);

      expect(instructorModel.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockInstructor);
    });

    it('should return null when instructor not found', async () => {
      instructorModel.findByPk.mockResolvedValue(null);

      const result = await service.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('findByEmail', () => {
    it('should return instructor by email', async () => {
      instructorModel.findOne.mockResolvedValue(mockInstructor as any);

      const result = await service.findByEmail('test@example.com');

      expect(instructorModel.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(mockInstructor);
    });

    it('should return null when instructor not found', async () => {
      instructorModel.findOne.mockResolvedValue(null);

      const result = await service.findByEmail('notfound@example.com');

      expect(result).toBeNull();
    });
  });

  describe('findByIdSafe', () => {
    it('should return instructor by id without password hash', async () => {
      instructorModel.findByPk.mockResolvedValue(mockInstructor as any);

      const result = await service.findByIdSafe(1);

      expect(instructorModel.findByPk).toHaveBeenCalledWith(1, {
        attributes: { exclude: ['password_hash'] },
        logging: console.log,
      });
      expect(result).toEqual(mockInstructor);
    });
  });

  describe('update', () => {
    const updateDto = {
      first_name: 'Jane',
      last_name: 'Smith',
      role: 'admin' as const,
    };

    it('should update instructor successfully', async () => {
      const mockInstructorInstance = { ...mockInstructor };
      instructorModel.findByPk.mockResolvedValue(mockInstructorInstance as any);
      mockInstructorInstance.update.mockResolvedValue(
        mockInstructorInstance as any,
      );

      const result = await service.update(1, updateDto);

      expect(instructorModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockInstructorInstance.update).toHaveBeenCalledWith(updateDto);
      expect(result).toEqual(mockInstructorInstance);
    });

    it('should throw NotFoundException when instructor not found', async () => {
      instructorModel.findByPk.mockResolvedValue(null);

      await expect(service.update(999, updateDto)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.update(999, updateDto)).rejects.toThrow(
        'Instructor with ID 999 not found',
      );
    });

    it('should throw ConflictException when email already exists', async () => {
      const mockInstructorInstance = { ...mockInstructor };
      instructorModel.findByPk.mockResolvedValue(mockInstructorInstance as any);

      const error = new Error('Unique constraint error');
      error.name = 'SequelizeUniqueConstraintError';
      mockInstructorInstance.update.mockRejectedValue(error);

      await expect(
        service.update(1, { email: 'existing@example.com' }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('updateLastLogin', () => {
    it('should update last login timestamp', async () => {
      instructorModel.update.mockResolvedValue([1] as any);

      await service.updateLastLogin(1);

      expect(instructorModel.update).toHaveBeenCalledWith(
        { last_login: expect.any(Date) },
        { where: { instructor_id: 1 } },
      );
    });
  });

  describe('changePassword', () => {
    it('should change instructor password', async () => {
      instructorModel.update.mockResolvedValue([1] as any);

      await service.changePassword(1, 'newPassword123');

      expect(mockedBcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
      expect(instructorModel.update).toHaveBeenCalledWith(
        { password_hash: 'hashedPassword' },
        { where: { instructor_id: 1 } },
      );
    });
  });

  describe('deactivate', () => {
    it('should deactivate instructor successfully', async () => {
      const mockInstructorInstance = { ...mockInstructor };
      instructorModel.findByPk.mockResolvedValue(mockInstructorInstance as any);
      mockInstructorInstance.update.mockResolvedValue(
        mockInstructorInstance as any,
      );

      await service.deactivate(1);

      expect(instructorModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockInstructorInstance.update).toHaveBeenCalledWith({
        is_active: false,
      });
    });

    it('should throw NotFoundException when instructor not found', async () => {
      instructorModel.findByPk.mockResolvedValue(null);

      await expect(service.deactivate(999)).rejects.toThrow(NotFoundException);
      await expect(service.deactivate(999)).rejects.toThrow(
        'Instructor with ID 999 not found',
      );
    });
  });

  describe('activate', () => {
    it('should activate instructor successfully', async () => {
      const mockInstructorInstance = { ...mockInstructor };
      instructorModel.findByPk.mockResolvedValue(mockInstructorInstance as any);
      mockInstructorInstance.update.mockResolvedValue(
        mockInstructorInstance as any,
      );

      await service.activate(1);

      expect(instructorModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockInstructorInstance.update).toHaveBeenCalledWith({
        is_active: true,
      });
    });

    it('should throw NotFoundException when instructor not found', async () => {
      instructorModel.findByPk.mockResolvedValue(null);

      await expect(service.activate(999)).rejects.toThrow(NotFoundException);
      await expect(service.activate(999)).rejects.toThrow(
        'Instructor with ID 999 not found',
      );
    });
  });

  describe('remove', () => {
    it('should remove instructor successfully', async () => {
      const mockInstructorInstance = { ...mockInstructor };
      instructorModel.findByPk.mockResolvedValue(mockInstructorInstance as any);
      mockInstructorInstance.destroy.mockResolvedValue(undefined);

      await service.remove(1);

      expect(instructorModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockInstructorInstance.destroy).toHaveBeenCalled();
    });

    it('should throw NotFoundException when instructor not found', async () => {
      instructorModel.findByPk.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
      await expect(service.remove(999)).rejects.toThrow(
        'Instructor with ID 999 not found',
      );
    });
  });

  describe('validatePassword', () => {
    it('should validate password successfully', async () => {
      const mockInstructorInstance = { ...mockInstructor };
      mockInstructorInstance.getDataValue.mockReturnValue('hashedPassword');
      mockedBcrypt.compare.mockResolvedValue(true as never);

      const result = await service.validatePassword(
        mockInstructorInstance as any,
        'password123',
      );

      expect(mockInstructorInstance.getDataValue).toHaveBeenCalledWith(
        'password_hash',
      );
      expect(mockedBcrypt.compare).toHaveBeenCalledWith(
        'password123',
        'hashedPassword',
      );
      expect(result).toBe(true);
    });

    it('should return false for invalid password', async () => {
      const mockInstructorInstance = { ...mockInstructor };
      mockInstructorInstance.getDataValue.mockReturnValue('hashedPassword');
      mockedBcrypt.compare.mockResolvedValue(false as never);

      const result = await service.validatePassword(
        mockInstructorInstance as any,
        'wrongPassword',
      );

      expect(result).toBe(false);
    });
  });

  describe('count', () => {
    it('should return count of instructors', async () => {
      instructorModel.count.mockResolvedValue(5);

      const result = await service.count();

      expect(instructorModel.count).toHaveBeenCalled();
      expect(result).toBe(5);
    });
  });

  describe('findActiveInstructors', () => {
    it('should return active instructors without password hashes', async () => {
      const activeInstructors = [mockInstructor];
      instructorModel.findAll.mockResolvedValue(activeInstructors as any);

      const result = await service.findActiveInstructors();

      expect(instructorModel.findAll).toHaveBeenCalledWith({
        where: { is_active: true },
        attributes: { exclude: ['password_hash'] },
      });
      expect(result).toEqual(activeInstructors);
    });
  });
});
