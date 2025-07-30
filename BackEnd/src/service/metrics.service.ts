import { Injectable } from '@nestjs/common';
import { Counter, Histogram } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class MetricsService {
  constructor(
    @InjectMetric('console_http_incoming_request')
    private httpRequestsCounter: Counter<string>,
    @InjectMetric('console_http_requests_duration_seconds')
    private httpRequestsDuration: Histogram<string>,
  ) {}

  // method to increment request counter
  incrementRequestCounter(method: string, path: string, statusCode: string) {
    this.httpRequestsCounter.labels({ method, path, status: statusCode }).inc();
  }

  // method to observe request duration
  incrementRequestDuration(method: string, path: string, duration: number) {
    this.httpRequestsDuration.labels({ method, path }).observe(duration);
  }
}
