import { Test, TestingModule } from '@nestjs/testing';
import { PunchesDefinitionsController } from '../punchesDefinitions.controller';
import { PunchesDefinitionsService } from '../../service/punchesDefinitions.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

describe('PunchesDefinitionsController', () => {
  let controller: PunchesDefinitionsController;
  let service: jest.Mocked<PunchesDefinitionsService>;

  const mockPunchesDefinitionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockPunch = {
    id: 1,
    name: 'Jab',
    korean: 'Jireugi',
    technique: 'Straight punch with lead hand',
    stance: 'fighting stance',
    belt: 'white',
    beltColor: 'white',
    description: 'Basic straight punch',
    target: 'head',
    execution: ['step 1', 'step 2'],
    keyPoints: ['keep elbow down'],
    commonMistakes: ['dropping guard'],
    applications: ['combination starter'],
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PunchesDefinitionsController],
      providers: [
        {
          provide: PunchesDefinitionsService,
          useValue: mockPunchesDefinitionsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<PunchesDefinitionsController>(
      PunchesDefinitionsController,
    );
    service = module.get(PunchesDefinitionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new punch definition', async () => {
      const createDto = {
        name: 'Jab',
        korean: 'Jireugi',
        belt: 'white',
        beltColor: 'white',
        description: 'Straight punch',
        target: 'head',
        execution: ['step 1'],
        keyPoints: ['keep elbow down'],
        commonMistakes: ['dropping guard'],
        applications: ['combination starter'],
      };

      service.create.mockResolvedValue(mockPunch as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockPunch);
    });
  });

  describe('findAll', () => {
    it('should return all punch definitions', async () => {
      const mockPunches = [mockPunch];
      service.findAll.mockResolvedValue(mockPunches as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPunches);
    });
  });

  describe('findOne', () => {
    it('should return a specific punch definition', async () => {
      const id = '1';
      service.findOne.mockResolvedValue(mockPunch as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockPunch);
    });
  });

  describe('update', () => {
    it('should update a punch definition', async () => {
      const id = '1';
      const updateDto = {
        name: 'Jab',
        korean: 'Jireugi',
        belt: 'white',
        beltColor: 'white',
        description: 'Updated technique',
        target: 'head',
        execution: ['updated step'],
        keyPoints: ['keep elbow down'],
        commonMistakes: ['dropping guard'],
        applications: ['combination starter'],
      };
      const updatedPunch = { ...mockPunch, ...updateDto };

      service.update.mockResolvedValue(updatedPunch as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedPunch);
    });
  });

  describe('remove', () => {
    it('should delete a punch definition', async () => {
      const id = '1';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
