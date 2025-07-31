import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { blocks } from '../models/blocks';

@Injectable()
export class BlocksService {
  constructor(
    @InjectModel(blocks)
    private blocksModel: typeof blocks,
  ) {}

  async findAll(): Promise<blocks[]> {
    return this.blocksModel.findAll();
  }

  async findOne(id: number): Promise<blocks> {
    return this.blocksModel.findByPk(id);
  }

  async create(createBlocksDto: Partial<blocks>): Promise<blocks> {
    return this.blocksModel.create(createBlocksDto);
  }

  async update(
    id: number,
    updateBlocksDto: Partial<blocks>,
  ): Promise<[number, blocks[]]> {
    return this.blocksModel.update(updateBlocksDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.blocksModel.destroy({
      where: { id },
    });
  }
}
