import { Injectable, NotFoundException } from '@nestjs/common';
import {
  combinations,
  combinationsCreationAttributes,
} from '../models/combinations';
import { DatabaseService } from './database.service';

@Injectable()
export class CombinationsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<combinations[]> {
    const models = this.databaseService.getModels();
    return await models.combinations.findAll();
  }

  async findOne(studentid: number): Promise<combinations> {
    const models = this.databaseService.getModels();
    const record = await models.combinations.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`Combination with studentid ${studentid} not found`);
    }
    return record;
  }

  async create(data: combinationsCreationAttributes): Promise<combinations> {
    const models = this.databaseService.getModels();
    return await models.combinations.create(data);
  }

  async update(
    studentid: number,
    data: Partial<combinations>,
  ): Promise<combinations> {
    const record = await this.findOne(studentid);
    return await record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
