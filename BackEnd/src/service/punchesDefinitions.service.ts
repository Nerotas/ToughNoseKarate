import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  punchesDefinitions,
  PunchesDefinitionsAttributes,
} from '../models/punchesDefinitions';

@Injectable()
export class PunchesDefinitionsService {
  constructor(
    @InjectModel(punchesDefinitions)
    private punchesDefinitionsModel: typeof punchesDefinitions,
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
        console.error(error);
      }
      const parts = v
        .split(/\r?\n|,/)
        .map((s) => s.trim())
        .filter(Boolean);
      return parts.length ? parts : undefined;
    }
    return undefined;
  }

  private toStringOrUndefined(v: unknown): string | undefined {
    if (v === undefined || v === null) return undefined;
    if (Array.isArray(v)) return v.map(String).filter(Boolean).join(', ');
    if (typeof v === 'string') return v.trim();
    return undefined;
  }

  private clean<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.fromEntries(
      Object.entries(obj).filter(([, v]) => v !== undefined),
    ) as Partial<T>;
  }

  async findAll(): Promise<punchesDefinitions[]> {
    return this.punchesDefinitionsModel.findAll();
  }

  async findOne(id: number): Promise<punchesDefinitions | null> {
    return this.punchesDefinitionsModel.findByPk(id);
  }

  async create(dto: PunchesDefinitionsAttributes): Promise<punchesDefinitions> {
    const payload: Partial<PunchesDefinitionsAttributes> = {
      name: dto.name,
      korean: dto.korean,
      description: dto.description,
      belt: dto.belt,
      beltColor: dto.beltColor,
      keyPoints: this.toStringArray((dto as any).keyPoints) ?? [],
      commonMistakes: this.toStringArray((dto as any).commonMistakes) ?? [],
      applications: this.toStringArray((dto as any).applications) ?? [],
      target:
        this.toStringOrUndefined(
          (dto as any).target ?? (dto as any).targetAreas,
        ) ?? null,
      execution: (dto as any).execution ?? null,
    };

    return this.punchesDefinitionsModel.create(
      payload as PunchesDefinitionsAttributes,
    );
  }

  async update(
    id: number,
    dto: Partial<PunchesDefinitionsAttributes>,
  ): Promise<[number, punchesDefinitions[]]> {
    const { id: _ignore, ...rest } = dto as any;

    const payload: Partial<PunchesDefinitionsAttributes> = {
      name: rest.name,
      korean: rest.korean,
      description: rest.description,
      belt: rest.belt,
      beltColor: rest.beltColor,
      keyPoints: this.toStringArray(rest.keyPoints),
      commonMistakes: this.toStringArray(rest.commonMistakes),
      applications: this.toStringArray(rest.applications),
      target: this.toStringOrUndefined(rest.target ?? rest.targetAreas),
      execution: rest.execution,
    };

    const cleaned = this.clean(payload);

    return this.punchesDefinitionsModel.update(cleaned, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.punchesDefinitionsModel.destroy({ where: { id } });
  }
}
