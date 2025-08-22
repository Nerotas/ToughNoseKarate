import { Test, TestingModule } from '@nestjs/testing';
import { ParentMappingController } from '../parentMapping.controller';
import { ParentMappingService } from '../../service/parentMapping.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

describe('ParentMappingController', () => {
  let controller: ParentMappingController;
  let service: jest.Mocked<ParentMappingService>;

  const mockParentMappingService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockMapping = {
    id: 1,
    parent_id: 1,
    student_id: 1,
    relationship: 'parent',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParentMappingController],
      providers: [
        {
          provide: ParentMappingService,
          useValue: mockParentMappingService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ParentMappingController>(ParentMappingController);
    service = module.get(ParentMappingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new parent mapping', async () => {
      const createDto = {
        parent_id: 1,
        student_id: 1,
        relationship: 'parent',
      };

      service.create.mockResolvedValue(mockMapping as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockMapping);
    });
  });

  describe('findAll', () => {
    it('should return all parent mappings', async () => {
      const mockMappings = [mockMapping];
      service.findAll.mockResolvedValue(mockMappings as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockMappings);
    });
  });

  describe('findOne', () => {
    it('should return a specific parent mapping', async () => {
      const id = '1';
      service.findOne.mockResolvedValue(mockMapping as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockMapping);
    });
  });

  describe('update', () => {
    it('should update a parent mapping', async () => {
      const id = '1';
      const updateDto = { relationship: 'guardian' };
      const updatedMapping = { ...mockMapping, ...updateDto };

      service.update.mockResolvedValue(updatedMapping as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedMapping);
    });
  });

  describe('remove', () => {
    it('should delete a parent mapping', async () => {
      const id = '1';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
