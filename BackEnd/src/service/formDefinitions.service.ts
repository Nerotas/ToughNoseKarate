import { Injectable } from '@nestjs/common';
import {
  FormDefinitions,
  FormDefinitionsAttributes,
} from '../models/formDefinitions';

@Injectable()
export class FormDefinitionsService {
  private normalizePayload(payload: any): any {
    const normalized = { ...payload };

    // Ensure array fields are properly formatted for PostgreSQL
    ['keyPoints'].forEach((field) => {
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

  async create(createFormDefinitionDto: any): Promise<FormDefinitions> {
    const normalized = this.normalizePayload(createFormDefinitionDto);
    const formDefinition = await FormDefinitions.create(normalized);
    return formDefinition;
  }

  async findAll(): Promise<FormDefinitions[]> {
    const formDefinitions = await FormDefinitions.findAll({
      order: [['difficultyLevel', 'ASC']],
    });

    return formDefinitions;
  }

  async findOne(id: number): Promise<FormDefinitions | null> {
    const formDefinition = await FormDefinitions.findOne({
      where: {
        id,
      },
    });

    return formDefinition;
  }

  async findByBeltRank(beltRank: string): Promise<FormDefinitions[]> {
    const formDefinitions = await FormDefinitions.findAll({
      where: {
        beltRank: beltRank,
      },
      order: [['difficultyLevel', 'ASC']],
    });

    return formDefinitions;
  }

  async update(
    id: number,
    updateFormDefinitionDto: any,
  ): Promise<FormDefinitions | null> {
    const normalized = this.normalizePayload(updateFormDefinitionDto);
    const [affectedCount] = await FormDefinitions.update(normalized, {
      where: { id },
    });

    if (affectedCount === 0) {
      return null;
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<boolean> {
    const affectedCount = await FormDefinitions.destroy({
      where: { id },
    });

    return affectedCount > 0;
  }

  // Bulk insert method for seeding data
  async bulkCreate(formDefinitions: any[]): Promise<FormDefinitions[]> {
    const normalized = formDefinitions.map((form) =>
      this.normalizePayload(form),
    );
    return await FormDefinitions.bulkCreate(normalized);
  }
}
