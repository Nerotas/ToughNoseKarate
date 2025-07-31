import { Injectable, NotFoundException } from '@nestjs/common';
import { parents, parentsCreationAttributes } from '../models/parents';
import {DatabaseService} from './database.service';

@Injectable()
export class ParentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<parents[]> {
    return await this.databaseService.getModels().parents.findAll();
  }

  async findOne(parentid: number): Promise<parents> {
    const record = await this.databaseService.getModels().parents.findByPk(parentid);
    if (!record) {
      throw new NotFoundException(`Parent with parentid ${parentid} not found`);
    }
    return record;
  }

  async create(data: parentsCreationAttributes): Promise<parents> {
    return await parents.create(data);
  }

  async update(
    parentid: number,
    data: Partial<parents>,
  ): Promise<parents> {
    const record = await this.findOne(parentid);
    return await record.update(data);
  }

  async remove(parentid: number): Promise<void> {
    const record = await this.findOne(parentid);
    await record.destroy();
  }
}
