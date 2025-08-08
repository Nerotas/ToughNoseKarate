import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { kicksDefinitions } from '../models/kicksDefinitions';

@Injectable()
export class KicksDefinitionsService {
  constructor(
    @InjectModel(kicksDefinitions)
    private kicksDefinitionsModel: typeof kicksDefinitions,
  ) {}

  private normalizePayload(payload: any): any {
    const normalized = { ...payload };

    // Ensure array fields are properly formatted for PostgreSQL
    ['execution', 'keyPoints', 'commonMistakes', 'applications'].forEach(
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

  async findAll(): Promise<kicksDefinitions[]> {
    return this.kicksDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<kicksDefinitions | null> {
    return this.kicksDefinitionsModel.findByPk(id);
  }

  async create(createKicksDefinitionsDto: any): Promise<kicksDefinitions> {
    const normalized = this.normalizePayload(createKicksDefinitionsDto);
    return this.kicksDefinitionsModel.create(normalized);
  }

  async update(
    id: number,
    updateKicksDefinitionsDto: any,
  ): Promise<[number, kicksDefinitions[]]> {
    const normalized = this.normalizePayload(updateKicksDefinitionsDto);
    return this.kicksDefinitionsModel.update(normalized, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.kicksDefinitionsModel.destroy({
      where: { id },
    });
  }
}
