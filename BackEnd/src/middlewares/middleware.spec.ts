import { MetricsMiddleware } from './metrics.middleware';
import { RequestLoggerMiddleware } from './RequestLoggerMiddleware';
import { RouteRewriteMiddleware } from './RouteRewriteMiddleware';
import { MetricsService } from '../services/metrics.service';
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

  describe('RequestLoggerMiddleware', () => {
    let middleware: RequestLoggerMiddleware;
    let req: any;
    let res: any;
    let next: jest.Mock;
    let loggerLogSpy: SpyInstance;

    beforeEach(() => {
      middleware = new RequestLoggerMiddleware();
      req = { method: 'POST', originalUrl: '/foo' };
      res = {
        statusCode: 201,
        on: jest.fn((event, cb) => {
          if (event === 'close' && typeof cb === 'function') cb();
        }),
        end: jest.fn(), // Add this mock to avoid "not callable" error
      };
      next = jest.fn();
      loggerLogSpy = jest
        .spyOn(Logger.prototype, 'log')
        .mockImplementation(() => {});
    });

    afterEach(() => {
      loggerLogSpy.mockRestore();
    });

    it('should log request on response close', () => {
      middleware.use(req, res, next);
      expect(loggerLogSpy).toHaveBeenCalledWith('POST /foo 201');
      expect(next).toHaveBeenCalled();
    });
  });

  describe('RouteRewriteMiddleware', () => {
    let middleware: RouteRewriteMiddleware;
    let req: any;
    let res: any;
    let next: jest.Mock;

    beforeEach(() => {
      middleware = new RouteRewriteMiddleware();
      req = { url: '/base/some/path' };
      res = {};
      next = jest.fn();
    });

    it('should rewrite url if it starts with rewriteBase', () => {
      jest
        .spyOn(require('../lib/rewrite-path-to-root'), 'rewritePathToRoot')
        .mockReturnValue('base');
      middleware.use(req, res, next);
      expect(req.url).toBe('/some/path');
      expect(next).toHaveBeenCalled();
    });

    it('should not rewrite url if it does not start with rewriteBase', () => {
      jest
        .spyOn(require('../lib/rewrite-path-to-root'), 'rewritePathToRoot')
        .mockReturnValue('other');
      req.url = '/base/some/path';
      middleware.use(req, res, next);
      expect(req.url).toBe('/base/some/path');
      expect(next).toHaveBeenCalled();
    });
  });
});
