import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { forms } from '../models/forms';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(forms)
    private formsModel: typeof forms,
  ) {}

  async findAll(): Promise<forms[]> {
    return this.formsModel.findAll();
  }

  async findOne(id: number): Promise<forms | null> {
    return this.formsModel.findByPk(id);
  }

  async create(createFormsDto: any): Promise<forms> {
    return this.formsModel.create(createFormsDto);
  }

  async update(id: number, updateFormsDto: any): Promise<[number, forms[]]> {
    return this.formsModel.update(updateFormsDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.formsModel.destroy({
      where: { id },
    });
  }
}
