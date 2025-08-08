import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { stanceDefinitions } from '../models/stanceDefinitions';

@Injectable()
export class StanceDefinitionsService {
  constructor(
    @InjectModel(stanceDefinitions)
    private stanceDefinitionsModel: typeof stanceDefinitions,
  ) {}

  private normalizePayload(payload: any): any {
    const normalized = { ...payload };

    // Ensure array fields are properly formatted for PostgreSQL
    ['keyPoints', 'commonMistakes', 'applications'].forEach((field) => {
      if (normalized[field] !== undefined && normalized[field] !== null) {
        // Coerce to array if it's not already
        if (!Array.isArray(normalized[field])) {
          normalized[field] = [normalized[field]];
        }
      }
    });

    // Remove undefined fields to avoid database issues
    Object.keys(normalized).forEach((key) => {
      if (normalized[key] === undefined) {
        delete normalized[key];
      }
    });

    return normalized;
  }

  async findAll(): Promise<stanceDefinitions[]> {
    return this.stanceDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<stanceDefinitions | null> {
    return this.stanceDefinitionsModel.findByPk(id);
  }

  async create(createStanceDefinitionsDto: any): Promise<stanceDefinitions> {
    const normalized = this.normalizePayload(createStanceDefinitionsDto);
    return this.stanceDefinitionsModel.create(normalized);
  }

  async update(
    id: number,
    updateStanceDefinitionsDto: any,
  ): Promise<[number, stanceDefinitions[]]> {
    const normalized = this.normalizePayload(updateStanceDefinitionsDto);
    return this.stanceDefinitionsModel.update(normalized, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.stanceDefinitionsModel.destroy({
      where: { id },
    });
  }
}
