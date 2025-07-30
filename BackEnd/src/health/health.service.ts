import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class LocalHealthCheckService extends HealthIndicator {
  async healthCheckRoot(): Promise<HealthIndicatorResult> {
    const result = this.getStatus('mainDB', true);
    return result;
  }
}
