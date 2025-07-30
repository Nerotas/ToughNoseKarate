import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MetricsService } from '../services/metrics.service';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
  constructor(private readonly metricsService: MetricsService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = process.hrtime();

    res.on('finish', () => {
      const duration = process.hrtime(start);
      const durationInSeconds = duration[0] + duration[1] / 1e9;

      this.metricsService.incrementRequestCounter(
        req.method,
        req.originalUrl || req.path,
        res.statusCode?.toString(),
      );

      this.metricsService.incrementRequestDuration(
        req.method,
        req.originalUrl || req.path,
        durationInSeconds,
      );
    });

    next();
  }
}
