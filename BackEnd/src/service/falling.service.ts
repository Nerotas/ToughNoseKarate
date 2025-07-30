import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  falling,
  fallingCreationAttributes,
} from '../models/falling';

@Injectable()
export class FallingService {
  constructor(
    @InjectModel(falling)
    private readonly fallingModel: typeof falling,
  ) {}

  async findAll(): Promise<falling[]> {
    return this.fallingModel.findAll();
  }

  async findOne(studentid: number): Promise<falling> {
    const record = await this.fallingModel.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`Falling for student ${studentid} not found`);
    }
    return record;
  }

  async create(data: fallingCreationAttributes): Promise<falling> {
    return this.fallingModel.create(data);
  }

  async update(
    studentid: number,
    data: Partial<falling>,
  ): Promise<falling> {
    const record = await this.findOne(studentid);
    return record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
