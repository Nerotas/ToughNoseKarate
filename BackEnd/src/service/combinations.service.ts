import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { combinations } from '../models/combinations';

@Injectable()
export class CombinationsService {
  constructor(
    @InjectModel(combinations)
    private combinationsModel: typeof combinations,
  ) {}

  async findAll(): Promise<combinations[]> {
    return this.combinationsModel.findAll();
  }

  async findOne(id: number): Promise<combinations> {
    return this.combinationsModel.findByPk(id);
  }

  async create(
    createCombinationsDto: Partial<combinations>,
  ): Promise<combinations> {
    return this.combinationsModel.create(createCombinationsDto);
  }

  async update(
    id: number,
    updateCombinationsDto: Partial<combinations>,
  ): Promise<[number, combinations[]]> {
    return this.combinationsModel.update(updateCombinationsDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.combinationsModel.destroy({
      where: { id },
    });
  }
}
