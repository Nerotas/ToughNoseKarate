import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { selfDefenseDefinitions } from '../models/selfDefenseDefinitions';

@Injectable()
export class SelfDefenseDefinitionsService {
  constructor(
    @InjectModel(selfDefenseDefinitions)
    private selfDefenseDefinitionsModel: typeof selfDefenseDefinitions,
  ) {}

  private normalizePayload(payload: any): any {
    const normalized = { ...payload };

    // Ensure array fields are properly formatted for PostgreSQL
    [
      'setup',
      'execution',
      'keyPoints',
      'commonMistakes',
      'applications',
    ].forEach((field) => {
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

  async findAll(): Promise<selfDefenseDefinitions[]> {
    return this.selfDefenseDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<selfDefenseDefinitions | null> {
    return this.selfDefenseDefinitionsModel.findByPk(id);
  }

  async create(
    createSelfDefenseDefinitionsDto: any,
  ): Promise<selfDefenseDefinitions> {
    const normalized = this.normalizePayload(createSelfDefenseDefinitionsDto);
    return this.selfDefenseDefinitionsModel.create(normalized);
  }

  async update(
    id: number,
    updateSelfDefenseDefinitionsDto: any,
  ): Promise<[number, selfDefenseDefinitions[]]> {
    const normalized = this.normalizePayload(updateSelfDefenseDefinitionsDto);
    return this.selfDefenseDefinitionsModel.update(normalized, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.selfDefenseDefinitionsModel.destroy({
      where: { id },
    });
  }
}
