import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  CreateStudentDto,
  students,
} from '../models/students';

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

  async create(createStudentsDto: CreateStudentDto): Promise<students> {
    return this.studentsModel.create(createStudentsDto);
  }

  async update(
    studentid: number,
    updateStudentsDto: Partial<students>,
  ): Promise<{ updated: boolean; student?: any }> {
    const student = await this.studentsModel.findOne({ where: { studentid } });

    console.log('student', student?.toJSON());

    const [affectedCount, affectedRows] = await this.studentsModel.update(
      updateStudentsDto,
      {
        where: { studentid },
        returning: true,
        logging: console.log,
      },
    );

    if (!affectedCount) {
      return { updated: false };
    }

    return {
      updated: true,
      student: affectedRows[0].get({ plain: true }),
    };
  }

  async remove(studentid: number): Promise<number> {
    return this.studentsModel.destroy({
      where: { studentid },
    });
  }
}
