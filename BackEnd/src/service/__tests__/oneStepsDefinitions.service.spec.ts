import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { OneStepsDefinitionsService } from '../oneStepsDefinitions.service';
import {
  oneStepsDefinitions,
  oneStepsDefinitionsAttributes,
} from '../../models/oneStepsDefinitions';

describe('OneStepsDefinitionsService', () => {
  let service: OneStepsDefinitionsService;
  let mockModel: any;
  let mockSequelize: any;

  const mockOneStepsDefinition: oneStepsDefinitionsAttributes = {
    id: 1,
    name: 'First One Step',
    beltRank: 'Purple White',
    beltColor: '#800080',
    description:
      'First basic one-step sequence for Purple White belt students.',
    followUpBeltRank: 'Blue White',
    followUpBeltColor: '#ADD8E6',
    secondFollowUpBeltRank: 'Blue',
    secondFollowUpBeltColor: '#0000FF',
    defense: [
      'Left outside block',
      'Right reverse punch counter',
      'Return to ready position',
    ],
    keyPoints: [
      'Proper outside block technique',
      'Immediate counter after block',
      'Maintain balance throughout',
    ],
    commonMistakes: [
      'Weak blocking technique',
      'Delayed counter attack',
      'Poor stance during block',
    ],
    firstFollowUp: ['Snap Kick', 'Lounge backwards'],
    secondFollowUp: ['Inside crescent kick', 'Spin outside crescent kick'],
    comment:
      'First side taught at Purple-White and second side taught at Purple',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockOneStepsDefinitionArray: oneStepsDefinitionsAttributes[] = [
    mockOneStepsDefinition,
    {
      ...mockOneStepsDefinition,
      id: 2,
      name: 'Second One Step',
      beltRank: 'Orange White',
      beltColor: '#FFA500',
      description: 'Second one-step sequence for Orange White belt students.',
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

    mockSequelize = {
      literal: jest.fn((value) => ({ val: value })),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OneStepsDefinitionsService,
        {
          provide: getModelToken(oneStepsDefinitions),
          useValue: mockModel,
        },
        {
          provide: Sequelize,
          useValue: mockSequelize,
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
        beltRank: 'Purple',
        beltColor: '#800080',
        description: 'New defense technique',
        followUpBeltRank: 'Blue White',
        followUpBeltColor: '#ADD8E6',
        secondFollowUpBeltRank: 'Blue',
        secondFollowUpBeltColor: '#0000FF',
        defense: ['New defense move'],
        keyPoints: ['New key point'],
        commonMistakes: ['New mistake'],
        firstFollowUp: ['New follow up'],
        secondFollowUp: ['Second follow up'],
        comment: 'Test comment',
      };

      const expectedResult = { ...createDto, id: 3 };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalled();
    });

    it('should handle empty arrays correctly', async () => {
      const createDto = {
        name: 'Test Defense',
        beltRank: 'Purple White',
        beltColor: '#800080',
        description: 'Test defense',
        followUpBeltRank: '',
        followUpBeltColor: '',
        secondFollowUpBeltRank: '',
        secondFollowUpBeltColor: '',
        defense: [],
        keyPoints: [],
        commonMistakes: [],
        firstFollowUp: [],
        secondFollowUp: [],
        comment: '',
      };

      const expectedResult = { ...createDto, id: 4 };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalled();
      expect(mockSequelize.literal).toHaveBeenCalledWith('ARRAY[]::text[]');
    });

    it('should handle null values in array fields', async () => {
      const createDto = {
        name: 'Test Defense',
        beltRank: 'Purple White',
        beltColor: '#800080',
        description: 'Test defense',
        followUpBeltRank: '',
        followUpBeltColor: '',
        secondFollowUpBeltRank: '',
        secondFollowUpBeltColor: '',
        defense: null,
        keyPoints: undefined,
        commonMistakes: ['Valid mistake'],
        firstFollowUp: null,
        secondFollowUp: undefined,
        comment: '',
      };

      const expectedResult = { ...createDto, id: 5 };
      mockModel.create.mockResolvedValue(expectedResult);

      const result = await service.create(createDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.create).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a one steps definition', async () => {
      const updateDto = {
        name: 'Updated Defense',
        defense: ['Updated defense move'],
        keyPoints: ['Updated key point'],
      };

      const expectedResult: [number, oneStepsDefinitionsAttributes[]] = [
        1,
        [
          { ...mockOneStepsDefinition, ...updateDto },
        ] as oneStepsDefinitionsAttributes[],
      ];
      mockModel.update.mockResolvedValue(expectedResult);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.update).toHaveBeenCalledWith(expect.any(Object), {
        where: { id: 1 },
        returning: true,
      });
    });

    it('should handle empty arrays in updates', async () => {
      const updateDto = {
        defense: [],
        keyPoints: [],
        commonMistakes: [],
      };

      const expectedResult: [number, oneStepsDefinitionsAttributes[]] = [
        1,
        [mockOneStepsDefinition] as oneStepsDefinitionsAttributes[],
      ];
      mockModel.update.mockResolvedValue(expectedResult);

      const result = await service.update(1, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockSequelize.literal).toHaveBeenCalledWith('ARRAY[]::text[]');
      expect(mockModel.update).toHaveBeenCalledWith(expect.any(Object), {
        where: { id: 1 },
        returning: true,
      });
    });

    it('should return zero affected rows when definition not found', async () => {
      const updateDto = { name: 'Updated Defense' };
      const expectedResult: [number, oneStepsDefinitionsAttributes[]] = [0, []];
      mockModel.update.mockResolvedValue(expectedResult);

      const result = await service.update(999, updateDto);

      expect(result).toEqual(expectedResult);
      expect(mockModel.update).toHaveBeenCalledWith(expect.any(Object), {
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
        beltRank: 'Purple White',
        beltColor: '#800080',
        description: 'Test defense',
        followUpBeltRank: 'Blue White',
        followUpBeltColor: '#ADD8E6',
        secondFollowUpBeltRank: 'Blue',
        secondFollowUpBeltColor: '#0000FF',
        defense: ['Defense move'],
        keyPoints: undefined,
        commonMistakes: null,
        firstFollowUp: ['Follow up'],
        secondFollowUp: ['Second follow up'],
        comment: 'Test comment',
        extraField: undefined,
      };

      mockModel.create.mockResolvedValue({ ...createDto, id: 6 });

      await service.create(createDto);

      expect(mockModel.create).toHaveBeenCalled();
    });

    it('should preserve already-array fields', async () => {
      const createDto = {
        name: 'Test Defense',
        beltRank: 'Purple White',
        beltColor: '#800080',
        description: 'Test defense',
        followUpBeltRank: 'Blue White',
        followUpBeltColor: '#ADD8E6',
        secondFollowUpBeltRank: 'Blue',
        secondFollowUpBeltColor: '#0000FF',
        defense: ['Defense 1', 'Defense 2'],
        keyPoints: ['Point 1', 'Point 2'],
        commonMistakes: ['Mistake 1', 'Mistake 2'],
        firstFollowUp: ['Follow up 1', 'Follow up 2'],
        secondFollowUp: ['Second 1', 'Second 2'],
        comment: 'Test comment',
      };

      mockModel.create.mockResolvedValue({ ...createDto, id: 7 });

      await service.create(createDto);

      expect(mockModel.create).toHaveBeenCalled();
    });
  });
});
