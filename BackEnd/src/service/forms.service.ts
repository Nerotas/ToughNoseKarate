import { Injectable, NotFoundException } from '@nestjs/common';
import { forms, formsCreationAttributes } from '../models/forms';

@Injectable()
export class FormsService {
  async findAll(): Promise<forms[]> {
    return await forms.findAll();
  }

  async findOne(studentid: number): Promise<forms> {
    const record = await forms.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`Form with studentid ${studentid} not found`);
    }
    return record;
  }

  async create(data: formsCreationAttributes): Promise<forms> {
    return await forms.create(data);
  }

  async update(studentid: number, data: Partial<forms>): Promise<forms> {
    const record = await this.findOne(studentid);
    return await record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
