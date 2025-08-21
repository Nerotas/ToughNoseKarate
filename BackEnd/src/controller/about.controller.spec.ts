import { Test, TestingModule } from '@nestjs/testing';
import { AboutController } from './about.controller';

describe('AboutController', () => {
  let controller: AboutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AboutController],
    }).compile();

    controller = module.get<AboutController>(AboutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('about', () => {
    it('should return a resolved promise', async () => {
      const result = await controller.about();
      expect(result).toBeUndefined();
    });

    it('should resolve successfully', async () => {
      await expect(controller.about()).resolves.toBeUndefined();
    });
  });
});
