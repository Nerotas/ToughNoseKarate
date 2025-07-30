import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  students,
  studentsCreationAttributes,
} from '../models/students';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(students)
    private readonly studentsModel: typeof students,
  ) {}

  async findAll(): Promise<students[]> {
    return this.studentsModel.findAll();
  }

  async findOne(studentid: number): Promise<students> {
    const record = await this.studentsModel.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(`Student with id ${studentid} not found`);
    }
    return record;
  }

  async create(data: studentsCreationAttributes): Promise<students> {
    return this.studentsModel.create(data);
  }

  async update(
    studentid: number,
    data: Partial<students>,
  ): Promise<students> {
    const record = await this.findOne(studentid);
    return record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }

  async findActiveStudents(): Promise<students[]> {
    return this.studentsModel.findAll({
      where: {
        active: 1,
      },
    });
  }

  async findStudentsByRank(rank: string): Promise<students[]> {
    return this.studentsModel.findAll({
      where: {
        rank,
      },
    });
  }
}
