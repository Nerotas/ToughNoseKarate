import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { kicksDefinitions } from '../models/kicksDefinitions';

@Injectable()
export class KicksDefinitionsService {
  constructor(
    @InjectModel(kicksDefinitions)
    private kicksDefinitionsModel: typeof kicksDefinitions,
  ) {}

  async findAll(): Promise<kicksDefinitions[]> {
    return this.kicksDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<kicksDefinitions | null> {
    return this.kicksDefinitionsModel.findByPk(id);
  }

  async create(createKicksDefinitionsDto: any): Promise<kicksDefinitions> {
    return this.kicksDefinitionsModel.create(createKicksDefinitionsDto);
  }

  async update(
    id: number,
    updateKicksDefinitionsDto: any,
  ): Promise<[number, kicksDefinitions[]]> {
    return this.kicksDefinitionsModel.update(updateKicksDefinitionsDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.kicksDefinitionsModel.destroy({
      where: { id },
    });
  }
}
