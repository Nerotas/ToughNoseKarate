import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { studentTests, studentTestsAttributes } from '../models/studentTests';
import { testResults } from '../models/testResults';
import { students } from '../models/students';

@Injectable()
export class StudentTestsService {
  constructor(
    @InjectModel(studentTests)
    private studentTestsModel: typeof studentTests,
    @InjectModel(testResults)
    private testResultsModel: typeof testResults,
  ) {}

  async findAll(): Promise<studentTests[]> {
    return this.studentTestsModel.findAll({
      include: [
        {
          model: testResults,
          as: 'test_results',
        },
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferedName'],
        },
      ],
      order: [['test_date', 'DESC']],
    });
  }

  async findByStudentId(studentId: number): Promise<studentTests[]> {
    return this.studentTestsModel.findAll({
      where: { studentid: studentId },
      include: [
        {
          model: testResults,
          as: 'test_results',
        },
      ],
      order: [['test_date', 'DESC']],
    });
  }

  async findOne(id: number): Promise<studentTests | null> {
    return this.studentTestsModel.findByPk(id, {
      include: [
        {
          model: testResults,
          as: 'test_results',
        },
        {
          model: students,
          as: 'student',
          attributes: ['firstName', 'lastName', 'preferedName'],
        },
      ],
    });
  }

  async create(
    studentTestData: Omit<studentTestsAttributes, 'testid'>,
  ): Promise<studentTests> {
    return this.studentTestsModel.create(studentTestData);
  }

  async update(
    id: number,
    studentTestData: Partial<studentTestsAttributes>,
  ): Promise<[number]> {
    return this.studentTestsModel.update(studentTestData, {
      where: { testid: id },
    });
  }

  async remove(id: number): Promise<number> {
    return this.studentTestsModel.destroy({
      where: { testid: id },
    });
  }

  async getTestHistory(studentId: number): Promise<any> {
    const tests = await this.studentTestsModel.findAll({
      where: { studentid: studentId },
      include: [
        {
          model: testResults,
          as: 'test_results',
        },
      ],
      order: [['test_date', 'DESC']],
    });

    const summary = {
      totalTests: tests.length,
      passedTests: tests.filter((test) => test.passed === 1).length,
      failedTests: tests.filter((test) => test.passed === 0).length,
      averageScore:
        tests.length > 0
          ? tests.reduce((sum, test) => sum + (test.overall_score || 0), 0) /
            tests.length
          : 0,
      lastTestDate: tests.length > 0 ? tests[0].test_date : null,
      lastTestScore: tests.length > 0 ? tests[0].overall_score : null,
      tests: tests,
    };

    return summary;
  }
}
