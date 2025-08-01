import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { configValidationSchema } from './environment.config';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validationSchema: configValidationSchema,
          validationOptions: {
            allowUnknown: true,
            abortEarly: false,
          },
          // Use test environment variables
          load: [
            () => ({
              NODE_ENV: 'test',
              PORT: 3001,
              DB_HOST: 'localhost',
              DB_PORT: 3306,
              DB_USERNAME: 'test',
              DB_PASSWORD: 'test',
              DB_NAME: 'test_db',
              DB_SSL: false,
              API_PREFIX: 'api',
              JWT_EXPIRATION: '1d',
              THROTTLE_TTL: 60,
              THROTTLE_LIMIT: 10,
              CORS_ORIGINS: 'http://localhost:3000',
            }),
          ],
        }),
      ],
      providers: [AppConfigService],
    }).compile();

    service = module.get<AppConfigService>(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct port', () => {
    expect(service.port).toBe(3001);
  });

  it('should return correct node environment', () => {
    expect(service.nodeEnv).toBe('test');
  });

  it('should return database configuration', () => {
    const dbConfig = service.database;
    expect(dbConfig).toEqual({
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test_db',
      ssl: false,
    });
  });

  it('should return CORS origins as array', () => {
    const corsOrigins = service.corsOrigins;
    expect(corsOrigins).toEqual(['http://localhost:3000']);
  });

  it('should return throttle configuration', () => {
    const throttleConfig = service.throttle;
    expect(throttleConfig).toEqual({
      ttl: 60,
      limit: 10,
    });
  });

  it('should validate required configs', () => {
    expect(() => service.validateRequiredConfigs()).not.toThrow();
  });

  it('should return database connection info', () => {
    const connectionInfo = service.getDatabaseConnectionInfo();
    expect(connectionInfo).toBe('test@localhost:3306/test_db');
  });

  describe('environment checks', () => {
    it('should correctly identify development environment', () => {
      // This will be false since we're in test environment
      expect(service.isDevelopment).toBe(false);
    });

    it('should correctly identify production environment', () => {
      expect(service.isProduction).toBe(false);
    });
  });
});

describe('Environment Validation', () => {
  it('should fail validation when required fields are missing', async () => {
    await expect(
      Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            validationSchema: configValidationSchema,
            validationOptions: {
              allowUnknown: true,
              abortEarly: false,
            },
            load: [
              () => ({
                NODE_ENV: 'test',
                // Missing required DB fields
              }),
            ],
          }),
        ],
        providers: [AppConfigService],
      }).compile(),
    ).rejects.toThrow();
  });

  it('should pass validation with all required fields', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          validationSchema: configValidationSchema,
          validationOptions: {
            allowUnknown: true,
            abortEarly: false,
          },
          load: [
            () => ({
              NODE_ENV: 'test',
              PORT: 3001,
              DB_HOST: 'localhost',
              DB_PORT: 3306,
              DB_USERNAME: 'test',
              DB_PASSWORD: 'test',
              DB_NAME: 'test_db',
            }),
          ],
        }),
      ],
      providers: [AppConfigService],
    }).compile();

    expect(module).toBeDefined();
    const service = module.get<AppConfigService>(AppConfigService);
    expect(service).toBeDefined();
  });
});
