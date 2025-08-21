import { Test, TestingModule } from '@nestjs/testing';
import { KicksDefinitionsController } from './kicksDefinitions.controller';
import { KicksDefinitionsService } from '../service/kicksDefinitions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

describe('KicksDefinitionsController', () => {
  let controller: KicksDefinitionsController;
  let service: jest.Mocked<KicksDefinitionsService>;

  const mockKicksDefinitionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockKick = {
    id: 1,
    name: 'Front Kick',
    description: 'Basic front kick technique',
    belt_rank: 'white',
    difficulty_level: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KicksDefinitionsController],
      providers: [
        {
          provide: KicksDefinitionsService,
          useValue: mockKicksDefinitionsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<KicksDefinitionsController>(
      KicksDefinitionsController,
    );
    service = module.get(KicksDefinitionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new kick definition', async () => {
      const createDto = {
        name: 'Front Kick',
        description: 'Basic front kick',
        belt_rank: 'white',
      };

      service.create.mockResolvedValue(mockKick as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockKick);
    });
  });

  describe('findAll', () => {
    it('should return all kick definitions', async () => {
      const mockKicks = [mockKick];
      service.findAll.mockResolvedValue(mockKicks as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockKicks);
    });
  });

  describe('findOne', () => {
    it('should return a specific kick definition', async () => {
      const id = '1';
      service.findOne.mockResolvedValue(mockKick as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockKick);
    });
  });

  describe('update', () => {
    it('should update a kick definition', async () => {
      const id = '1';
      const updateDto = { description: 'Updated description' };
      const updatedKick = { ...mockKick, ...updateDto };

      service.update.mockResolvedValue(updatedKick as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedKick);
    });
  });

  describe('remove', () => {
    it('should delete a kick definition', async () => {
      const id = '1';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
