import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { BeltRequirementsService } from '../beltRequirements.service';
import { beltRequirements } from '../../models/beltRequirements';

describe('BeltRequirementsService', () => {
  let service: BeltRequirementsService;
  let beltRequirementsModel: jest.Mocked<typeof beltRequirements>;

  const mockBeltRequirement = {
    beltOrder: 1,
    beltRank: 'white',
    forms: {},
    stances: {},
    blocks: {},
    punches: {},
    kicks: {},
    jumps: {},
    falling: {},
    oneSteps: {},
    selfDefense: {},
    comments: 'Basic requirements',
    color: '#FFFFFF',
    textColor: '#000000',
  };

  beforeEach(async () => {
    const mockBeltRequirementsModel = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeltRequirementsService,
        {
          provide: getModelToken(beltRequirements),
          useValue: mockBeltRequirementsModel,
        },
      ],
    }).compile();

    service = module.get<BeltRequirementsService>(BeltRequirementsService);
    beltRequirementsModel = module.get(getModelToken(beltRequirements));

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all belt requirements', async () => {
      const beltRequirementsList = [mockBeltRequirement];
      beltRequirementsModel.findAll.mockResolvedValue(
        beltRequirementsList as any,
      );

      const result = await service.findAll();

      expect(beltRequirementsModel.findAll).toHaveBeenCalled();
      expect(result).toEqual(beltRequirementsList);
    });

    it('should return empty array when no belt requirements found', async () => {
      beltRequirementsModel.findAll.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return belt requirement by belt rank', async () => {
      beltRequirementsModel.findOne.mockResolvedValue(
        mockBeltRequirement as any,
      );

      const result = await service.findOne('white');

      expect(beltRequirementsModel.findOne).toHaveBeenCalledWith({
        where: { beltRank: 'white' },
      });
      expect(result).toEqual(mockBeltRequirement);
    });

    it('should return null when belt requirement not found', async () => {
      beltRequirementsModel.findOne.mockResolvedValue(null);

      const result = await service.findOne('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new belt requirement', async () => {
      const createDto = {
        beltOrder: 2,
        beltRank: 'yellow',
        forms: { form1: true },
        stances: { stance1: true },
        blocks: { block1: true },
        punches: { punch1: true },
        kicks: { kick1: true },
        jumps: { jump1: true },
        falling: { fall1: true },
        oneSteps: { oneStep1: true },
        selfDefense: { defense1: true },
        comments: 'Yellow belt requirements',
      };

      beltRequirementsModel.create.mockResolvedValue(
        mockBeltRequirement as any,
      );

      const result = await service.create(createDto);

      expect(beltRequirementsModel.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockBeltRequirement);
    });

    it('should create belt requirement with partial data', async () => {
      const createDto = {
        beltOrder: 3,
        beltRank: 'orange',
        forms: {},
        stances: {},
        blocks: {},
        punches: {},
        kicks: {},
        jumps: {},
        falling: {},
        oneSteps: {},
        selfDefense: {},
      };

      beltRequirementsModel.create.mockResolvedValue(
        mockBeltRequirement as any,
      );

      const result = await service.create(createDto);

      expect(beltRequirementsModel.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockBeltRequirement);
    });
  });

  describe('update', () => {
    it('should update belt requirement successfully', async () => {
      const updateDto = {
        beltOrder: 3,
        forms: { form2: true },
        comments: 'Updated requirements',
      };
      const updateResult = [1, [mockBeltRequirement]] as [
        number,
        beltRequirements[],
      ];

      beltRequirementsModel.update.mockResolvedValue(updateResult as any);

      const result = await service.update('white', updateDto);

      expect(beltRequirementsModel.update).toHaveBeenCalledWith(updateDto, {
        where: { beltRank: 'white' },
        returning: true,
      });
      expect(result).toEqual(updateResult);
    });

    it('should return zero affected rows when belt requirement not found', async () => {
      const updateDto = { beltOrder: 10 };
      const updateResult = [0, []] as [number, beltRequirements[]];

      beltRequirementsModel.update.mockResolvedValue(updateResult as any);

      const result = await service.update('nonexistent', updateDto);

      expect(result).toEqual(updateResult);
    });
  });

  describe('remove', () => {
    it('should remove belt requirement successfully', async () => {
      beltRequirementsModel.destroy.mockResolvedValue(1);

      const result = await service.remove('white');

      expect(beltRequirementsModel.destroy).toHaveBeenCalledWith({
        where: { beltRank: 'white' },
      });
      expect(result).toBe(1);
    });

    it('should return zero when belt requirement not found', async () => {
      beltRequirementsModel.destroy.mockResolvedValue(0);

      const result = await service.remove('nonexistent');

      expect(result).toBe(0);
    });
  });
});
