import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { stanceDefinitions } from '../models/stanceDefinitions';

@Injectable()
export class StanceDefinitionsService {
  constructor(
    @InjectModel(stanceDefinitions)
    private stanceDefinitionsModel: typeof stanceDefinitions,
  ) {}

  // Normalize incoming payload into the model's attribute shape (camelCase),
  // accept either camelCase or snake_case from clients.
  private normalizePayload(payload: any): any {
    // Normalize array fields if they are strings
    const arrayFields = ['keyPoints', 'commonMistakes', 'applications'];
    const normalized: any = {};
    for (const key of Object.keys(payload)) {
      const value = payload[key];
      if (value !== undefined) {
        if (arrayFields.includes(key)) {
          if (typeof value === 'string') {
            normalized[key] = [value];
          } else {
            normalized[key] = value;
          }
        } else {
          normalized[key] = value;
        }
      }
    }
    return normalized;
  }

  async findAll(): Promise<stanceDefinitions[]> {
    return this.stanceDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<stanceDefinitions | null> {
    return this.stanceDefinitionsModel.findByPk(id);
  }

  async create(createStanceDefinitionsDto: any): Promise<stanceDefinitions> {
    // DO NOT convert keys to snake_case here — model attributes are camelCase.
    const normalized = this.normalizePayload(createStanceDefinitionsDto);
    try {
      return await this.stanceDefinitionsModel.create(normalized);
    } catch (err) {
      console.error(
        'Failed creating stance, payload:',
        JSON.stringify(normalized),
      );
      console.error('Stance create error:', err);
      throw err;
    }
  }

  async update(
    id: number,
    updateStanceDefinitionsDto: any,
  ): Promise<[number, stanceDefinitions[]]> {
    const normalized = this.normalizePayload(updateStanceDefinitionsDto);
    try {
      return await this.stanceDefinitionsModel.update(normalized, {
        where: { id },
        returning: true,
      });
    } catch (err) {
      console.error(
        'Failed updating stance id:',
        id,
        'payload:',
        JSON.stringify(normalized),
      );
      console.error('Stance update error:', err);
      throw err;
    }
  }

  async remove(id: number): Promise<number> {
    return this.stanceDefinitionsModel.destroy({
      where: { id },
    });
  }
}
