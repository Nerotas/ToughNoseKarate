import { Test, TestingModule } from '@nestjs/testing';
import { BeltRequirementsController } from '../beltRequirements.controller';
import { BeltRequirementsService } from '../../service/beltRequirements.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

describe('BeltRequirementsController', () => {
  let controller: BeltRequirementsController;
  let service: jest.Mocked<BeltRequirementsService>;

  const mockBeltRequirementsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockBeltRequirement = {
    belt_rank: 'white',
    description: 'Basic belt requirements',
    techniques_required: ['basic punch', 'basic kick'],
    forms_required: ['form 1'],
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeltRequirementsController],
      providers: [
        {
          provide: BeltRequirementsService,
          useValue: mockBeltRequirementsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<BeltRequirementsController>(
      BeltRequirementsController,
    );
    service = module.get(BeltRequirementsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new belt requirement', async () => {
      const createDto = {
        belt_rank: 'white',
        description: 'Basic requirements',
      };

      service.create.mockResolvedValue(mockBeltRequirement as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockBeltRequirement);
    });
  });

  describe('findAll', () => {
    it('should return all belt requirements', async () => {
      const mockRequirements = [mockBeltRequirement];
      service.findAll.mockResolvedValue(mockRequirements as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockRequirements);
    });
  });

  describe('findOne', () => {
    it('should return a specific belt requirement', async () => {
      const beltRank = 'white';
      service.findOne.mockResolvedValue(mockBeltRequirement as any);

      const result = await controller.findOne(beltRank);

      expect(service.findOne).toHaveBeenCalledWith(beltRank);
      expect(result).toEqual(mockBeltRequirement);
    });
  });

  describe('update', () => {
    it('should update a belt requirement', async () => {
      const beltRank = 'white';
      const updateDto = { description: 'Updated requirements' };
      const updatedRequirement = { ...mockBeltRequirement, ...updateDto };

      service.update.mockResolvedValue(updatedRequirement as any);

      const result = await controller.update(beltRank, updateDto);

      expect(service.update).toHaveBeenCalledWith(beltRank, updateDto);
      expect(result).toEqual(updatedRequirement);
    });
  });

  describe('remove', () => {
    it('should delete a belt requirement', async () => {
      const beltRank = 'white';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(beltRank);

      expect(service.remove).toHaveBeenCalledWith(beltRank);
      expect(result).toEqual(deleteResult);
    });
  });
});
