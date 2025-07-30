import { Injectable, NotFoundException } from '@nestjs/common';
import {
  stances,
  stancesCreationAttributes,
} from '../models/stances';

@Injectable()
export class StancesService {
  async findAll(): Promise<stances[]> {
    return await stances.findAll();
  }

  async findOne(studentid: number): Promise<stances> {
    const record = await stances.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`Stance with studentid ${studentid} not found`);
    }
    return record;
  }

  async create(data: stancesCreationAttributes): Promise<stances> {
    return await stances.create(data);
  }

  async update(
    studentid: number,
    data: Partial<stances>,
  ): Promise<stances> {
    const record = await this.findOne(studentid);
    return await record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
