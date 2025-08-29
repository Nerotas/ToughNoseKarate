import { Test, TestingModule } from '@nestjs/testing';
import { OneStepsDefinitionsController } from '../oneStepsDefinitions.controller';
import { OneStepsDefinitionsService } from '../../service/oneStepsDefinitions.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { oneStepsDefinitionsAttributes } from '../../models/oneStepsDefinitions';

describe('OneStepsDefinitionsController', () => {
  let controller: OneStepsDefinitionsController;
  let service: jest.Mocked<OneStepsDefinitionsService>;

  const mockOneStepsDefinitionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockOneStep: oneStepsDefinitionsAttributes = {
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OneStepsDefinitionsController],
      providers: [
        {
          provide: OneStepsDefinitionsService,
          useValue: mockOneStepsDefinitionsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<OneStepsDefinitionsController>(
      OneStepsDefinitionsController,
    );
    service = module.get(OneStepsDefinitionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new one step definition', async () => {
      const createDto: oneStepsDefinitionsAttributes = {
        name: 'First One Step',
        beltRank: 'Purple White',
        beltColor: '#800080',
        description:
          'First basic one-step sequence for Purple White belt students.',
        followUpBeltRank: 'Blue White',
        followUpBeltColor: '#ADD8E6',
        secondFollowUpBeltRank: 'Blue',
        secondFollowUpBeltColor: '#0000FF',
        defense: ['Left outside block', 'Right reverse punch counter'],
        keyPoints: [
          'Proper outside block technique',
          'Immediate counter after block',
        ],
        commonMistakes: ['Weak blocking technique', 'Delayed counter attack'],
        firstFollowUp: ['Snap Kick'],
        secondFollowUp: ['Inside crescent kick'],
        comment: 'Test comment',
      };

      service.create.mockResolvedValue(mockOneStep as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockOneStep);
    });
  });

  describe('findAll', () => {
    it('should return all one step definitions', async () => {
      const mockOneSteps = [mockOneStep];
      service.findAll.mockResolvedValue(mockOneSteps as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockOneSteps);
    });
  });

  describe('findOne', () => {
    it('should return a specific one step definition', async () => {
      const id = '1';
      service.findOne.mockResolvedValue(mockOneStep as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockOneStep);
    });
  });

  describe('update', () => {
    it('should update a one step definition', async () => {
      const id = '1';
      const updateDto: oneStepsDefinitionsAttributes = {
        name: 'Updated One Step',
        beltRank: 'Purple White',
        beltColor: '#800080',
        description: 'Updated description for one-step sequence.',
        followUpBeltRank: 'Blue White',
        followUpBeltColor: '#ADD8E6',
        secondFollowUpBeltRank: 'Blue',
        secondFollowUpBeltColor: '#0000FF',
        defense: ['Left outside block', 'Right reverse punch counter'],
        keyPoints: [
          'Proper outside block technique',
          'Immediate counter after block',
        ],
        commonMistakes: ['Weak blocking technique', 'Delayed counter attack'],
        firstFollowUp: ['Snap Kick'],
        secondFollowUp: ['Inside crescent kick'],
        comment: 'Updated test comment',
      };
      const updatedOneStep = { ...mockOneStep, ...updateDto };

      service.update.mockResolvedValue(updatedOneStep as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedOneStep);
    });
  });

  describe('remove', () => {
    it('should delete a one step definition', async () => {
      const id = '1';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
