import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from '../logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    service = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create logger with correct app name', () => {
    // The service should have been created successfully
    expect(service).toBeInstanceOf(LoggerService);
    // Access the private property for testing
    const appName = (service as any).appName;
    // Since process.env.APP_NAME is undefined in test env, it should default to 'ToghNoseKarateAPI'
    expect(appName).toBe('ToghNoseKarateAPI');
  });

  describe('info', () => {
    it('should call info method without throwing', () => {
      const message = 'Test info message';

      expect(() => service.info(message)).not.toThrow();
    });
  });

  describe('warn', () => {
    it('should call warn method without throwing', () => {
      const message = 'Test warning message';

      expect(() => service.warn(message)).not.toThrow();
    });
  });

  describe('error', () => {
    it('should call error method without throwing', () => {
      const message = 'Test error message';

      expect(() => service.error(message)).not.toThrow();
    });
  });

  describe('debug', () => {
    it('should call debug method without throwing', () => {
      const message = 'Test debug message';

      expect(() => service.debug(message)).not.toThrow();
    });
  });
});
