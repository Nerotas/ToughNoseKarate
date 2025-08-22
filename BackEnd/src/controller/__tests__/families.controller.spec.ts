import { Test, TestingModule } from '@nestjs/testing';
import { FamiliesController } from '../families.controller';
import { FamiliesService } from '../../service/families.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

describe('FamiliesController', () => {
  let controller: FamiliesController;
  let service: jest.Mocked<FamiliesService>;

  const mockFamiliesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByStudentId: jest.fn(),
    findByParentId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockFamily = {
    id: 1,
    student_id: 1,
    parent_id: 1,
    relationship: 'parent',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FamiliesController],
      providers: [
        {
          provide: FamiliesService,
          useValue: mockFamiliesService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<FamiliesController>(FamiliesController);
    service = module.get(FamiliesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new family relationship', async () => {
      const createDto = {
        student_id: 1,
        parent_id: 1,
        relationship: 'parent',
      };

      service.create.mockResolvedValue(mockFamily as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockFamily);
    });
  });

  describe('findAll', () => {
    it('should return all family relationships', async () => {
      const mockFamilies = [mockFamily];
      service.findAll.mockResolvedValue(mockFamilies as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockFamilies);
    });
  });

  describe('findByStudentId', () => {
    it('should return family members for a student', async () => {
      const studentId = '1';
      const mockFamilies = [mockFamily];
      service.findByStudentId.mockResolvedValue(mockFamilies as any);

      const result = await controller.findByStudentId(studentId);

      expect(service.findByStudentId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockFamilies);
    });
  });

  describe('findByParentId', () => {
    it('should return family members for a parent', async () => {
      const parentId = '1';
      const mockFamilies = [mockFamily];
      service.findByParentId.mockResolvedValue(mockFamilies as any);

      const result = await controller.findByParentId(parentId);

      expect(service.findByParentId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockFamilies);
    });
  });

  describe('findOne', () => {
    it('should return a specific family relationship', async () => {
      const id = '1';
      service.findOne.mockResolvedValue(mockFamily as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockFamily);
    });
  });

  describe('update', () => {
    it('should update a family relationship', async () => {
      const id = '1';
      const updateDto = { relationship: 'guardian' };
      const updatedFamily = { ...mockFamily, ...updateDto };

      service.update.mockResolvedValue(updatedFamily as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedFamily);
    });
  });

  describe('remove', () => {
    it('should delete a family relationship', async () => {
      const id = '1';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
