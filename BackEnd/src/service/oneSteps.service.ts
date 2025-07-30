import { Injectable, NotFoundException } from '@nestjs/common';
import {
  one_steps,
  one_stepsCreationAttributes,
} from '../models/one_steps';

@Injectable()
export class OneStepsService {
  async findAll(): Promise<one_steps[]> {
    return await one_steps.findAll();
  }

  async findOne(studentid: number): Promise<one_steps> {
    const record = await one_steps.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`One step with studentid ${studentid} not found`);
    }
    return record;
  }

  async create(data: one_stepsCreationAttributes): Promise<one_steps> {
    return await one_steps.create(data);
  }

  async update(
    studentid: number,
    data: Partial<one_steps>,
  ): Promise<one_steps> {
    const record = await this.findOne(studentid);
    return await record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
