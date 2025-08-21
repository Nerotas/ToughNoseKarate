import { Test, TestingModule } from '@nestjs/testing';
import { StanceDefinitionsController } from './stanceDefinitions.controller';
import { StanceDefinitionsService } from '../service/stanceDefinitions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

describe('StanceDefinitionsController', () => {
  let controller: StanceDefinitionsController;
  let service: jest.Mocked<StanceDefinitionsService>;

  const mockStanceDefinitionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockStance = {
    id: 1,
    name: 'Ready Stance',
    description: 'Basic ready position',
    belt_rank: 'white',
    difficulty_level: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StanceDefinitionsController],
      providers: [
        {
          provide: StanceDefinitionsService,
          useValue: mockStanceDefinitionsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<StanceDefinitionsController>(
      StanceDefinitionsController,
    );
    service = module.get(StanceDefinitionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new stance definition', async () => {
      const createDto = {
        name: 'Ready Stance',
        description: 'Basic ready position',
        belt_rank: 'white',
      };

      service.create.mockResolvedValue(mockStance as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockStance);
    });
  });

  describe('findAll', () => {
    it('should return all stance definitions', async () => {
      const mockStances = [mockStance];
      service.findAll.mockResolvedValue(mockStances as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockStances);
    });
  });

  describe('findOne', () => {
    it('should return a specific stance definition', async () => {
      const id = '1';
      service.findOne.mockResolvedValue(mockStance as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockStance);
    });
  });

  describe('update', () => {
    it('should update a stance definition', async () => {
      const id = '1';
      const updateDto = { description: 'Updated description' };
      const updatedStance = { ...mockStance, ...updateDto };

      service.update.mockResolvedValue(updatedStance as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedStance);
    });
  });

  describe('remove', () => {
    it('should delete a stance definition', async () => {
      const id = '1';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
