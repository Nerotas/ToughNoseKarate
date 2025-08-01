import { MetricsMiddleware } from './metrics.middleware';
import { MetricsService } from '../service/metrics.service';
import { Logger } from '@nestjs/common';
import { expect, describe, it, jest } from '@jest/globals';
import type { SpyInstance } from 'jest-mock';

describe('Middleware', () => {
  describe('MetricsMiddleware', () => {
    let metricsService: MetricsService;
    let middleware: MetricsMiddleware;
    let req: any;
    let res: any;
    let next: jest.Mock;

    beforeEach(() => {
      metricsService = {
        incrementRequestCounter: jest.fn(),
        incrementRequestDuration: jest.fn(),
      } as any;
      middleware = new MetricsMiddleware(metricsService);
      req = { method: 'GET', originalUrl: '/test', path: '/test' };
      res = {
        statusCode: 200,
        on: jest.fn((event: string, cb: () => void) => {
          if (event === 'finish') cb();
        }),
      };
      next = jest.fn();
    });

    it('should call metricsService methods on response finish', () => {
      middleware.use(req, res, next);
      expect(metricsService.incrementRequestCounter).toHaveBeenCalledWith(
        'GET',
        '/test',
        '200',
      );
      expect(metricsService.incrementRequestDuration).toHaveBeenCalledWith(
        'GET',
        '/test',
        expect.any(Number),
      );
      expect(next).toHaveBeenCalled();
    });
  });
});
