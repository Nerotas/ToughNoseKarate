import { Injectable, NotFoundException } from '@nestjs/common';
import {
  parent_mapping,
  parent_mappingCreationAttributes,
} from '../models/parent_mapping';

@Injectable()
export class ParentMappingService {
  async findAll(): Promise<parent_mapping[]> {
    return await parent_mapping.findAll();
  }

  async findOne(studentid: number, parentid: number): Promise<parent_mapping> {
    const record = await parent_mapping.findOne({
      where: { studentid, parentid },
    });

    if (!record) {
      throw new NotFoundException(`Parent mapping with studentid ${studentid} and parentid ${parentid} not found`);
    }

    return record;
  }

  async create(
    data: parent_mappingCreationAttributes,
  ): Promise<parent_mapping> {
    return await parent_mapping.create(data);
  }

  async update(
    studentid: number,
    parentid: number,
    data: Partial<parent_mapping>,
  ): Promise<parent_mapping> {
    const record = await this.findOne(studentid, parentid);
    return await record.update(data);
  }

  async remove(studentid: number, parentid: number): Promise<void> {
    const record = await this.findOne(studentid, parentid);
    await record.destroy();
  }
}
