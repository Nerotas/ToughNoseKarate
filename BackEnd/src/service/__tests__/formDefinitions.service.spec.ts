import { Test, TestingModule } from '@nestjs/testing';
import { FormDefinitionsService } from '../formDefinitions.service';
import { FormDefinitions } from '../../models/formDefinitions';

// Mock the FormDefinitions model
jest.mock('../../models/formDefinitions');

const MockedFormDefinitions = FormDefinitions as jest.Mocked<
  typeof FormDefinitions
>;

describe('FormDefinitionsService', () => {
  let service: FormDefinitionsService;

  const mockFormDefinition = {
    id: 1,
    name: 'Test Form',
    korean: 'Test Korean',
    beltRank: 'white',
    difficultyLevel: 1,
    keyPoints: ['point1', 'point2'],
    description: 'Test description',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormDefinitionsService],
    }).compile();

    service = module.get<FormDefinitionsService>(FormDefinitionsService);

    // Reset all mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('normalizePayload', () => {
    it('should normalize keyPoints to array', () => {
      const payload = { name: 'Test', keyPoints: 'single point' };
      const result = (service as any).normalizePayload(payload);

      expect(result.keyPoints).toEqual(['single point']);
    });

    it('should keep arrays as arrays for keyPoints', () => {
      const payload = { name: 'Test', keyPoints: ['point1', 'point2'] };
      const result = (service as any).normalizePayload(payload);

      expect(result.keyPoints).toEqual(['point1', 'point2']);
    });

    it('should remove undefined fields', () => {
      const payload = {
        name: 'Test',
        undefined_field: undefined,
        valid_field: 'value',
      };
      const result = (service as any).normalizePayload(payload);

      expect(result).toEqual({ name: 'Test', valid_field: 'value' });
      expect(result.undefined_field).toBeUndefined();
    });

    it('should handle null keyPoints', () => {
      const payload = { name: 'Test', keyPoints: null };
      const result = (service as any).normalizePayload(payload);

      expect(result.keyPoints).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a form definition successfully', async () => {
      const createDto = {
        name: 'Test Form',
        korean: 'Test Korean',
        beltRank: 'white',
        keyPoints: 'single point',
      };

      MockedFormDefinitions.create.mockResolvedValue(mockFormDefinition as any);

      const result = await service.create(createDto);

      expect(MockedFormDefinitions.create).toHaveBeenCalledWith({
        name: 'Test Form',
        korean: 'Test Korean',
        beltRank: 'white',
        keyPoints: ['single point'],
      });
      expect(result).toEqual(mockFormDefinition);
    });

    it('should handle creation with undefined fields', async () => {
      const createDto = {
        name: 'Test Form',
        undefined_field: undefined,
      };

      MockedFormDefinitions.create.mockResolvedValue(mockFormDefinition as any);

      await service.create(createDto);

      expect(MockedFormDefinitions.create).toHaveBeenCalledWith({
        name: 'Test Form',
      });
    });
  });

  describe('findAll', () => {
    it('should return all form definitions ordered by difficulty level', async () => {
      const formDefinitions = [mockFormDefinition];
      MockedFormDefinitions.findAll.mockResolvedValue(formDefinitions as any);

      const result = await service.findAll();

      expect(MockedFormDefinitions.findAll).toHaveBeenCalledWith({
        order: [['difficultyLevel', 'ASC']],
      });
      expect(result).toEqual(formDefinitions);
    });
  });

  describe('findOne', () => {
    it('should return form definition by id', async () => {
      MockedFormDefinitions.findOne.mockResolvedValue(
        mockFormDefinition as any,
      );

      const result = await service.findOne(1);

      expect(MockedFormDefinitions.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockFormDefinition);
    });

    it('should return null when form definition not found', async () => {
      MockedFormDefinitions.findOne.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
    });
  });

  describe('findByBeltRank', () => {
    it('should return form definitions by belt rank ordered by difficulty', async () => {
      const formDefinitions = [mockFormDefinition];
      MockedFormDefinitions.findAll.mockResolvedValue(formDefinitions as any);

      const result = await service.findByBeltRank('white');

      expect(MockedFormDefinitions.findAll).toHaveBeenCalledWith({
        where: { beltRank: 'white' },
        order: [['difficultyLevel', 'ASC']],
      });
      expect(result).toEqual(formDefinitions);
    });
  });

  describe('update', () => {
    it('should update form definition successfully', async () => {
      const updateDto = { name: 'Updated Form', keyPoints: 'updated point' };
      MockedFormDefinitions.update.mockResolvedValue([1] as any);
      MockedFormDefinitions.findOne.mockResolvedValue(
        mockFormDefinition as any,
      );

      const result = await service.update(1, updateDto);

      expect(MockedFormDefinitions.update).toHaveBeenCalledWith(
        { name: 'Updated Form', keyPoints: ['updated point'] },
        { where: { id: 1 } },
      );
      expect(result).toEqual(mockFormDefinition);
    });

    it('should return null when no rows affected', async () => {
      const updateDto = { name: 'Updated Form' };
      MockedFormDefinitions.update.mockResolvedValue([0] as any);

      const result = await service.update(999, updateDto);

      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove form definition successfully', async () => {
      MockedFormDefinitions.destroy.mockResolvedValue(1);

      const result = await service.remove(1);

      expect(MockedFormDefinitions.destroy).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toBe(true);
    });

    it('should return false when no rows affected', async () => {
      MockedFormDefinitions.destroy.mockResolvedValue(0);

      const result = await service.remove(999);

      expect(result).toBe(false);
    });
  });

  describe('bulkCreate', () => {
    it('should bulk create form definitions successfully', async () => {
      const formDefinitions = [
        { name: 'Form 1', keyPoints: 'point1' },
        { name: 'Form 2', keyPoints: ['point2', 'point3'] },
      ];
      const expectedNormalized = [
        { name: 'Form 1', keyPoints: ['point1'] },
        { name: 'Form 2', keyPoints: ['point2', 'point3'] },
      ];

      MockedFormDefinitions.bulkCreate.mockResolvedValue([
        mockFormDefinition,
      ] as any);

      const result = await service.bulkCreate(formDefinitions);

      expect(MockedFormDefinitions.bulkCreate).toHaveBeenCalledWith(
        expectedNormalized,
      );
      expect(result).toEqual([mockFormDefinition]);
    });

    it('should handle empty array', async () => {
      MockedFormDefinitions.bulkCreate.mockResolvedValue([]);

      const result = await service.bulkCreate([]);

      expect(MockedFormDefinitions.bulkCreate).toHaveBeenCalledWith([]);
      expect(result).toEqual([]);
    });
  });
});
