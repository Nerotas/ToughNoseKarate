import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { punchesDefinitions } from '../models/punchesDefinitions';

@Injectable()
export class PunchesDefinitionsService {
  constructor(
    @InjectModel(punchesDefinitions)
    private punchesDefinitionsModel: typeof punchesDefinitions,
  ) {}

  async findAll(): Promise<punchesDefinitions[]> {
    return this.punchesDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<punchesDefinitions | null> {
    return this.punchesDefinitionsModel.findByPk(id);
  }

  async create(createPunchesDefinitionsDto: any): Promise<punchesDefinitions> {
    return this.punchesDefinitionsModel.create(createPunchesDefinitionsDto);
  }

  async update(
    id: number,
    updatePunchesDefinitionsDto: any,
  ): Promise<[number, punchesDefinitions[]]> {
    return this.punchesDefinitionsModel.update(updatePunchesDefinitionsDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.punchesDefinitionsModel.destroy({
      where: { id },
    });
  }
}
