import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { stanceDefinitions } from '../models/stanceDefinitions';
import { camelToSnake } from 'src/utils/CamelToSnake';

@Injectable()
export class StanceDefinitionsService {
  constructor(
    @InjectModel(stanceDefinitions)
    private stanceDefinitionsModel: typeof stanceDefinitions,
  ) {}

  // Normalize incoming payload into the model's attribute shape (camelCase),
  // accept either camelCase or snake_case from clients.
  private normalizePayload(payload: any): any {
    if (!payload || typeof payload !== 'object') return payload;

    // helper: snake_case -> camelCase for a single key
    const snakeToCamelKey = (k: string) =>
      k.replace(/_([a-z0-9])/g, (_, c) => c.toUpperCase());

    // recursively convert object/array keys from snake_case -> camelCase
    const convertKeys = (input: any): any => {
      if (input === null || input === undefined) return input;
      if (Array.isArray(input)) return input.map(convertKeys);
      if (typeof input === 'object' && input.constructor === Object) {
        const out: Record<string, any> = {};
        for (const [k, v] of Object.entries(input)) {
          out[snakeToCamelKey(k)] = convertKeys(v);
        }
        return out;
      }
      return input;
    };

    const converted = convertKeys(payload);

    // whitelist of model attributes (camelCase) to accept -- extend as model grows
    const allowed = new Set([
      'id',
      'name',
      'korean',
      'description',
      'beltRank',
      'beltColor',
      'position',
      'bodyPosition',
      'keyPoints',
      'commonMistakes',
      'applications',
      'createdAt',
      'updatedAt',
    ]);

    const normalized: Record<string, any> = {};
    for (const [k, v] of Object.entries(converted)) {
      if (allowed.has(k)) normalized[k] = v;
    }

    // Coerce known array fields to arrays if a single value was provided
    ['keyPoints', 'commonMistakes', 'applications'].forEach((f) => {
      if (normalized[f] !== undefined && normalized[f] !== null) {
        if (!Array.isArray(normalized[f])) normalized[f] = [normalized[f]];
      }
    });

    // Remove undefined so Sequelize won't write them
    Object.keys(normalized).forEach((k) => {
      if (normalized[k] === undefined) delete normalized[k];
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
