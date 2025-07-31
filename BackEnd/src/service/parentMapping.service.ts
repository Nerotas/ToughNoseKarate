import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { parentMapping } from '../models/parentMapping';

@Injectable()
export class ParentMappingService {
  constructor(
    @InjectModel(parentMapping)
    private parentMappingModel: typeof parentMapping,
  ) {}

  async findAll(): Promise<parentMapping[]> {
    return this.parentMappingModel.findAll();
  }

  async findOne(idparentMapping: number): Promise<parentMapping | null> {
    return this.parentMappingModel.findOne({ where: { idparentMapping } });
  }

  async create(createParentMappingDto: any): Promise<parentMapping> {
    return this.parentMappingModel.create(createParentMappingDto);
  }

  async update(
    idparentMapping: number,
    updateParentMappingDto: any,
  ): Promise<[number, parentMapping[]]> {
    return this.parentMappingModel.update(updateParentMappingDto, {
      where: { idparentMapping },
      returning: true,
    });
  }

  async remove(idparentMapping: number): Promise<number> {
    return this.parentMappingModel.destroy({
      where: { idparentMapping },
    });
  }
}
