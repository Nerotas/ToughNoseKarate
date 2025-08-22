import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { SelfDefenseDefinitionsService } from '../selfDefenseDefinitions.service';
import { selfDefenseDefinitions } from '../../models/selfDefenseDefinitions';

describe('SelfDefenseDefinitionsService', () => {
  let service: SelfDefenseDefinitionsService;
  let mockModel: any;

  const mockSelfDefenseDefinition = {
    id: 1,
    name: 'Bear Hug Defense',
    korean: '곰 포옹 방어',
    belt: '7th Gup',
    beltColor: '#FFA500',
    description: 'Defense against bear hug from behind',
    category: 'Grab Defense',
    difficulty: 'Intermediate',
    scenario: 'Attacker grabs from behind',
    technique: 'Bear hug escape',
    setup: ['Position attacker', 'Establish grip'],
    execution: ['Drop center of gravity', 'Strike and escape'],
    keyPoints: ['Stay calm', 'Use leverage'],
    commonMistakes: ['Panic', 'Wrong foot position'],
    applications: ['Street defense', 'Self protection'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockSelfDefenseDefinitionArray = [
    mockSelfDefenseDefinition,
    {
      ...mockSelfDefenseDefinition,
      id: 2,
      name: 'Wrist Grab Defense',
      korean: '손목 잡기 방어',
      scenario: 'Single wrist grab from front',
    },
  ];

  beforeEach(async () => {
    mockModel = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SelfDefenseDefinitionsService,
        {
          provide: getModelToken(selfDefenseDefinitions),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<SelfDefenseDefinitionsService>(
      SelfDefenseDefinitionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of self defense definitions', async () => {
      mockModel.findAll.mockResolvedValue(mockSelfDefenseDefinitionArray);

      const result = await service.findAll();

      expect(result).toEqual(mockSelfDefenseDefinitionArray);
      expect(mockModel.findAll).toHaveBeenCalledWith();
    });

    it('should return empty array when no definitions exist', async () => {
      mockModel.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockModel.findAll).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it('should return a single self defense definition', async () => {
      mockModel.findByPk.mockResolvedValue(mockSelfDefenseDefinition);

      const result = await service.findOne(1);

      expect(result).toEqual(mockSelfDefenseDefinition);
      expect(mockModel.findByPk).toHaveBeenCalledWith(1);
    });

    it('should return null when definition not found', async () => {
      mockModel.findByPk.mockResolvedValue(null);

      const result = await service.findOne(999);

      expect(result).toBeNull();
      expect(mockModel.findByPk).toHaveBeenCalledWith(999);
    });
  });

  describe('create', () => {
    it('should create a new self defense definition', async () => {
      const createDto = {
        name: 'New Self Defense',
        korean: '새로운 호신술',
        belt: '6th Gup',
        beltColor: '#00FF00',
        description: 'New self defense technique',
        category: 'Strike Defense',
        difficulty: 'Beginner',
        scenario: 'Frontal attack scenario',
        technique: 'Block and counter',
        setup: ['Setup step 1', 'Setup step 2'],
        execution: ['Execute step 1', 'Execute step 2'],
        keyPoints: ['Key point 1', 'Key point 2'],
        commonMistakes: ['Mistake 1', 'Mistake 2'],
        applications: ['Application 1', 'Application 2'],
      };

      const expectedResult = { ...createDto, id: 3 };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalledWith(createDto);
    });

    it('should normalize array fields correctly', async () => {
      const createDto = {
        name: 'Test Defense',
        korean: '테스트 방어',
        belt: '7th Gup',
        beltColor: '#FFA500',
        description: 'Test defense',
        category: 'Test Category',
        difficulty: 'Easy',
        scenario: 'Test scenario',
        technique: 'Test technique',
        setup: 'Single setup', // String instead of array
        execution: 'Single execution',
        keyPoints: 'Single key point',
        commonMistakes: 'Single mistake',
        applications: 'Single application',
      };

      const normalizedDto = {
        ...createDto,
        setup: ['Single setup'],
        execution: ['Single execution'],
        keyPoints: ['Single key point'],
        commonMistakes: ['Single mistake'],
        applications: ['Single application'],
      };

      const expectedResult = { ...normalizedDto, id: 4 };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalledWith(normalizedDto);
    });

    it('should handle null values in array fields', async () => {
      const createDto = {
        name: 'Test Defense',
        korean: '테스트 방어',
        belt: '7th Gup',
        beltColor: '#FFA500',
        description: 'Test defense',
        category: 'Test Category',
        difficulty: 'Easy',
        scenario: 'Test scenario',
        technique: 'Test technique',
        setup: null,
        execution: undefined,
        keyPoints: ['Valid key point'],
        commonMistakes: null,
        applications: undefined,
      };

      const normalizedDto = {
        name: 'Test Defense',
        korean: '테스트 방어',
        belt: '7th Gup',
        beltColor: '#FFA500',
        description: 'Test defense',
        category: 'Test Category',
        difficulty: 'Easy',
        scenario: 'Test scenario',
        technique: 'Test technique',
        setup: null,
        keyPoints: ['Valid key point'],
        commonMistakes: null,
      };

      const expectedResult = { ...normalizedDto, id: 5 };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalledWith(normalizedDto);
    });
  });

  describe('update', () => {
    it('should update a self defense definition', async () => {
      const updateDto = {
        name: 'Updated Defense',
        setup: ['Updated setup'],
        execution: ['Updated execution'],
        keyPoints: ['Updated key point'],
      };

      const expectedResult: [number, selfDefenseDefinitions[]] = [
        1,
        [
          { ...mockSelfDefenseDefinition, ...updateDto },
        ] as unknown as selfDefenseDefinitions[],
      ];
      mockModel.update.mockResolvedValue(expectedResult);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.update).toHaveBeenCalledWith(updateDto, {
        where: { id: 1 },
        returning: true,
      });
    });

    it('should normalize payload before updating', async () => {
      const updateDto = {
        setup: 'Single setup string',
        execution: 'Single execution string',
        keyPoints: 'Single key point string',
      };

      const normalizedDto = {
        setup: ['Single setup string'],
        execution: ['Single execution string'],
        keyPoints: ['Single key point string'],
      };

      const expectedResult: [number, selfDefenseDefinitions[]] = [
        1,
        [mockSelfDefenseDefinition] as unknown as selfDefenseDefinitions[],
      ];
      mockModel.update.mockResolvedValue(expectedResult);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.update).toHaveBeenCalledWith(normalizedDto, {
        where: { id: 1 },
        returning: true,
      });
    });

    it('should return zero affected rows when definition not found', async () => {
      const updateDto = { name: 'Updated Defense' };
      const expectedResult: [number, selfDefenseDefinitions[]] = [0, []];
      mockModel.update.mockResolvedValue(expectedResult);

      const result = await service.update(999, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.update).toHaveBeenCalledWith(updateDto, {
        where: { id: 999 },
        returning: true,
      });
    });
  });

  describe('remove', () => {
    it('should remove a self defense definition', async () => {
      mockModel.destroy.mockResolvedValue(1);

      const result = await service.remove(1);

      expect(result).toBe(1);
      expect(mockModel.destroy).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return zero when definition not found', async () => {
      mockModel.destroy.mockResolvedValue(0);

      const result = await service.remove(999);

      expect(result).toBe(0);
      expect(mockModel.destroy).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('normalizePayload (private method testing through public methods)', () => {
    it('should remove undefined fields', async () => {
      const createDto = {
        name: 'Test Defense',
        korean: '테스트 방어',
        belt: '7th Gup',
        beltColor: '#FFA500',
        description: 'Test defense',
        category: 'Test Category',
        difficulty: 'Easy',
        scenario: 'Test scenario',
        technique: 'Test technique',
        setup: ['Setup step'],
        execution: undefined,
        keyPoints: null,
        commonMistakes: ['Mistake'],
        applications: ['Application'],
        extraField: undefined,
      };

      const expectedNormalizedDto = {
        name: 'Test Defense',
        korean: '테스트 방어',
        belt: '7th Gup',
        beltColor: '#FFA500',
        description: 'Test defense',
        category: 'Test Category',
        difficulty: 'Easy',
        scenario: 'Test scenario',
        technique: 'Test technique',
        setup: ['Setup step'],
        keyPoints: null,
        commonMistakes: ['Mistake'],
        applications: ['Application'],
      };

      mockModel.create.mockResolvedValue({ ...expectedNormalizedDto, id: 6 });

      await service.create(createDto);

      expect(mockModel.create).toHaveBeenCalledWith(expectedNormalizedDto);
    });

    it('should preserve already-array fields', async () => {
      const createDto = {
        name: 'Test Defense',
        korean: '테스트 방어',
        belt: '7th Gup',
        beltColor: '#FFA500',
        description: 'Test defense',
        category: 'Test Category',
        difficulty: 'Easy',
        scenario: 'Test scenario',
        technique: 'Test technique',
        setup: ['Setup 1', 'Setup 2'],
        execution: ['Execute 1', 'Execute 2'],
        keyPoints: ['Point 1', 'Point 2'],
        commonMistakes: ['Mistake 1', 'Mistake 2'],
        applications: ['App 1', 'App 2'],
      };

      mockModel.create.mockResolvedValue({ ...createDto, id: 7 });

      await service.create(createDto);

      expect(mockModel.create).toHaveBeenCalledWith(createDto);
    });

    it('should handle all array fields defined in the service', async () => {
      const createDto = {
        name: 'Complete Test',
        korean: '완전한 테스트',
        belt: '7th Gup',
        beltColor: '#FFA500',
        description: 'Complete test',
        category: 'Complete Category',
        difficulty: 'Medium',
        scenario: 'Complete scenario',
        technique: 'Complete technique',
        setup: 'Single setup',
        execution: 'Single execution',
        keyPoints: 'Single key point',
        commonMistakes: 'Single mistake',
        applications: 'Single application',
      };

      const normalizedDto = {
        ...createDto,
        setup: ['Single setup'],
        execution: ['Single execution'],
        keyPoints: ['Single key point'],
        commonMistakes: ['Single mistake'],
        applications: ['Single application'],
      };

      mockModel.create.mockResolvedValue({ ...normalizedDto, id: 8 });

      await service.create(createDto);

      expect(mockModel.create).toHaveBeenCalledWith(normalizedDto);
    });
  });
});
