import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { StanceDefinitionsService } from '../stanceDefinitions.service';
import { stanceDefinitions } from '../../models/stanceDefinitions';

describe('StanceDefinitionsService', () => {
  let service: StanceDefinitionsService;
  let mockModel: any;

  const mockStanceDefinition = {
    id: 1,
    name: 'Front Stance',
    korean: '앞굽이',
    belt: '9th Gup',
    beltColor: '#FFFFFF',
    description: 'Basic front stance for stability',
    keyPoints: ['Keep back straight', 'Weight distribution'],
    commonMistakes: ['Leaning forward', 'Poor balance'],
    applications: ['Basic techniques', 'Power generation'],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockStanceDefinitionArray = [
    mockStanceDefinition,
    {
      ...mockStanceDefinition,
      id: 2,
      name: 'Horse Stance',
      korean: '말타기자세',
      description: 'Wide stance for leg strengthening',
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
        StanceDefinitionsService,
        {
          provide: getModelToken(stanceDefinitions),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<StanceDefinitionsService>(StanceDefinitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of stance definitions', async () => {
      mockModel.findAll.mockResolvedValue(mockStanceDefinitionArray);

      const result = await service.findAll();

      expect(result).toEqual(mockStanceDefinitionArray);
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
    it('should return a single stance definition', async () => {
      mockModel.findByPk.mockResolvedValue(mockStanceDefinition);

      const result = await service.findOne(1);

      expect(result).toEqual(mockStanceDefinition);
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
    it('should create a new stance definition', async () => {
      const createDto = {
        name: 'Back Stance',
        korean: '뒷굽이',
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Defensive stance with weight on back leg',
        keyPoints: ['Light front foot', 'Mobile stance'],
        commonMistakes: ['Too much weight forward', 'Rigid stance'],
        applications: ['Defensive techniques', 'Quick escapes'],
      };

      const expectedResult = { ...createDto, id: 3 };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalledWith(createDto);
    });

    it('should normalize array fields correctly', async () => {
      const createDto = {
        name: 'Test Stance',
        korean: '테스트 자세',
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test stance',
        keyPoints: 'Single key point', // String instead of array
        commonMistakes: 'Single mistake',
        applications: 'Single application',
      };

      const normalizedDto = {
        ...createDto,
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
        name: 'Test Stance',
        korean: '테스트 자세',
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test stance',
        keyPoints: null,
        commonMistakes: undefined,
        applications: ['Valid application'],
      };

      const normalizedDto = {
        name: 'Test Stance',
        korean: '테스트 자세',
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test stance',
        keyPoints: null,
        applications: ['Valid application'],
      };

      const expectedResult = { ...normalizedDto, id: 5 };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalledWith(normalizedDto);
    });
  });

  describe('update', () => {
    it('should update a stance definition', async () => {
      const updateDto = {
        name: 'Updated Stance',
        keyPoints: ['Updated key point'],
        commonMistakes: ['Updated mistake'],
      };

      const expectedResult: [number, stanceDefinitions[]] = [
        1,
        [
          { ...mockStanceDefinition, ...updateDto },
        ] as unknown as stanceDefinitions[],
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
        keyPoints: 'Single key point string',
        commonMistakes: 'Single mistake string',
        applications: 'Single application string',
      };

      const normalizedDto = {
        keyPoints: ['Single key point string'],
        commonMistakes: ['Single mistake string'],
        applications: ['Single application string'],
      };

      const expectedResult: [number, stanceDefinitions[]] = [
        1,
        [mockStanceDefinition] as unknown as stanceDefinitions[],
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
      const updateDto = { name: 'Updated Stance' };
      const expectedResult: [number, stanceDefinitions[]] = [0, []];
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
    it('should remove a stance definition', async () => {
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
        name: 'Test Stance',
        korean: '테스트 자세',
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test stance',
        keyPoints: ['Key point'],
        commonMistakes: undefined,
        applications: null,
        extraField: undefined,
      };

      const expectedNormalizedDto = {
        name: 'Test Stance',
        korean: '테스트 자세',
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test stance',
        keyPoints: ['Key point'],
        applications: null,
      };

      mockModel.create.mockResolvedValue({ ...expectedNormalizedDto, id: 6 });

      await service.create(createDto);

      expect(mockModel.create).toHaveBeenCalledWith(expectedNormalizedDto);
    });

    it('should preserve already-array fields', async () => {
      const createDto = {
        name: 'Test Stance',
        korean: '테스트 자세',
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Test stance',
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
        belt: '8th Gup',
        beltColor: '#FFFF00',
        description: 'Complete test',
        keyPoints: 'Single key point',
        commonMistakes: 'Single mistake',
        applications: 'Single application',
      };

      const normalizedDto = {
        ...createDto,
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
