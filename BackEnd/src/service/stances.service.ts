import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  stances,
  stancesCreationAttributes,
} from '../models/stances';

@Injectable()
export class StancesService {
  constructor(
    @InjectModel(stances)
    private readonly stancesModel: typeof stances,
  ) {}

  async findAll(): Promise<stances[]> {
    return this.stancesModel.findAll();
  }

  async findOne(studentid: number): Promise<stances> {
    const record = await this.stancesModel.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`Stances for student ${studentid} not found`);
    }
    return record;
  }

  async create(data: stancesCreationAttributes): Promise<stances> {
    return this.stancesModel.create(data);
  }

  async update(
    studentid: number,
    data: Partial<stances>,
  ): Promise<stances> {
    const record = await this.findOne(studentid);
    return record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
