import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { oneStepsDefinitions } from '../models/oneStepsDefinitions';

@Injectable()
export class OneStepsDefinitionsService {
  constructor(
    @InjectModel(oneStepsDefinitions)
    private oneStepsDefinitionsModel: typeof oneStepsDefinitions,
  ) {}

  async findAll(): Promise<oneStepsDefinitions[]> {
    return this.oneStepsDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<oneStepsDefinitions | null> {
    return this.oneStepsDefinitionsModel.findByPk(id);
  }

  async create(
    createOneStepsDefinitionsDto: any,
  ): Promise<oneStepsDefinitions> {
    return this.oneStepsDefinitionsModel.create(createOneStepsDefinitionsDto);
  }

  async update(
    id: number,
    updateOneStepsDefinitionsDto: any,
  ): Promise<[number, oneStepsDefinitions[]]> {
    return this.oneStepsDefinitionsModel.update(updateOneStepsDefinitionsDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.oneStepsDefinitionsModel.destroy({
      where: { id },
    });
  }
}
