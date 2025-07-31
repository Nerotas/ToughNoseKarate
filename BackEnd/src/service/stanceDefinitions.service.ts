import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { stanceDefinitions } from '../models/stanceDefinitions';

@Injectable()
export class StanceDefinitionsService {
  constructor(
    @InjectModel(stanceDefinitions)
    private stanceDefinitionsModel: typeof stanceDefinitions,
  ) {}

  async findAll(): Promise<stanceDefinitions[]> {
    return this.stanceDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<stanceDefinitions | null> {
    return this.stanceDefinitionsModel.findByPk(id);
  }

  async create(createStanceDefinitionsDto: any): Promise<stanceDefinitions> {
    return this.stanceDefinitionsModel.create(createStanceDefinitionsDto);
  }

  async update(
    id: number,
    updateStanceDefinitionsDto: any,
  ): Promise<[number, stanceDefinitions[]]> {
    return this.stanceDefinitionsModel.update(updateStanceDefinitionsDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.stanceDefinitionsModel.destroy({
      where: { id },
    });
  }
}
