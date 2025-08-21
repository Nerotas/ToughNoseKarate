import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { FamiliesService } from '../families.service';
import { families } from '../../models/families';

describe('FamiliesService', () => {
  let service: FamiliesService;
  let mockModel: any;

  const mockFamily = {
    studentid: 1,
    parentid: 1,
    firstName: 'John',
    lastName: 'Doe',
    preferredName: 'Johnny',
    parentFirstName: 'Robert',
    parentLastName: 'Doe',
    startDate: '2023-01-15',
    email: 'john.doe@example.com',
    emergencyContactPhone: '555-1234',
    save: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const mockRepository = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
      count: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FamiliesService,
        {
          provide: getModelToken(families),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FamiliesService>(FamiliesService);
    mockModel = module.get(getModelToken(families));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of families', async () => {
      const expectedResult = [mockFamily];
      mockModel.findAll.mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(result).toEqual(expectedResult);
      expect(mockModel.findAll).toHaveBeenCalledWith();
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed');
      mockModel.findAll.mockRejectedValue(dbError);

      await expect(service.findAll()).rejects.toThrow(
        'Database connection failed',
      );
    });
  });

  describe('findOne', () => {
    it('should return a family when found', async () => {
      mockModel.findOne.mockResolvedValue(mockFamily);

      const result = await service.findOne(1);

      expect(result).toEqual(mockFamily);
      expect(mockModel.findOne).toHaveBeenCalledWith({
        where: { studentid: 1 },
      });
    });

    it('should return null when family not found', async () => {
      mockModel.findOne.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
      expect(mockModel.findOne).toHaveBeenCalledWith({
        where: { studentid: 999 },
      });
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database query failed');
      mockModel.findOne.mockRejectedValue(dbError);

      await expect(service.findOne(1)).rejects.toThrow('Database query failed');
    });
  });

  describe('create', () => {
    it('should create and return a new family', async () => {
      const createDto = {
        studentid: 4,
        parentid: 4,
        firstName: 'Bob',
        lastName: 'Wilson',
        startDate: '2023-03-15',
        email: 'bob.wilson@example.com',
      };

      const expectedResult = { ...createDto };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalledWith(createDto);
    });

    it('should handle validation errors', async () => {
      const createDto = {
        studentid: 4,
        parentid: 4,
        firstName: 'Bob',
        lastName: 'Wilson',
        startDate: '2023-03-15',
        email: 'invalid-email',
      };

      const validationError = new Error('Validation failed');
      mockModel.create.mockRejectedValue(validationError);

      await expect(service.create(createDto)).rejects.toThrow(
        'Validation failed',
      );
    });

    it('should handle database errors during creation', async () => {
      const createDto = {
        studentid: 4,
        parentid: 4,
        firstName: 'Bob',
        lastName: 'Wilson',
        startDate: '2023-03-15',
        email: 'bob.wilson@example.com',
      };

      const dbError = new Error('Database constraint violation');
      mockModel.create.mockRejectedValue(dbError);

      await expect(service.create(createDto)).rejects.toThrow(
        'Database constraint violation',
      );
    });
  });

  describe('update', () => {
    it('should update and return the updated family', async () => {
      const updateDto = {
        firstName: 'Robert',
        email: 'robert.wilson@example.com',
        startDate: '2023-04-01',
      };

      const expectedResult = [1, [{ ...mockFamily, ...updateDto }]];
      mockModel.update.mockResolvedValue(expectedResult);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.update).toHaveBeenCalledWith(updateDto, {
        where: { studentid: 1 },
        returning: true,
      });
    });

    it('should return [0, []] when family not found', async () => {
      const updateDto = {
        firstName: 'Robert',
      };

      const expectedResult = [0, []];
      mockModel.update.mockResolvedValue(expectedResult);

      const result = await service.update(999, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.update).toHaveBeenCalledWith(updateDto, {
        where: { studentid: 999 },
        returning: true,
      });
    });

    it('should handle partial updates', async () => {
      const updateDto = {
        email: 'new.email@example.com',
        preferredName: 'Rob',
      };

      const expectedResult = [1, [{ ...mockFamily, ...updateDto }]];
      mockModel.update.mockResolvedValue(expectedResult);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(expectedResult);
    });

    it('should handle update errors', async () => {
      const updateDto = {
        firstName: 'Robert',
      };

      const updateError = new Error('Update failed');
      mockModel.update.mockRejectedValue(updateError);

      await expect(service.update(1, updateDto)).rejects.toThrow(
        'Update failed',
      );
    });
  });

  describe('remove', () => {
    it('should remove a family and return count', async () => {
      mockModel.destroy.mockResolvedValue(1);

      const result = await service.remove(1);

      expect(result).toBe(1);
      expect(mockModel.destroy).toHaveBeenCalledWith({
        where: { studentid: 1 },
      });
    });

    it('should return 0 when family not found', async () => {
      mockModel.destroy.mockResolvedValue(0);

      const result = await service.remove(999);

      expect(result).toBe(0);
      expect(mockModel.destroy).toHaveBeenCalledWith({
        where: { studentid: 999 },
      });
    });

    it('should handle removal errors', async () => {
      const deleteError = new Error('Deletion failed');
      mockModel.destroy.mockRejectedValue(deleteError);

      await expect(service.remove(1)).rejects.toThrow('Deletion failed');
    });
  });

  describe('findByStudentId', () => {
    it('should return families for a specific student', async () => {
      const expectedResult = [mockFamily];
      mockModel.findAll.mockResolvedValue(expectedResult);

      const result = await service.findByStudentId(1);

      expect(result).toEqual(expectedResult);
      expect(mockModel.findAll).toHaveBeenCalledWith({
        where: { studentid: 1 },
      });
    });

    it('should return empty array when no families found for student', async () => {
      mockModel.findAll.mockResolvedValue([]);

      const result = await service.findByStudentId(999);

      expect(result).toEqual([]);
      expect(mockModel.findAll).toHaveBeenCalledWith({
        where: { studentid: 999 },
      });
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database query failed');
      mockModel.findAll.mockRejectedValue(dbError);

      await expect(service.findByStudentId(1)).rejects.toThrow(
        'Database query failed',
      );
    });
  });

  describe('findByParentId', () => {
    it('should return families for a specific parent', async () => {
      const expectedResult = [mockFamily];
      mockModel.findAll.mockResolvedValue(expectedResult);

      const result = await service.findByParentId(1);

      expect(result).toEqual(expectedResult);
      expect(mockModel.findAll).toHaveBeenCalledWith({
        where: { parentid: 1 },
      });
    });

    it('should return empty array when no families found for parent', async () => {
      mockModel.findAll.mockResolvedValue([]);

      const result = await service.findByParentId(999);

      expect(result).toEqual([]);
      expect(mockModel.findAll).toHaveBeenCalledWith({
        where: { parentid: 999 },
      });
    });

    it('should handle database errors', async () => {
      const dbError = new Error('Database query failed');
      mockModel.findAll.mockRejectedValue(dbError);

      await expect(service.findByParentId(1)).rejects.toThrow(
        'Database query failed',
      );
    });
  });
});
