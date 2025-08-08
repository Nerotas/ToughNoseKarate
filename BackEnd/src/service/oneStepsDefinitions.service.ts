import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { oneStepsDefinitions } from '../models/oneStepsDefinitions';

@Injectable()
export class OneStepsDefinitionsService {
  constructor(
    @InjectModel(oneStepsDefinitions)
    private oneStepsDefinitionsModel: typeof oneStepsDefinitions,
  ) {}

  private normalizePayload(payload: any): any {
    const normalized = { ...payload };

    // Ensure array fields are properly formatted for PostgreSQL
    ['defense', 'keyPoints', 'commonMistakes', 'applications'].forEach(
      (field) => {
        if (normalized[field] !== undefined && normalized[field] !== null) {
          // Coerce to array if it's not already
          if (!Array.isArray(normalized[field])) {
            normalized[field] = [normalized[field]];
          }
        }
      },
    );

    // Remove undefined fields to avoid database issues
    Object.keys(normalized).forEach((key) => {
      if (normalized[key] === undefined) {
        delete normalized[key];
      }
    });

    return normalized;
  }

  async findAll(): Promise<oneStepsDefinitions[]> {
    return this.oneStepsDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<oneStepsDefinitions | null> {
    return this.oneStepsDefinitionsModel.findByPk(id);
  }

  async create(
    createOneStepsDefinitionsDto: any,
  ): Promise<oneStepsDefinitions> {
    const normalized = this.normalizePayload(createOneStepsDefinitionsDto);
    return this.oneStepsDefinitionsModel.create(normalized);
  }

  async update(
    id: number,
    updateOneStepsDefinitionsDto: any,
  ): Promise<[number, oneStepsDefinitions[]]> {
    const normalized = this.normalizePayload(updateOneStepsDefinitionsDto);
    return this.oneStepsDefinitionsModel.update(normalized, {
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
