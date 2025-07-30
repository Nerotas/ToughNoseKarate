import { HealthController } from './health.controller';
import { LocalHealthCheckService } from './health.service';
import { HealthCheckService } from '@nestjs/terminus';

import { expect, describe, it, jest, beforeEach } from '@jest/globals';

describe('LocalHealthCheckService', () => {
  let service: LocalHealthCheckService;

  beforeEach(() => {
    service = new LocalHealthCheckService();
  });

  it('should return healthy status for mainDB', async () => {
    const result = await service.healthCheckRoot();
    expect(result).toEqual({ mainDB: { status: 'up' } });
  });
});

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: HealthCheckService;
  let localHealthCheckService: LocalHealthCheckService;

  beforeEach(() => {
    healthCheckService = {
      check: jest.fn(),
    } as any;
    localHealthCheckService = {
      healthCheckRoot: jest
        .fn<() => Promise<{ mainDB: { status: string } }>>()
        .mockResolvedValue({ mainDB: { status: 'up' } }),
    } as any;
    controller = new HealthController(
      healthCheckService,
      localHealthCheckService,
    );
  });

  it('should call health.check with localHealthCheckService.healthCheckRoot', async () => {
    await controller.check();
    expect(healthCheckService.check).toHaveBeenCalledWith([
      expect.any(Function),
    ]);
  });
});
