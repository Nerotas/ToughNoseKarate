import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { StudentProgressService } from '../service/studentProgress.service';
import { StudentProgressAttributes } from '../models/studentProgress';

@ApiTags('Student Progress')
@Controller({ path: 'student-progress', version: '1' })
export class StudentProgressController {
  constructor(
    private readonly studentProgressService: StudentProgressService,
  ) {}

  @Get(':studentId')
  @ApiOperation({
    summary: 'Get complete student progress by ID',
    description:
      'Retrieves all martial arts progress data for a specific student including blocks, combinations, falling, forms, kicks, one-steps, punches, and stances.',
  })
  @ApiParam({
    name: 'studentId',
    type: 'number',
    description: 'The unique identifier of the student',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Student progress data retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        studentid: { type: 'number', example: 1 },
        firstName: { type: 'string', example: 'John' },
        lastName: { type: 'string', example: 'Doe' },
        beltRank: { type: 'string', example: 'yellow' },
        blocks: {
          type: 'object',
          properties: {
            low: { type: 'string', example: 'proficient' },
            high: { type: 'string', example: 'learning' },
            // ... other block properties
          },
        },
        // ... other progress categories
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found.',
  })
  async getStudentProgress(
    @Param('studentId') studentId: string,
  ): Promise<StudentProgressAttributes> {
    const studentIdNum = parseInt(studentId, 10);

    if (isNaN(studentIdNum)) {
      throw new HttpException('Invalid student ID', HttpStatus.BAD_REQUEST);
    }

    const studentProgress =
      await this.studentProgressService.getStudentProgressById(studentIdNum);

    if (!studentProgress) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    return studentProgress;
  }

  @Get(':studentId/summary')
  @ApiOperation({
    summary: 'Get student progress summary',
    description:
      'Retrieves a summary of student progress including completion percentages and category status.',
  })
  @ApiParam({
    name: 'studentId',
    type: 'number',
    description: 'The unique identifier of the student',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Student progress summary retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        studentInfo: {
          type: 'object',
          properties: {
            studentid: { type: 'number', example: 1 },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            beltRank: { type: 'string', example: 'yellow' },
          },
        },
        progressSummary: {
          type: 'object',
          properties: {
            totalCategories: { type: 'number', example: 8 },
            categoriesWithData: { type: 'number', example: 5 },
            completionPercentage: { type: 'number', example: 63 },
            categories: {
              type: 'object',
              properties: {
                blocks: { type: 'boolean', example: true },
                combinations: { type: 'boolean', example: true },
                falling: { type: 'boolean', example: false },
                // ... other categories
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found.',
  })
  async getStudentProgressSummary(@Param('studentId') studentId: string) {
    const studentIdNum = parseInt(studentId, 10);

    if (isNaN(studentIdNum)) {
      throw new HttpException('Invalid student ID', HttpStatus.BAD_REQUEST);
    }

    const progressSummary =
      await this.studentProgressService.getStudentProgressSummary(studentIdNum);

    if (!progressSummary) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    return progressSummary;
  }

  @Get()
  @ApiOperation({
    summary: 'Get all students progress',
    description:
      'Retrieves complete progress data for all students. WARNING: This can be a heavy operation for large datasets.',
  })
  @ApiResponse({
    status: 200,
    description: 'All students progress data retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          studentid: { type: 'number', example: 1 },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          // ... complete student progress structure
        },
      },
    },
  })
  async getAllStudentsProgress(): Promise<StudentProgressAttributes[]> {
    return await this.studentProgressService.getAllStudentsProgress();
  }

  @Get('categories/:studentId')
  @ApiOperation({
    summary: 'Get student progress by category',
    description:
      'Retrieves progress data organized by martial arts categories for easy frontend consumption.',
  })
  @ApiParam({
    name: 'studentId',
    type: 'number',
    description: 'The unique identifier of the student',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Student progress categories retrieved successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Student not found.',
  })
  async getStudentProgressByCategories(@Param('studentId') studentId: string) {
    const studentIdNum = parseInt(studentId, 10);

    if (isNaN(studentIdNum)) {
      throw new HttpException('Invalid student ID', HttpStatus.BAD_REQUEST);
    }

    const studentProgress =
      await this.studentProgressService.getStudentProgressById(studentIdNum);

    if (!studentProgress) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    // Return organized data for frontend consumption
    return {
      student: {
        studentid: studentProgress.studentid,
        firstName: studentProgress.firstName,
        lastName: studentProgress.lastName,
        preferedName: studentProgress.preferedName,
        beltRank: studentProgress.beltRank,
        active: studentProgress.active,
        eligibleForTesting: studentProgress.eligibleForTesting,
      },
      martialArtsProgress: {
        blocks: studentProgress.blocks,
        combinations: studentProgress.combinations,
        falling: studentProgress.falling,
        forms: studentProgress.forms,
        kicks: studentProgress.kicks,
        oneSteps: studentProgress.oneSteps,
        punches: studentProgress.punches,
        stances: studentProgress.stances,
      },
    };
  }
}
