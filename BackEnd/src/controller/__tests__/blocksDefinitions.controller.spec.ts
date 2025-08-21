import { Test, TestingModule } from '@nestjs/testing';
import { BlocksDefinitionsController } from '../blocksDefinitions.controller';
import { BlocksDefinitionsService } from '../../service/blocksDefinitions.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

describe('BlocksDefinitionsController', () => {
  let controller: BlocksDefinitionsController;
  let service: jest.Mocked<BlocksDefinitionsService>;

  const mockBlocksDefinitionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockBlock = {
    id: 1,
    blockName: 'High Block',
    technique: 'Defensive movement to block high attacks',
    stance: 'ready stance',
    belt: 'white',
    beltColor: 'white',
    execution: ['step 1', 'step 2'],
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlocksDefinitionsController],
      providers: [
        {
          provide: BlocksDefinitionsService,
          useValue: mockBlocksDefinitionsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<BlocksDefinitionsController>(
      BlocksDefinitionsController,
    );
    service = module.get(BlocksDefinitionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new block definition', async () => {
      const createDto = {
        blockName: 'High Block',
        technique: 'Defensive movement',
        stance: 'ready stance',
        belt: 'white',
        beltColor: 'white',
        execution: ['step 1'],
      };

      service.create.mockResolvedValue(mockBlock as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockBlock);
    });
  });

  describe('findAll', () => {
    it('should return all block definitions', async () => {
      const mockBlocks = [mockBlock];
      service.findAll.mockResolvedValue(mockBlocks as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockBlocks);
    });
  });

  describe('findOne', () => {
    it('should return a specific block definition', async () => {
      const id = '1';
      service.findOne.mockResolvedValue(mockBlock as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockBlock);
    });
  });

  describe('update', () => {
    it('should update a block definition', async () => {
      const id = '1';
      const updateDto = {
        blockName: 'High Block',
        technique: 'Updated technique',
        stance: 'ready stance',
        belt: 'white',
        beltColor: 'white',
        execution: ['updated step'],
        keyPoints: ['key point 1'],
        commonMistakes: ['mistake 1'],
        applications: ['application 1'],
      };
      const updatedBlock = { ...mockBlock, ...updateDto };

      service.update.mockResolvedValue(updatedBlock as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedBlock);
    });
  });

  describe('remove', () => {
    it('should delete a block definition', async () => {
      const id = '1';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
