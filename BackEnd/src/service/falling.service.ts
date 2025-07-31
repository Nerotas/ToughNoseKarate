import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { falling } from '../models/falling';

@Injectable()
export class FallingService {
  constructor(
    @InjectModel(falling)
    private fallingModel: typeof falling,
  ) {}

  async findAll(): Promise<falling[]> {
    return this.fallingModel.findAll();
  }

  async findOne(id: number): Promise<falling> {
    return this.fallingModel.findByPk(id);
  }

  async create(createFallingDto: Partial<falling>): Promise<falling> {
    return this.fallingModel.create(createFallingDto);
  }

  async update(
    id: number,
    updateFallingDto: Partial<falling>,
  ): Promise<[number, falling[]]> {
    return this.fallingModel.update(updateFallingDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.fallingModel.destroy({
      where: { id },
    });
  }
}
