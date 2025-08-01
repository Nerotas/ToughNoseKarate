import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { selfDefenseDefinitions } from '../models/selfDefenseDefinitions';

@Injectable()
export class SelfDefenseDefinitionsService {
  constructor(
    @InjectModel(selfDefenseDefinitions)
    private selfDefenseDefinitionsModel: typeof selfDefenseDefinitions,
  ) {}

  async findAll(): Promise<selfDefenseDefinitions[]> {
    return this.selfDefenseDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<selfDefenseDefinitions | null> {
    return this.selfDefenseDefinitionsModel.findByPk(id);
  }

  async create(
    createSelfDefenseDefinitionsDto: any,
  ): Promise<selfDefenseDefinitions> {
    return this.selfDefenseDefinitionsModel.create(
      createSelfDefenseDefinitionsDto,
    );
  }

  async update(
    id: number,
    updateSelfDefenseDefinitionsDto: any,
  ): Promise<[number, selfDefenseDefinitions[]]> {
    return this.selfDefenseDefinitionsModel.update(
      updateSelfDefenseDefinitionsDto,
      {
        where: { id },
        returning: true,
      },
    );
  }

  async remove(id: number): Promise<number> {
    return this.selfDefenseDefinitionsModel.destroy({
      where: { id },
    });
  }
}
