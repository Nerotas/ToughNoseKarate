import { Injectable, NotFoundException } from '@nestjs/common';
import {
  falling,
  fallingCreationAttributes,
} from '../models/falling';

@Injectable()
export class FallingService {
  async findAll(): Promise<falling[]> {
    return await falling.findAll();
  }

  async findOne(studentid: number): Promise<falling> {
    const record = await falling.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`Falling with studentid ${studentid} not found`);
    }
    return record;
  }

  async create(data: fallingCreationAttributes): Promise<falling> {
    return await falling.create(data);
  }

  async update(
    studentid: number,
    data: Partial<falling>,
  ): Promise<falling> {
    const record = await this.findOne(studentid);
    return await record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
