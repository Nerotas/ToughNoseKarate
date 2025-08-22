import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { OneStepsDefinitionsService } from '../oneStepsDefinitions.service';
import { oneStepsDefinitions } from '../../models/oneStepsDefinitions';

describe('OneStepsDefinitionsService', () => {
  let service: OneStepsDefinitionsService;
  let mockModel: any;

  const mockOneStepsDefinition = {
    id: 1,
    name: 'Straight Punch Defense',
    korean: '직권 방어',
    belt: '8th Gup',
    beltColor: '#FFFF00',
    description: 'Defense against a straight punch',
    attack: 'Straight punch to the face',
    defense: ['Block high', 'Counter punch'],
    keyPoints: ['Maintain balance', 'Quick reaction'],
    commonMistakes: ['Poor stance', 'Slow response'],
    applications: ['Street defense', 'Competition'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOneStepsDefinitionArray = [
    mockOneStepsDefinition,
    {
      ...mockOneStepsDefinition,
      id: 2,
      name: 'Hook Defense',
      korean: '훅 방어',
      attack: 'Hook punch',
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
        OneStepsDefinitionsService,
        {
          provide: getModelToken(oneStepsDefinitions),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<OneStepsDefinitionsService>(
      OneStepsDefinitionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of one steps definitions', async () => {
      mockModel.findAll.mockResolvedValue(mockOneStepsDefinitionArray);

      const result = await service.findAll();

      expect(result).toEqual(mockOneStepsDefinitionArray);
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
    it('should return a single one steps definition', async () => {
      mockModel.findByPk.mockResolvedValue(mockOneStepsDefinition);

      const result = await service.findOne(1);

      expect(result).toEqual(mockOneStepsDefinition);
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
    it('should create a new one steps definition', async () => {
      const createDto = {
        name: 'New Defense',
        korean: '새로운 방어',
        belt: '9th Gup',
        beltColor: '#FFFFFF',
        description: 'New defense technique',
        attack: 'New attack',
        defense: ['New defense move'],
        keyPoints: ['New key point'],
        commonMistakes: ['New mistake'],
        applications: ['New application'],
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
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test defense',
        attack: 'Test attack',
        defense: 'Single defense', // String instead of array
        keyPoints: 'Single key point',
        commonMistakes: 'Single mistake',
        applications: 'Single application',
      };

      const normalizedDto = {
        ...createDto,
        defense: ['Single defense'],
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
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test defense',
        attack: 'Test attack',
        defense: null,
        keyPoints: undefined,
        commonMistakes: ['Valid mistake'],
        applications: null,
      };

      const normalizedDto = {
        name: 'Test Defense',
        korean: '테스트 방어',
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test defense',
        attack: 'Test attack',
        defense: null,
        commonMistakes: ['Valid mistake'],
        applications: null,
      };

      const expectedResult = { ...normalizedDto, id: 5 };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalledWith(normalizedDto);
    });
  });

  describe('update', () => {
    it('should update a one steps definition', async () => {
      const updateDto = {
        name: 'Updated Defense',
        defense: ['Updated defense move'],
        keyPoints: ['Updated key point'],
      };

      const expectedResult: [number, oneStepsDefinitions[]] = [
        1,
        [{ ...mockOneStepsDefinition, ...updateDto }] as oneStepsDefinitions[],
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
        defense: 'Single defense string',
        keyPoints: 'Single key point string',
      };

      const normalizedDto = {
        defense: ['Single defense string'],
        keyPoints: ['Single key point string'],
      };

      const expectedResult: [number, oneStepsDefinitions[]] = [
        1,
        [mockOneStepsDefinition] as oneStepsDefinitions[],
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
      const expectedResult: [number, oneStepsDefinitions[]] = [0, []];
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
    it('should remove a one steps definition', async () => {
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
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test defense',
        attack: 'Test attack',
        defense: ['Defense move'],
        keyPoints: undefined,
        commonMistakes: null,
        applications: ['Application'],
        extraField: undefined,
      };

      const expectedNormalizedDto = {
        name: 'Test Defense',
        korean: '테스트 방어',
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test defense',
        attack: 'Test attack',
        defense: ['Defense move'],
        commonMistakes: null,
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
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test defense',
        attack: 'Test attack',
        defense: ['Defense 1', 'Defense 2'],
        keyPoints: ['Point 1', 'Point 2'],
        commonMistakes: ['Mistake 1', 'Mistake 2'],
        applications: ['App 1', 'App 2'],
      };

      mockModel.create.mockResolvedValue({ ...createDto, id: 7 });

      await service.create(createDto);

      expect(mockModel.create).toHaveBeenCalledWith(createDto);
    });
  });
});
