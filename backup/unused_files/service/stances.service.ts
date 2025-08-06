import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { stances } from '../models/stances';

@Injectable()
export class StancesService {
  constructor(
    @InjectModel(stances)
    private stancesModel: typeof stances,
  ) {}

  async findAll(): Promise<stances[]> {
    return this.stancesModel.findAll();
  }

  async findOne(id: number): Promise<stances | null> {
    return this.stancesModel.findByPk(id);
  }

  async create(createStancesDto: any): Promise<stances> {
    return this.stancesModel.create(createStancesDto);
  }

  async update(
    id: number,
    updateStancesDto: any,
  ): Promise<[number, stances[]]> {
    return this.stancesModel.update(updateStancesDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.stancesModel.destroy({
      where: { id },
    });
  }
}
