import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { PunchesDefinitionsService } from '../punchesDefinitions.service';
import {
  punchesDefinitions,
  PunchesDefinitionsAttributes,
} from '../../models/punchesDefinitions';

describe('PunchesDefinitionsService', () => {
  let service: PunchesDefinitionsService;
  let punchesDefinitionsModel: jest.Mocked<typeof punchesDefinitions>;

  const mockPunchesDefinitionsModel = {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockPunchesDefinition: PunchesDefinitionsAttributes = {
    id: 1,
    name: 'Jab Punch',
    korean: 'Jab Ji Ru Gi',
    description: 'Quick straight punch',
    belt: 'white',
    beltColor: 'white',
    target: 'Face, solar plexus',
    execution: ['Extend arm straight forward'],
    keyPoints: ['Keep elbow close', 'Snap back quickly'],
    commonMistakes: ['Telegraphing', 'Poor form'],
    applications: ['Self-defense', 'Sparring'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PunchesDefinitionsService,
        {
          provide: getModelToken(punchesDefinitions),
          useValue: mockPunchesDefinitionsModel,
        },
      ],
    }).compile();

    service = module.get<PunchesDefinitionsService>(PunchesDefinitionsService);
    punchesDefinitionsModel = module.get(getModelToken(punchesDefinitions));

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all punches definitions', async () => {
      const mockPunches = [mockPunchesDefinition];
      punchesDefinitionsModel.findAll.mockResolvedValue(mockPunches as any);

      const result = await service.findAll();

      expect(punchesDefinitionsModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPunches);
    });

    it('should return empty array when no punches found', async () => {
      punchesDefinitionsModel.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a punches definition by id', async () => {
      const id = 1;
      punchesDefinitionsModel.findByPk.mockResolvedValue(
        mockPunchesDefinition as any,
      );

      const result = await service.findOne(id);

      expect(punchesDefinitionsModel.findByPk).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockPunchesDefinition);
    });

    it('should return null when punches definition not found', async () => {
      const id = 999;
      punchesDefinitionsModel.findByPk.mockResolvedValue(null);

      const result = await service.findOne(id);

      expect(punchesDefinitionsModel.findByPk).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new punches definition', async () => {
      const createDto: PunchesDefinitionsAttributes = {
        name: 'Cross Punch',
        korean: 'Cross Ji Ru Gi',
        description: 'Power punch from rear hand',
        belt: 'yellow',
        beltColor: 'yellow',
        target: 'Body, head',
        execution: ['Rotate hips and shoulders'],
        keyPoints: ['Use whole body', 'Follow through'],
        commonMistakes: ['No hip rotation', 'Overextension'],
        applications: ['Sparring', 'Self-defense'],
      };

      punchesDefinitionsModel.create.mockResolvedValue(
        mockPunchesDefinition as any,
      );

      const result = await service.create(createDto);

      expect(punchesDefinitionsModel.create).toHaveBeenCalledWith({
        name: 'Cross Punch',
        korean: 'Cross Ji Ru Gi',
        description: 'Power punch from rear hand',
        belt: 'yellow',
        beltColor: 'yellow',
        target: 'Body, head',
        execution: ['Rotate hips and shoulders'],
        keyPoints: ['Use whole body', 'Follow through'],
        commonMistakes: ['No hip rotation', 'Overextension'],
        applications: ['Sparring', 'Self-defense'],
      });
      expect(result).toEqual(mockPunchesDefinition);
    });

    it('should handle string arrays from input', async () => {
      const createDto = {
        name: 'Hook Punch',
        korean: 'Hook Ji Ru Gi',
        description: 'Circular punch',
        belt: 'orange',
        beltColor: 'orange',
        keyPoints: 'Circular motion',
        commonMistakes: 'Wide arc',
        applications: 'Close combat',
        target: 'Side of head',
        execution: 'Pivot and hook',
      } as any;

      punchesDefinitionsModel.create.mockResolvedValue(
        mockPunchesDefinition as any,
      );

      const result = await service.create(createDto);

      expect(punchesDefinitionsModel.create).toHaveBeenCalledWith({
        name: 'Hook Punch',
        korean: 'Hook Ji Ru Gi',
        description: 'Circular punch',
        belt: 'orange',
        beltColor: 'orange',
        keyPoints: ['Circular motion'],
        commonMistakes: ['Wide arc'],
        applications: ['Close combat'],
        target: 'Side of head',
        execution: 'Pivot and hook',
      });
      expect(result).toEqual(mockPunchesDefinition);
    });

    it('should handle JSON string arrays', async () => {
      const createDto = {
        name: 'Upper Cut',
        keyPoints: '["Bend knees", "Uppercut motion"]',
        commonMistakes: '["Stand too tall", "No leg drive"]',
      } as any;

      punchesDefinitionsModel.create.mockResolvedValue(
        mockPunchesDefinition as any,
      );

      await service.create(createDto);

      expect(punchesDefinitionsModel.create).toHaveBeenCalledWith({
        name: 'Upper Cut',
        korean: undefined,
        description: undefined,
        belt: undefined,
        beltColor: undefined,
        keyPoints: ['Bend knees', 'Uppercut motion'],
        commonMistakes: ['Stand too tall', 'No leg drive'],
        applications: [],
        target: null,
        execution: null,
      });
    });

    it('should handle multiline string inputs', async () => {
      const createDto = {
        name: 'Advanced Punch',
        keyPoints: 'Point 1\nPoint 2\nPoint 3',
        commonMistakes: 'Mistake 1,Mistake 2,Mistake 3',
      } as any;

      punchesDefinitionsModel.create.mockResolvedValue(
        mockPunchesDefinition as any,
      );

      await service.create(createDto);

      expect(punchesDefinitionsModel.create).toHaveBeenCalledWith({
        name: 'Advanced Punch',
        korean: undefined,
        description: undefined,
        belt: undefined,
        beltColor: undefined,
        keyPoints: ['Point 1', 'Point 2', 'Point 3'],
        commonMistakes: ['Mistake 1', 'Mistake 2', 'Mistake 3'],
        applications: [],
        target: null,
        execution: null,
      });
    });

    it('should handle targetAreas as fallback for target', async () => {
      const createDto = {
        name: 'Test Punch',
        targetAreas: 'Multiple areas',
      } as any;

      punchesDefinitionsModel.create.mockResolvedValue(
        mockPunchesDefinition as any,
      );

      await service.create(createDto);

      expect(punchesDefinitionsModel.create).toHaveBeenCalledWith({
        name: 'Test Punch',
        korean: undefined,
        description: undefined,
        belt: undefined,
        beltColor: undefined,
        keyPoints: [],
        commonMistakes: [],
        applications: [],
        target: 'Multiple areas',
        execution: null,
      });
    });
  });

  describe('update', () => {
    it('should update a punches definition successfully', async () => {
      const id = 1;
      const updateDto = {
        name: 'Updated Punch',
        korean: 'Updated Korean',
        keyPoints: ['Updated point 1', 'Updated point 2'],
      };

      const updateResult = [1, [mockPunchesDefinition]] as [number, any[]];
      punchesDefinitionsModel.update.mockResolvedValue(updateResult as any);

      const result = await service.update(id, updateDto);

      expect(punchesDefinitionsModel.update).toHaveBeenCalledWith(
        {
          name: 'Updated Punch',
          korean: 'Updated Korean',
          keyPoints: ['Updated point 1', 'Updated point 2'],
        },
        {
          where: { id },
          returning: true,
        },
      );
      expect(result).toEqual(updateResult);
    });

    it('should filter out undefined values when updating', async () => {
      const id = 1;
      const updateDto = {
        name: 'Updated Punch',
        korean: undefined,
        description: 'New description',
        keyPoints: undefined,
      };

      punchesDefinitionsModel.update.mockResolvedValue([
        1,
        [mockPunchesDefinition],
      ] as any);

      await service.update(id, updateDto);

      expect(punchesDefinitionsModel.update).toHaveBeenCalledWith(
        {
          name: 'Updated Punch',
          description: 'New description',
        },
        {
          where: { id },
          returning: true,
        },
      );
    });

    it('should ignore id field in update data', async () => {
      const id = 1;
      const updateDto = {
        id: 999, // This should be ignored
        name: 'Updated Punch',
      } as any;

      punchesDefinitionsModel.update.mockResolvedValue([
        1,
        [mockPunchesDefinition],
      ] as any);

      await service.update(id, updateDto);

      expect(punchesDefinitionsModel.update).toHaveBeenCalledWith(
        {
          name: 'Updated Punch',
        },
        {
          where: { id },
          returning: true,
        },
      );
    });

    it('should return zero affected rows when punches definition not found', async () => {
      const id = 999;
      const updateDto = { name: 'Updated Punch' };

      const updateResult = [0, []] as [number, any[]];
      punchesDefinitionsModel.update.mockResolvedValue(updateResult as any);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove punches definition successfully', async () => {
      const id = 1;
      punchesDefinitionsModel.destroy.mockResolvedValue(1);

      const result = await service.remove(id);

      expect(punchesDefinitionsModel.destroy).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toBe(1);
    });

    it('should return zero when punches definition not found', async () => {
      const id = 999;
      punchesDefinitionsModel.destroy.mockResolvedValue(0);

      const result = await service.remove(id);

      expect(punchesDefinitionsModel.destroy).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toBe(0);
    });
  });

  describe('private helper methods', () => {
    it('should handle toStringArray with various inputs', () => {
      // Access private method for testing
      const toStringArray = (service as any).toStringArray.bind(service);

      // Test undefined/null
      expect(toStringArray(undefined)).toBeUndefined();
      expect(toStringArray(null)).toBeUndefined();

      // Test array input
      expect(toStringArray(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
      expect(toStringArray([1, 2, 3])).toEqual(['1', '2', '3']);

      // Test JSON string
      expect(toStringArray('["x", "y", "z"]')).toEqual(['x', 'y', 'z']);

      // Test comma-separated string
      expect(toStringArray('a,b,c')).toEqual(['a', 'b', 'c']);

      // Test newline-separated string
      expect(toStringArray('a\nb\nc')).toEqual(['a', 'b', 'c']);

      // Test mixed separators with whitespace
      expect(toStringArray('a, b\n c ,d')).toEqual(['a', 'b', 'c', 'd']);

      // Test empty string
      expect(toStringArray('')).toBeUndefined();

      // Test string with only whitespace/separators
      expect(toStringArray(',\n, ')).toBeUndefined();
    });

    it('should handle toStringOrUndefined with various inputs', () => {
      const toStringOrUndefined = (service as any).toStringOrUndefined.bind(
        service,
      );

      // Test undefined/null
      expect(toStringOrUndefined(undefined)).toBeUndefined();
      expect(toStringOrUndefined(null)).toBeUndefined();

      // Test string input
      expect(toStringOrUndefined('test string')).toBe('test string');
      expect(toStringOrUndefined('  trimmed  ')).toBe('trimmed');

      // Test array input
      expect(toStringOrUndefined(['a', 'b', 'c'])).toBe('a, b, c');
      expect(toStringOrUndefined(['one'])).toBe('one');
      expect(toStringOrUndefined([])).toBe('');

      // Test array with empty strings
      expect(toStringOrUndefined(['a', '', 'c'])).toBe('a, c');
    });

    it('should handle clean method removing undefined values', () => {
      // Access private method for testing
      const clean = (service as any).clean.bind(service);

      const input = {
        a: 'defined',
        b: undefined,
        c: null,
        d: 0,
        e: false,
        f: '',
      };

      const result = clean(input);

      expect(result).toEqual({
        a: 'defined',
        c: null,
        d: 0,
        e: false,
        f: '',
      });
      expect(result).not.toHaveProperty('b');
    });
  });
});
