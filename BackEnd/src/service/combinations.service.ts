import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  combinations,
  combinationsCreationAttributes,
} from '../models/combinations';

@Injectable()
export class CombinationsService {
  constructor(
    @InjectModel(combinations)
    private readonly combinationsModel: typeof combinations,
  ) {}

  async findAll(): Promise<combinations[]> {
    return this.combinationsModel.findAll();
  }

  async findOne(id: number): Promise<combinations> {
    const record = await this.combinationsModel.findByPk(id);
    if (!record) {
      throw new NotFoundException(`Combination with id ${id} not found`);
    }
    return record;
  }

  async create(data: combinationsCreationAttributes): Promise<combinations> {
    return this.combinationsModel.create(data);
  }

  async update(
    id: number,
    data: Partial<combinations>,
  ): Promise<combinations> {
    const record = await this.findOne(id);
    return record.update(data);
  }

  async remove(id: number): Promise<void> {
    const record = await this.findOne(id);
    await record.destroy();
  }
}
