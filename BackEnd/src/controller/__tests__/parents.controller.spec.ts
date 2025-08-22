import { Test, TestingModule } from '@nestjs/testing';
import { ParentsController } from '../parents.controller';
import { ParentsService } from '../../service/parents.service';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

describe('ParentsController', () => {
  let controller: ParentsController;
  let service: jest.Mocked<ParentsService>;

  const mockParentsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockParent = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-0123',
    address: '123 Main St',
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParentsController],
      providers: [
        {
          provide: ParentsService,
          useValue: mockParentsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ParentsController>(ParentsController);
    service = module.get(ParentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new parent', async () => {
      const createDto = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        phone: '555-0123',
      };

      service.create.mockResolvedValue(mockParent as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockParent);
    });
  });

  describe('findAll', () => {
    it('should return all parents', async () => {
      const mockParents = [mockParent];
      service.findAll.mockResolvedValue(mockParents as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockParents);
    });
  });

  describe('findOne', () => {
    it('should return a specific parent', async () => {
      const id = '1';
      service.findOne.mockResolvedValue(mockParent as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockParent);
    });
  });

  describe('update', () => {
    it('should update a parent', async () => {
      const id = '1';
      const updateDto = { email: 'newemail@example.com' };
      const updatedParent = { ...mockParent, ...updateDto };

      service.update.mockResolvedValue(updatedParent as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedParent);
    });
  });

  describe('remove', () => {
    it('should delete a parent', async () => {
      const id = '1';
      const deleteResult = { deleted: true };

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
