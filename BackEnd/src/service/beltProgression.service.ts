import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  beltProgression,
  beltProgressionAttributes,
} from '../models/beltProgression';
import { students } from '../models/students';
import { studentTests } from '../models/studentTests';

@Injectable()
export class BeltProgressionService {
  constructor(
    @InjectModel(beltProgression)
    private beltProgressionModel: typeof beltProgression,
  ) {}

  async findAll(): Promise<beltProgression[]> {
    return this.beltProgressionModel.findAll({
      include: [
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferedName'],
        },
        {
          model: studentTests,
          as: 'test',
          required: false,
        },
      ],
      order: [['promoted_date', 'DESC']],
    });
  }

  async findByStudentId(studentId: number): Promise<beltProgression[]> {
    return this.beltProgressionModel.findAll({
      where: { studentid: studentId },
      include: [
        {
          model: studentTests,
          as: 'test',
          required: false,
        },
      ],
      order: [['promoted_date', 'DESC']],
    });
  }

  async getCurrentBelt(studentId: number): Promise<beltProgression | null> {
    return this.beltProgressionModel.findOne({
      where: {
        studentid: studentId,
        is_current: 1,
      },
      include: [
        {
          model: studentTests,
          as: 'test',
          required: false,
        },
      ],
    });
  }

  async findOne(id: number): Promise<beltProgression | null> {
    return this.beltProgressionModel.findByPk(id, {
      include: [
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferedName'],
        },
        {
          model: studentTests,
          as: 'test',
          required: false,
        },
      ],
    });
  }

  async create(
    beltProgressionData: Omit<beltProgressionAttributes, 'progression_id'>,
  ): Promise<beltProgression> {
    // If this is marked as current, unmark all other current belts for this student
    if (beltProgressionData.is_current === 1) {
      await this.beltProgressionModel.update(
        { is_current: 0 },
        { where: { studentid: beltProgressionData.studentid, is_current: 1 } },
      );
    }

    return this.beltProgressionModel.create(beltProgressionData);
  }

  async update(
    id: number,
    beltProgressionData: Partial<beltProgressionAttributes>,
  ): Promise<[number]> {
    // If this is being marked as current, unmark all other current belts for this student
    if (beltProgressionData.is_current === 1) {
      const progression = await this.beltProgressionModel.findByPk(id);
      if (progression) {
        await this.beltProgressionModel.update(
          { is_current: 0 },
          {
            where: {
              studentid: progression.studentid,
              is_current: 1,
              progression_id: { $ne: id },
            },
          },
        );
      }
    }

    return this.beltProgressionModel.update(beltProgressionData, {
      where: { progression_id: id },
    });
  }

  async remove(id: number): Promise<number> {
    return this.beltProgressionModel.destroy({
      where: { progression_id: id },
    });
  }

  async getBeltHistory(studentId: number): Promise<any> {
    const progression = await this.beltProgressionModel.findAll({
      where: { studentid: studentId },
      include: [
        {
          model: studentTests,
          as: 'test',
          required: false,
        },
      ],
      order: [['promoted_date', 'DESC']],
    });

    const currentBelt = progression.find((p) => p.is_current === 1);

    return {
      currentBelt: currentBelt,
      progression: progression,
      totalPromotions: progression.length,
      timeAsCurrentBelt: currentBelt
        ? this.calculateTimeInBelt(currentBelt.promoted_date)
        : null,
    };
  }

  private calculateTimeInBelt(promotedDate: string): number {
    const promoted = new Date(promotedDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - promoted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
}
