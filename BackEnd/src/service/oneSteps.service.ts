import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  one_steps,
  one_stepsCreationAttributes,
} from '../models/one_steps';

@Injectable()
export class OneStepsService {
  constructor(
    @InjectModel(one_steps)
    private readonly oneStepsModel: typeof one_steps,
  ) {}

  async findAll(): Promise<one_steps[]> {
    return this.oneStepsModel.findAll();
  }

  async findOne(studentid: number): Promise<one_steps> {
    const record = await this.oneStepsModel.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`One steps for student ${studentid} not found`);
    }
    return record;
  }

  async create(data: one_stepsCreationAttributes): Promise<one_steps> {
    return this.oneStepsModel.create(data);
  }

  async update(
    studentid: number,
    data: Partial<one_steps>,
  ): Promise<one_steps> {
    const record = await this.findOne(studentid);
    return record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
