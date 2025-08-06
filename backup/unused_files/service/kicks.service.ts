import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { kicks } from '../models/kicks';

@Injectable()
export class KicksService {
  constructor(
    @InjectModel(kicks)
    private kicksModel: typeof kicks,
  ) {}

  async findAll(): Promise<kicks[]> {
    return this.kicksModel.findAll();
  }

  async findOne(id: number): Promise<kicks | null> {
    return this.kicksModel.findByPk(id);
  }

  async create(createKicksDto: any): Promise<kicks> {
    return this.kicksModel.create(createKicksDto);
  }

  async update(id: number, updateKicksDto: any): Promise<[number, kicks[]]> {
    return this.kicksModel.update(updateKicksDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.kicksModel.destroy({
      where: { id },
    });
  }
}
