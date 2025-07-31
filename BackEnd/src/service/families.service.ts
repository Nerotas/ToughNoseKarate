import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { families } from '../models/families';

@Injectable()
export class FamiliesService {
  constructor(
    @InjectModel(families)
    private familiesModel: typeof families,
  ) {}

  async findAll(): Promise<families[]> {
    return this.familiesModel.findAll();
  }

  async findOne(studentid: number): Promise<families> {
    return this.familiesModel.findOne({ where: { studentid } });
  }

  async findByStudentId(studentid: number): Promise<families[]> {
    return this.familiesModel.findAll({ where: { studentid } });
  }

  async findByParentId(parentid: number): Promise<families[]> {
    return this.familiesModel.findAll({ where: { parentid } });
  }

  // Note: families is a VIEW, so create/update/delete operations may not be supported
  async create(createFamiliesDto: Partial<families>): Promise<families> {
    return this.familiesModel.create(createFamiliesDto);
  }

  async update(
    studentid: number,
    updateFamiliesDto: Partial<families>,
  ): Promise<[number, families[]]> {
    return this.familiesModel.update(updateFamiliesDto, {
      where: { studentid },
      returning: true,
    });
  }

  async remove(studentid: number): Promise<number> {
    return this.familiesModel.destroy({
      where: { studentid },
    });
  }
}
