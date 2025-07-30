import { Injectable, NotFoundException } from '@nestjs/common';
import {
  belt_requirements,
  belt_requirementsCreationAttributes,
} from '../models/belt_requirements';

@Injectable()
export class BeltRequirementsService {
  async findAll(): Promise<belt_requirements[]> {
    return await belt_requirements.findAll();
  }

  async findOne(belt_order: number): Promise<belt_requirements> {
    const record = await belt_requirements.findByPk(belt_order);
    if (!record) {
      throw new NotFoundException(
        `Belt requirement with order ${belt_order} not found`,
      );
    }
    return record;
  }

  async create(
    data: belt_requirementsCreationAttributes,
  ): Promise<belt_requirements> {
    return await belt_requirements.create(data);
  }

  async update(
    belt_order: number,
    data: Partial<belt_requirements>,
  ): Promise<belt_requirements> {
    const record = await this.findOne(belt_order);
    return await record.update(data);
  }

  async remove(belt_order: number): Promise<void> {
    const record = await this.findOne(belt_order);
    await record.destroy();
  }
}
