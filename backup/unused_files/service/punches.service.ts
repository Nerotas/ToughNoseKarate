import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { punches } from '../models/punches';

@Injectable()
export class PunchesService {
  constructor(
    @InjectModel(punches)
    private punchesModel: typeof punches,
  ) {}

  async findAll(): Promise<punches[]> {
    return this.punchesModel.findAll();
  }

  async findOne(id: number): Promise<punches | null> {
    return this.punchesModel.findByPk(id);
  }

  async create(createPunchesDto: any): Promise<punches> {
    return this.punchesModel.create(createPunchesDto);
  }

  async update(
    id: number,
    updatePunchesDto: any,
  ): Promise<[number, punches[]]> {
    return this.punchesModel.update(updatePunchesDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.punchesModel.destroy({
      where: { id },
    });
  }
}
