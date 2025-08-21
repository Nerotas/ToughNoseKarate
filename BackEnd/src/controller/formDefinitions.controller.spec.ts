import { Test, TestingModule } from '@nestjs/testing';
import { FormDefinitionsController } from './formDefinitions.controller';
import { FormDefinitionsService } from '../service/formDefinitions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';

describe('FormDefinitionsController', () => {
  let controller: FormDefinitionsController;
  let service: jest.Mocked<FormDefinitionsService>;

  const mockFormDefinitionsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByBeltRank: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    bulkCreate: jest.fn(),
  };

  const mockForm = {
    id: 1,
    form_name: 'Basic Form 1',
    description: 'First basic form',
    belt_rank: 'white',
    difficulty_level: 1,
    movements: ['move 1', 'move 2'],
    active_indicator: 1,
    created_at: new Date(),
    updated_at: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormDefinitionsController],
      providers: [
        {
          provide: FormDefinitionsService,
          useValue: mockFormDefinitionsService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<FormDefinitionsController>(
      FormDefinitionsController,
    );
    service = module.get(FormDefinitionsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new form definition', async () => {
      const createDto = {
        form_name: 'Basic Form 1',
        description: 'First basic form',
        belt_rank: 'white',
      };

      service.create.mockResolvedValue(mockForm as any);

      const result = await controller.create(createDto);

      expect(service.create).toHaveBeenCalledWith(createDto);
      expect(result).toEqual(mockForm);
    });
  });

  describe('findAll', () => {
    it('should return all form definitions', async () => {
      const mockForms = [mockForm];
      service.findAll.mockResolvedValue(mockForms as any);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockForms);
    });

    it('should return forms filtered by belt rank', async () => {
      const beltRank = 'white';
      const mockForms = [mockForm];
      service.findByBeltRank.mockResolvedValue(mockForms as any);

      const result = await controller.findAll(beltRank);

      expect(service.findByBeltRank).toHaveBeenCalledWith(beltRank);
      expect(result).toEqual(mockForms);
    });
  });

  describe('findOne', () => {
    it('should return a specific form definition', async () => {
      const id = 1;
      service.findOne.mockResolvedValue(mockForm as any);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockForm);
    });
  });

  describe('findByBeltRank', () => {
    it('should return forms for a specific belt rank', async () => {
      const beltRank = 'white';
      const mockForms = [mockForm];
      service.findByBeltRank.mockResolvedValue(mockForms as any);

      const result = await controller.findByBeltRank(beltRank);

      expect(service.findByBeltRank).toHaveBeenCalledWith(beltRank);
      expect(result).toEqual(mockForms);
    });
  });

  describe('update', () => {
    it('should update a form definition', async () => {
      const id = 1;
      const updateDto = { description: 'Updated description' };
      const updatedForm = { ...mockForm, ...updateDto };

      service.update.mockResolvedValue(updatedForm as any);

      const result = await controller.update(id, updateDto);

      expect(service.update).toHaveBeenCalledWith(1, updateDto);
      expect(result).toEqual(updatedForm);
    });
  });

  describe('remove', () => {
    it('should soft delete a form definition', async () => {
      const id = 1;
      const deleteResult = true;

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        message: 'Form definition deleted successfully',
        id: 1,
      });
    });
  });

  describe('hardDelete', () => {
    it('should permanently delete a form definition', async () => {
      const id = 1;
      const deleteResult = true;

      service.remove.mockResolvedValue(deleteResult as any);

      const result = await controller.hardDelete(id);

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({
        message: 'Form definition permanently deleted',
        id: 1,
      });
    });
  });

  describe('bulkCreate', () => {
    it('should bulk create form definitions', async () => {
      const bulkData = [mockForm];
      const serviceResult = [mockForm];

      service.bulkCreate.mockResolvedValue(serviceResult as any);

      const result = await controller.bulkCreate(bulkData);

      expect(service.bulkCreate).toHaveBeenCalledWith(bulkData);
      expect(result).toEqual({
        message: `Successfully created ${serviceResult.length} form definitions`,
        created: serviceResult.length,
        data: serviceResult,
      });
    });
  });
});
