import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  forms,
  formsCreationAttributes,
} from '../models/forms';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(forms)
    private readonly formsModel: typeof forms,
  ) {}

  async findAll(): Promise<forms[]> {
    return this.formsModel.findAll();
  }

  async findOne(studentid: number): Promise<forms> {
    const record = await this.formsModel.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`Forms for student ${studentid} not found`);
    }
    return record;
  }

  async create(data: formsCreationAttributes): Promise<forms> {
    return this.formsModel.create(data);
  }

  async update(
    studentid: number,
    data: Partial<forms>,
  ): Promise<forms> {
    const record = await this.findOne(studentid);
    return record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
