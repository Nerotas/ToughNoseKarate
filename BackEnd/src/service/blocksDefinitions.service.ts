import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  blocksDefinitions,
  BlocksDefinitionsAttributes,
} from '../models/blocksDefinitions';

@Injectable()
export class BlocksDefinitionsService {
  constructor(
    @InjectModel(blocksDefinitions)
    private blocksDefinitionsModel: typeof blocksDefinitions,
  ) {}

  // Helpers
  private toStringArray(v: unknown): string[] | undefined {
    if (v === undefined || v === null) return undefined;
    if (Array.isArray(v)) return v.map(String);
    if (typeof v === 'string') {
      try {
        const parsed = JSON.parse(v);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch (error) {
        console.error('Failed to parse JSON in blocks definitions:', error);
      }
      const parts = v
        .split(/\r?\n|,/)
        .map((s) => s.trim())
        .filter(Boolean);
      return parts.length ? parts : undefined;
    }
    return undefined;
  }

  private clean<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v !== undefined),
    ) as Partial<T>;
  }

  async findAll(): Promise<blocksDefinitions[]> {
    return this.blocksDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<blocksDefinitions | null> {
    return this.blocksDefinitionsModel.findByPk(id);
  }

  async create(dto: BlocksDefinitionsAttributes): Promise<blocksDefinitions> {
    const payload: Partial<BlocksDefinitionsAttributes> = {
      blockName: dto.blockName,
      technique: dto.technique,
      stance: dto.stance,
      belt: dto.belt,
      beltColor: dto.beltColor,
      execution: this.toStringArray((dto as any).execution) ?? [],
      keyPoints: this.toStringArray((dto as any).keyPoints) ?? [],
      commonMistakes: this.toStringArray((dto as any).commonMistakes) ?? [],
      applications: this.toStringArray((dto as any).applications) ?? [],
    };

    return this.blocksDefinitionsModel.create(
      payload as BlocksDefinitionsAttributes,
    );
  }

  async update(
    id: number,
    dto: Partial<BlocksDefinitionsAttributes>,
  ): Promise<[number, blocksDefinitions[]]> {
    const { id: _ignore, ...rest } = dto as any;

    const payload: Partial<BlocksDefinitionsAttributes> = {
      blockName: rest.blockName,
      technique: rest.technique,
      stance: rest.stance,
      belt: rest.belt,
      beltColor: rest.beltColor,
      execution: this.toStringArray(rest.execution),
      keyPoints: this.toStringArray(rest.keyPoints),
      commonMistakes: this.toStringArray(rest.commonMistakes),
      applications: this.toStringArray(rest.applications),
    };

    const cleaned = this.clean(payload);

    return this.blocksDefinitionsModel.update(cleaned, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.blocksDefinitionsModel.destroy({ where: { id } });
  }
}
