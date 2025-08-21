import { Test, TestingModule } from '@nestjs/testing';
import { SelfDefenseDefinitionsController } from './selfDefenseDefinitions.controller';
import { SelfDefenseDefinitionsService } from '../service/selfDefenseDefinitions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

describe('SelfDefenseDefinitionsController', () => {
  let controller: SelfDefenseDefinitionsController;
  let service: jest.Mocked<SelfDefenseDefinitionsService>;

  const mockSelfDefenseDefinitionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockSelfDefense = {
    id: 1,
    name: 'Wrist Grab Defense',
    description: 'Defense against wrist grab',
    belt_rank: 'white',
    difficulty_level: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SelfDefenseDefinitionsController],
      providers: [
        {
          provide: SelfDefenseDefinitionsService,
          useValue: mockSelfDefenseDefinitionsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<SelfDefenseDefinitionsController>(
      SelfDefenseDefinitionsController,
    );
    service = module.get(SelfDefenseDefinitionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new self defense definition', async () => {
      const createDto = {
        name: 'Wrist Grab Defense',
        description: 'Defense against wrist grab',
        belt_rank: 'white',
      };

      service.create.mockResolvedValue(mockSelfDefense as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockSelfDefense);
    });
  });

  describe('findAll', () => {
    it('should return all self defense definitions', async () => {
      const mockSelfDefenses = [mockSelfDefense];
      service.findAll.mockResolvedValue(mockSelfDefenses as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockSelfDefenses);
    });
  });

  describe('findOne', () => {
    it('should return a specific self defense definition', async () => {
      const id = '1';
      service.findOne.mockResolvedValue(mockSelfDefense as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockSelfDefense);
    });
  });

  describe('update', () => {
    it('should update a self defense definition', async () => {
      const id = '1';
      const updateDto = { description: 'Updated description' };
      const updatedSelfDefense = { ...mockSelfDefense, ...updateDto };

      service.update.mockResolvedValue(updatedSelfDefense as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedSelfDefense);
    });
  });

  describe('remove', () => {
    it('should delete a self defense definition', async () => {
      const id = '1';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
