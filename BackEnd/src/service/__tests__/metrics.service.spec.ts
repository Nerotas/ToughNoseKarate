import { Test, TestingModule } from '@nestjs/testing';
import { MetricsService } from '../metrics.service';
import { Counter, Histogram } from 'prom-client';

describe('MetricsService', () => {
  let service: MetricsService;
  let mockCounter: jest.Mocked<Counter<string>>;
  let mockHistogram: jest.Mocked<Histogram<string>>;

  beforeEach(async () => {
    // Create mock counter
    mockCounter = {
      labels: jest.fn().mockReturnThis(),
      inc: jest.fn(),
    } as any;

    // Create mock histogram
    mockHistogram = {
      labels: jest.fn().mockReturnThis(),
      observe: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MetricsService,
        {
          provide: 'PROM_METRIC_CONSOLE_HTTP_INCOMING_REQUEST',
          useValue: mockCounter,
        },
        {
          provide: 'PROM_METRIC_CONSOLE_HTTP_REQUESTS_DURATION_SECONDS',
          useValue: mockHistogram,
        },
      ],
    }).compile();

    service = module.get<MetricsService>(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('incrementRequestCounter', () => {
    it('should increment the request counter with correct labels', () => {
      const method = 'GET';
      const path = '/api/test';
      const statusCode = '200';

      service.incrementRequestCounter(method, path, statusCode);

      expect(mockCounter.labels).toHaveBeenCalledWith({
        method,
        path,
        status: statusCode,
      });
      expect(mockCounter.inc).toHaveBeenCalled();
    });

    it('should handle different HTTP methods and status codes', () => {
      service.incrementRequestCounter('POST', '/api/users', '201');

      expect(mockCounter.labels).toHaveBeenCalledWith({
        method: 'POST',
        path: '/api/users',
        status: '201',
      });
      expect(mockCounter.inc).toHaveBeenCalled();
    });
  });

  describe('incrementRequestDuration', () => {
    it('should observe request duration with correct labels', () => {
      const method = 'GET';
      const path = '/api/test';
      const duration = 0.05; // 50ms

      service.incrementRequestDuration(method, path, duration);

      expect(mockHistogram.labels).toHaveBeenCalledWith({
        method,
        path,
      });
      expect(mockHistogram.observe).toHaveBeenCalledWith(duration);
    });

    it('should handle different durations', () => {
      const duration = 1.234;

      service.incrementRequestDuration('POST', '/api/slow', duration);

      expect(mockHistogram.labels).toHaveBeenCalledWith({
        method: 'POST',
        path: '/api/slow',
      });
      expect(mockHistogram.observe).toHaveBeenCalledWith(duration);
    });
  });
});
