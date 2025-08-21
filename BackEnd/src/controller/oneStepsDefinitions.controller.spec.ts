import { Test, TestingModule } from '@nestjs/testing';
import { OneStepsDefinitionsController } from './oneStepsDefinitions.controller';
import { OneStepsDefinitionsService } from '../service/oneStepsDefinitions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

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

  const mockOneStep = {
    id: 1,
    name: 'One Step 1',
    korean: 'Il Soo Sik',
    belt: 'white',
    beltColor: 'white',
    description: 'Basic one step technique',
    attack: 'straight punch',
    defense: ['block', 'counter'],
    keyPoints: ['timing', 'distance'],
    commonMistakes: ['too slow'],
    applications: ['self defense'],
    created_at: new Date(),
    updated_at: new Date(),
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
      const createDto = {
        name: 'One Step 1',
        korean: 'Il Soo Sik',
        belt: 'white',
        beltColor: 'white',
        description: 'Basic one step',
        attack: 'straight punch',
        defense: ['block', 'counter'],
        keyPoints: ['timing'],
        commonMistakes: ['too slow'],
        applications: ['self defense'],
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
      const updateDto = {
        name: 'One Step 1',
        korean: 'Il Soo Sik',
        belt: 'white',
        beltColor: 'white',
        description: 'Updated description',
        attack: 'straight punch',
        defense: ['block', 'counter'],
        keyPoints: ['timing'],
        commonMistakes: ['too slow'],
        applications: ['self defense'],
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
