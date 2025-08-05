import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { students } from '../models/students';

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(students)
    private studentsModel: typeof students,
  ) {}

  async findAll(): Promise<students[]> {
    return this.studentsModel.findAll();
  }

  async findOne(studentid: number): Promise<students | null> {
    return this.studentsModel.findOne({ where: { studentid } });
  }

  async create(createStudentsDto: students): Promise<students> {
    return this.studentsModel.create(createStudentsDto);
  }

  async update(
    studentid: number,
    updateStudentsDto: any,
  ): Promise<[number, students[]]> {
    return this.studentsModel.update(updateStudentsDto, {
      where: { studentid },
      returning: true,
    });
  }

  async remove(studentid: number): Promise<number> {
    return this.studentsModel.destroy({
      where: { studentid },
    });
  }
}
