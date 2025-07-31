import { Injectable, NotFoundException } from '@nestjs/common';
import { students, studentsCreationAttributes } from '../models/students';
import { DatabaseService } from './database.service';

@Injectable()
export class StudentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<students[]> {
    const models = this.databaseService.getModels();
    return await models.students.findAll();
  }

  async findActiveStudents(): Promise<students[]> {
    const models = this.databaseService.getModels();
    return await models.students.findAll({ where: { active: true } });
  }

  async findStudentsByRank(rank: string): Promise<students[]> {
    const models = this.databaseService.getModels();
    return await models.students.findAll({ where: { rank } });
  }

  async findOne(studentid: number): Promise<students> {
    const models = this.databaseService.getModels();
    const record = await models.students.findByPk(studentid);
    if (!record) {
      throw new NotFoundException(
        `Student with studentid ${studentid} not found`,
      );
    }
    return record;
  }

  async create(data: studentsCreationAttributes): Promise<students> {
    const models = this.databaseService.getModels();
    return await models.students.create(data);
  }

  async update(studentid: number, data: Partial<students>): Promise<students> {
    const record = await this.findOne(studentid);
    return await record.update(data);
  }

  async remove(studentid: number): Promise<void> {
    const record = await this.findOne(studentid);
    await record.destroy();
  }
}
