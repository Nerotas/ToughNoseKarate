import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { beltRequirements } from '../models/beltRequirements';

@Injectable()
export class BeltRequirementsService {
  constructor(
    @InjectModel(beltRequirements)
    private beltRequirementsModel: typeof beltRequirements,
  ) {}

  async findAll(): Promise<beltRequirements[]> {
    return this.beltRequirementsModel.findAll();
  }

  async findOne(beltRank: string): Promise<beltRequirements> {
    return this.beltRequirementsModel.findOne({ where: { beltRank } });
  }

  async create(
    createBeltRequirementsDto: Partial<beltRequirements>,
  ): Promise<beltRequirements> {
    return this.beltRequirementsModel.create(createBeltRequirementsDto);
  }

  async update(
    beltRank: string,
    updateBeltRequirementsDto: Partial<beltRequirements>,
  ): Promise<[number, beltRequirements[]]> {
    return this.beltRequirementsModel.update(updateBeltRequirementsDto, {
      where: { beltRank },
      returning: true,
    });
  }

  async remove(beltRank: string): Promise<number> {
    return this.beltRequirementsModel.destroy({
      where: { beltRank },
    });
  }
}
