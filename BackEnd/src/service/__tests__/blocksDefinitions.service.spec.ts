import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { BlocksDefinitionsService } from '../blocksDefinitions.service';
import {
  blocksDefinitions,
  BlocksDefinitionsAttributes,
} from '../../models/blocksDefinitions';

describe('BlocksDefinitionsService', () => {
  let service: BlocksDefinitionsService;
  let blocksDefinitionsModel: jest.Mocked<typeof blocksDefinitions>;

  const mockBlocksDefinitionsModel = {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  const mockBlocksDefinition: BlocksDefinitionsAttributes = {
    id: 1,
    blockName: 'High Block',
    technique: 'Defensive',
    stance: 'Ready Stance',
    belt: 'white',
    beltColor: 'white',
    execution: ['Raise arm upward', 'Block incoming attack'],
    keyPoints: ['Keep elbow aligned', 'Maintain strong stance'],
    commonMistakes: ['Dropping guard', 'Poor timing'],
    applications: ['Self-defense', 'Form'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlocksDefinitionsService,
        {
          provide: getModelToken(blocksDefinitions),
          useValue: mockBlocksDefinitionsModel,
        },
      ],
    }).compile();

    service = module.get<BlocksDefinitionsService>(BlocksDefinitionsService);
    blocksDefinitionsModel = module.get(getModelToken(blocksDefinitions));

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all blocks definitions', async () => {
      const mockBlocks = [mockBlocksDefinition];
      blocksDefinitionsModel.findAll.mockResolvedValue(mockBlocks as any);

      const result = await service.findAll();

      expect(blocksDefinitionsModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockBlocks);
    });

    it('should return empty array when no blocks found', async () => {
      blocksDefinitionsModel.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a blocks definition by id', async () => {
      const id = 1;
      blocksDefinitionsModel.findByPk.mockResolvedValue(
        mockBlocksDefinition as any,
      );

      const result = await service.findOne(id);

      expect(blocksDefinitionsModel.findByPk).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockBlocksDefinition);
    });

    it('should return null when blocks definition not found', async () => {
      const id = 999;
      blocksDefinitionsModel.findByPk.mockResolvedValue(null);

      const result = await service.findOne(id);

      expect(blocksDefinitionsModel.findByPk).toHaveBeenCalledWith(id);
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new blocks definition', async () => {
      const createDto: BlocksDefinitionsAttributes = {
        blockName: 'Low Block',
        technique: 'Defensive',
        stance: 'Horse Stance',
        belt: 'yellow',
        beltColor: 'yellow',
        execution: ['Lower arm downward', 'Deflect low attacks'],
        keyPoints: ['Strong base', 'Quick execution'],
        commonMistakes: ['Weak stance', 'Slow reaction'],
        applications: ['Sparring', 'Self-defense'],
      };

      blocksDefinitionsModel.create.mockResolvedValue(
        mockBlocksDefinition as any,
      );

      const result = await service.create(createDto);

      expect(blocksDefinitionsModel.create).toHaveBeenCalledWith({
        blockName: 'Low Block',
        technique: 'Defensive',
        stance: 'Horse Stance',
        belt: 'yellow',
        beltColor: 'yellow',
        execution: ['Lower arm downward', 'Deflect low attacks'],
        keyPoints: ['Strong base', 'Quick execution'],
        commonMistakes: ['Weak stance', 'Slow reaction'],
        applications: ['Sparring', 'Self-defense'],
      });
      expect(result).toEqual(mockBlocksDefinition);
    });

    it('should handle string arrays from input', async () => {
      const createDto = {
        blockName: 'Middle Block',
        technique: 'Defensive',
        stance: 'Front Stance',
        belt: 'orange',
        beltColor: 'orange',
        execution: 'Block across body',
        keyPoints: 'Strong wrist',
        commonMistakes: 'Weak form',
        applications: 'Competition',
      } as any;

      blocksDefinitionsModel.create.mockResolvedValue(
        mockBlocksDefinition as any,
      );

      const result = await service.create(createDto);

      expect(blocksDefinitionsModel.create).toHaveBeenCalledWith({
        blockName: 'Middle Block',
        technique: 'Defensive',
        stance: 'Front Stance',
        belt: 'orange',
        beltColor: 'orange',
        execution: ['Block across body'],
        keyPoints: ['Strong wrist'],
        commonMistakes: ['Weak form'],
        applications: ['Competition'],
      });
      expect(result).toEqual(mockBlocksDefinition);
    });

    it('should handle JSON string arrays', async () => {
      const createDto = {
        blockName: 'Side Block',
        technique: 'Defensive',
        execution: '["Block to the side", "Maintain balance"]',
        keyPoints: '["Core strength", "Timing"]',
      } as any;

      blocksDefinitionsModel.create.mockResolvedValue(
        mockBlocksDefinition as any,
      );

      await service.create(createDto);

      expect(blocksDefinitionsModel.create).toHaveBeenCalledWith({
        blockName: 'Side Block',
        technique: 'Defensive',
        stance: undefined,
        belt: undefined,
        beltColor: undefined,
        execution: ['Block to the side', 'Maintain balance'],
        keyPoints: ['Core strength', 'Timing'],
        commonMistakes: [],
        applications: [],
      });
    });

    it('should handle multiline string inputs', async () => {
      const createDto = {
        blockName: 'Advanced Block',
        execution: 'Step 1: Prepare\nStep 2: Execute\nStep 3: Follow through',
        keyPoints: 'Point 1,Point 2,Point 3',
      } as any;

      blocksDefinitionsModel.create.mockResolvedValue(
        mockBlocksDefinition as any,
      );

      await service.create(createDto);

      expect(blocksDefinitionsModel.create).toHaveBeenCalledWith({
        blockName: 'Advanced Block',
        technique: undefined,
        stance: undefined,
        belt: undefined,
        beltColor: undefined,
        execution: [
          'Step 1: Prepare',
          'Step 2: Execute',
          'Step 3: Follow through',
        ],
        keyPoints: ['Point 1', 'Point 2', 'Point 3'],
        commonMistakes: [],
        applications: [],
      });
    });
  });

  describe('update', () => {
    it('should update a blocks definition successfully', async () => {
      const id = 1;
      const updateDto = {
        blockName: 'Updated Block',
        technique: 'Updated Technique',
        execution: ['Updated step 1', 'Updated step 2'],
      };

      const updateResult = [1, [mockBlocksDefinition]] as [
        number,
        blocksDefinitions[],
      ];
      blocksDefinitionsModel.update.mockResolvedValue(updateResult as any);

      const result = await service.update(id, updateDto);

      expect(blocksDefinitionsModel.update).toHaveBeenCalledWith(
        {
          blockName: 'Updated Block',
          technique: 'Updated Technique',
          execution: ['Updated step 1', 'Updated step 2'],
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
        blockName: 'Updated Block',
        technique: undefined,
        stance: 'New Stance',
        execution: undefined,
      };

      blocksDefinitionsModel.update.mockResolvedValue([
        1,
        [mockBlocksDefinition],
      ] as any);

      await service.update(id, updateDto);

      expect(blocksDefinitionsModel.update).toHaveBeenCalledWith(
        {
          blockName: 'Updated Block',
          stance: 'New Stance',
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
        blockName: 'Updated Block',
      } as any;

      blocksDefinitionsModel.update.mockResolvedValue([
        1,
        [mockBlocksDefinition],
      ] as any);

      await service.update(id, updateDto);

      expect(blocksDefinitionsModel.update).toHaveBeenCalledWith(
        {
          blockName: 'Updated Block',
        },
        {
          where: { id },
          returning: true,
        },
      );
    });

    it('should return zero affected rows when blocks definition not found', async () => {
      const id = 999;
      const updateDto = { blockName: 'Updated Block' };

      const updateResult = [0, []] as [number, blocksDefinitions[]];
      blocksDefinitionsModel.update.mockResolvedValue(updateResult as any);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove blocks definition successfully', async () => {
      const id = 1;
      blocksDefinitionsModel.destroy.mockResolvedValue(1);

      const result = await service.remove(id);

      expect(blocksDefinitionsModel.destroy).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toBe(1);
    });

    it('should return zero when blocks definition not found', async () => {
      const id = 999;
      blocksDefinitionsModel.destroy.mockResolvedValue(0);

      const result = await service.remove(id);

      expect(blocksDefinitionsModel.destroy).toHaveBeenCalledWith({
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
