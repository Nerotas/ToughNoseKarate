import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { KicksDefinitionsService } from '../kicksDefinitions.service';
import { kicksDefinitions } from '../../models/kicksDefinitions';

describe('KicksDefinitionsService', () => {
  let service: KicksDefinitionsService;
  let kicksDefinitionsModel: jest.Mocked<typeof kicksDefinitions>;

  const mockKicksDefinitionsModel = {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockKicksDefinition = {
    id: 1,
    kickName: 'Front Kick',
    technique: 'Ap Chagi',
    belt: 'white',
    beltColor: 'white',
    target: 'Middle section',
    execution: ['Chamber leg', 'Extend foot forward', 'Retract'],
    keyPoints: ['Keep balance', 'Use ball of foot'],
    commonMistakes: ['Poor balance', 'Wrong target'],
    applications: ['Self-defense', 'Sparring'],
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        KicksDefinitionsService,
        {
          provide: getModelToken(kicksDefinitions),
          useValue: mockKicksDefinitionsModel,
        },
      ],
    }).compile();

    service = module.get<KicksDefinitionsService>(KicksDefinitionsService);
    kicksDefinitionsModel = module.get(getModelToken(kicksDefinitions));

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all kicks definitions', async () => {
      const mockKicks = [mockKicksDefinition];
      kicksDefinitionsModel.findAll.mockResolvedValue(mockKicks as any);

      const result = await service.findAll();

      expect(kicksDefinitionsModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockKicks);
    });

    it('should return empty array when no kicks found', async () => {
      kicksDefinitionsModel.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a kicks definition by id', async () => {
      const id = 1;
      kicksDefinitionsModel.findByPk.mockResolvedValue(
        mockKicksDefinition as any,
      );

      const result = await service.findOne(id);

      expect(kicksDefinitionsModel.findByPk).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockKicksDefinition);
    });

    it('should return null when kicks definition not found', async () => {
      const id = 999;
      kicksDefinitionsModel.findByPk.mockResolvedValue(null);

      const result = await service.findOne(id);

      expect(kicksDefinitionsModel.findByPk).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new kicks definition', async () => {
      const createDto = {
        kickName: 'Side Kick',
        technique: 'Yop Chagi',
        belt: 'yellow',
        beltColor: 'yellow',
        target: 'Side target',
        execution: ['Chamber leg', 'Kick to side', 'Retract'],
        keyPoints: ['Hip rotation', 'Heel strike'],
        commonMistakes: ['Poor chamber', 'No hip rotation'],
        applications: ['Breaking', 'Competition'],
      };

      kicksDefinitionsModel.create.mockResolvedValue(
        mockKicksDefinition as any,
      );

      const result = await service.create(createDto);

      expect(kicksDefinitionsModel.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockKicksDefinition);
    });

    it('should normalize array fields when creating', async () => {
      const createDto = {
        kickName: 'Roundhouse Kick',
        execution: 'Single step execution', // String instead of array
        keyPoints: ['Point 1', 'Point 2'], // Already array
        commonMistakes: 'Common mistake', // String instead of array
        applications: ['Application 1'], // Already array
      };

      kicksDefinitionsModel.create.mockResolvedValue(
        mockKicksDefinition as any,
      );

      await service.create(createDto);

      expect(kicksDefinitionsModel.create).toHaveBeenCalledWith({
        kickName: 'Roundhouse Kick',
        execution: ['Single step execution'], // Normalized to array
        keyPoints: ['Point 1', 'Point 2'], // Kept as array
        commonMistakes: ['Common mistake'], // Normalized to array
        applications: ['Application 1'], // Kept as array
      });
    });

    it('should remove undefined fields when creating', async () => {
      const createDto = {
        kickName: 'Test Kick',
        technique: undefined,
        belt: 'orange',
        target: undefined,
        execution: ['Step 1'],
      };

      kicksDefinitionsModel.create.mockResolvedValue(
        mockKicksDefinition as any,
      );

      await service.create(createDto);

      expect(kicksDefinitionsModel.create).toHaveBeenCalledWith({
        kickName: 'Test Kick',
        belt: 'orange',
        execution: ['Step 1'],
        // technique and target should be removed
      });
    });

    it('should handle null array fields', async () => {
      const createDto = {
        kickName: 'Null Test Kick',
        execution: null,
        keyPoints: null,
        commonMistakes: null,
        applications: null,
      };

      kicksDefinitionsModel.create.mockResolvedValue(
        mockKicksDefinition as any,
      );

      await service.create(createDto);

      expect(kicksDefinitionsModel.create).toHaveBeenCalledWith({
        kickName: 'Null Test Kick',
        execution: null,
        keyPoints: null,
        commonMistakes: null,
        applications: null,
      });
    });
  });

  describe('update', () => {
    it('should update a kicks definition successfully', async () => {
      const id = 1;
      const updateDto = {
        kickName: 'Updated Kick',
        technique: 'Updated Technique',
        execution: ['Updated step 1', 'Updated step 2'],
      };

      const updateResult = [1, [mockKicksDefinition]] as [number, any[]];
      kicksDefinitionsModel.update.mockResolvedValue(updateResult as any);

      const result = await service.update(id, updateDto);

      expect(kicksDefinitionsModel.update).toHaveBeenCalledWith(updateDto, {
        where: { id },
        returning: true,
      });
      expect(result).toEqual(updateResult);
    });

    it('should normalize payload when updating', async () => {
      const id = 1;
      const updateDto = {
        kickName: 'Updated Kick',
        execution: 'Single execution step', // String to be normalized
        keyPoints: undefined, // Should be removed
      };

      kicksDefinitionsModel.update.mockResolvedValue([
        1,
        [mockKicksDefinition],
      ] as any);

      await service.update(id, updateDto);

      expect(kicksDefinitionsModel.update).toHaveBeenCalledWith(
        {
          kickName: 'Updated Kick',
          execution: ['Single execution step'], // Normalized to array
          // keyPoints should be removed due to undefined
        },
        {
          where: { id },
          returning: true,
        },
      );
    });

    it('should return zero affected rows when kicks definition not found', async () => {
      const id = 999;
      const updateDto = { kickName: 'Updated Kick' };

      const updateResult = [0, []] as [number, any[]];
      kicksDefinitionsModel.update.mockResolvedValue(updateResult as any);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove kicks definition successfully', async () => {
      const id = 1;
      kicksDefinitionsModel.destroy.mockResolvedValue(1);

      const result = await service.remove(id);

      expect(kicksDefinitionsModel.destroy).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toBe(1);
    });

    it('should return zero when kicks definition not found', async () => {
      const id = 999;
      kicksDefinitionsModel.destroy.mockResolvedValue(0);

      const result = await service.remove(id);

      expect(kicksDefinitionsModel.destroy).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toBe(0);
    });
  });

  describe('normalizePayload private method', () => {
    it('should properly normalize different input types', () => {
      // Access private method for testing
      const normalizePayload = (service as any).normalizePayload.bind(service);

      const input = {
        kickName: 'Test Kick',
        execution: 'Single string',
        keyPoints: ['Already array'],
        commonMistakes: undefined,
        applications: null,
        extraField: 'should remain',
      };

      const result = normalizePayload(input);

      expect(result).toEqual({
        kickName: 'Test Kick',
        execution: ['Single string'], // Normalized to array
        keyPoints: ['Already array'], // Kept as array
        applications: null, // Null preserved
        extraField: 'should remain',
        // commonMistakes should be removed due to undefined
      });
    });

    it('should handle empty arrays', () => {
      const normalizePayload = (service as any).normalizePayload.bind(service);

      const input = {
        kickName: 'Test Kick',
        execution: [],
        keyPoints: [],
        commonMistakes: [],
        applications: [],
      };

      const result = normalizePayload(input);

      expect(result).toEqual({
        kickName: 'Test Kick',
        execution: [],
        keyPoints: [],
        commonMistakes: [],
        applications: [],
      });
    });

    it('should not modify non-array fields', () => {
      const normalizePayload = (service as any).normalizePayload.bind(service);

      const input = {
        kickName: 'Test Kick',
        belt: 'orange',
        technique: 'Test Technique',
        target: 'Test Target',
      };

      const result = normalizePayload(input);

      expect(result).toEqual(input);
    });
  });
});
