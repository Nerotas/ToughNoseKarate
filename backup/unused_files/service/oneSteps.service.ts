import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { oneSteps } from '../models/oneSteps';

@Injectable()
export class OneStepsService {
  constructor(
    @InjectModel(oneSteps)
    private oneStepsModel: typeof oneSteps,
  ) {}

  async findAll(): Promise<oneSteps[]> {
    return this.oneStepsModel.findAll();
  }

  async findOne(id: number): Promise<oneSteps | null> {
    return this.oneStepsModel.findByPk(id);
  }

  async create(createOneStepsDto: any): Promise<oneSteps> {
    return this.oneStepsModel.create(createOneStepsDto);
  }

  async update(
    id: number,
    updateOneStepsDto: any,
  ): Promise<[number, oneSteps[]]> {
    return this.oneStepsModel.update(updateOneStepsDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.oneStepsModel.destroy({
      where: { id },
    });
  }
}
