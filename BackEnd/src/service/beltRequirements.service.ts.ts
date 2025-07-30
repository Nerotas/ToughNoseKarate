import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  belt_requirements,
  belt_requirementsCreationAttributes,
} from 'src/models/belt_requirements';

@Injectable()
export class BeltRequirementsService {
  constructor(
    @InjectModel(belt_requirements)
    private readonly beltRequirementsModel: typeof belt_requirements,
  ) {}

  async findAll(): Promise<belt_requirements[]> {
    return this.beltRequirementsModel.findAll();
  }

  async findOne(belt_order: number): Promise<belt_requirements> {
    const record = await this.beltRequirementsModel.findByPk(belt_order);
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
    return this.beltRequirementsModel.create(data);
  }

  async update(
    belt_order: number,
    data: Partial<belt_requirements>,
  ): Promise<belt_requirements> {
    const record = await this.findOne(belt_order);
    return record.update(data);
  }

  async remove(belt_order: number): Promise<void> {
    const record = await this.findOne(belt_order);
    await record.destroy();
  }
}
