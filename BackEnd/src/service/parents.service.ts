import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { parents } from '../models/parents';

@Injectable()
export class ParentsService {
  constructor(
    @InjectModel(parents)
    private parentsModel: typeof parents,
  ) {}

  async findAll(): Promise<parents[]> {
    return this.parentsModel.findAll();
  }

  async findOne(parentid: number): Promise<parents | null> {
    return this.parentsModel.findOne({ where: { parentid } });
  }

  async create(createParentsDto: any): Promise<parents> {
    return this.parentsModel.create(createParentsDto);
  }

  async update(
    parentid: number,
    updateParentsDto: any,
  ): Promise<[number, parents[]]> {
    return this.parentsModel.update(updateParentsDto, {
      where: { parentid },
      returning: true,
    });
  }

  async remove(parentid: number): Promise<number> {
    return this.parentsModel.destroy({
      where: { parentid },
    });
  }
}
