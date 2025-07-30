import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  parents,
  parentsCreationAttributes,
} from '../models/parents';

@Injectable()
export class ParentsService {
  constructor(
    @InjectModel(parents)
    private readonly parentsModel: typeof parents,
  ) {}

  async findAll(): Promise<parents[]> {
    return this.parentsModel.findAll();
  }

  async findOne(parentid: number): Promise<parents> {
    const record = await this.parentsModel.findByPk(parentid);
    if (!record) {
      throw new NotFoundException(`Parent with id ${parentid} not found`);
    }
    return record;
  }

  async create(data: parentsCreationAttributes): Promise<parents> {
    return this.parentsModel.create(data);
  }

  async update(
    parentid: number,
    data: Partial<parents>,
  ): Promise<parents> {
    const record = await this.findOne(parentid);
    return record.update(data);
  }

  async remove(parentid: number): Promise<void> {
    const record = await this.findOne(parentid);
    await record.destroy();
  }
}
