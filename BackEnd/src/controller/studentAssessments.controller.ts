import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  StudentAssessmentsService,
  CreateStudentAssessmentDto,
  UpdateStudentAssessmentDto,
} from '../service/studentAssessments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { InstructorOnly, Roles } from '../decorators/roles.decorator';

@ApiTags('Student Assessments')
@Controller('student-assessments')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['admin', 'instructor'])
@ApiBearerAuth('JWT')
export class StudentAssessmentsController {
  constructor(
    private readonly studentAssessmentsService: StudentAssessmentsService,
  ) {}

  @Post()
  async create(@Body() createStudentAssessmentDto: CreateStudentAssessmentDto) {
    try {
      return await this.studentAssessmentsService.create(
        createStudentAssessmentDto,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to create student assessment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(
    @Query('status') status?: 'in_progress' | 'completed' | 'cancelled',
  ) {
    try {
      if (status) {
        return await this.studentAssessmentsService.getAssessmentsByStatus(
          status,
        );
      }
      return await this.studentAssessmentsService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve student assessments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('belt-rank/:beltRank')
  async findByBeltRank(@Param('beltRank') beltRank: string) {
    try {
      return await this.studentAssessmentsService.getAssessmentsByBeltRank(
        beltRank,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve assessments by belt rank',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('student/:studentId')
  async findByStudentId(@Param('studentId', ParseIntPipe) studentId: number) {
    try {
      return await this.studentAssessmentsService.findByStudentId(studentId);
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve student assessments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('student/:studentId/summary')
  async getAssessmentSummary(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    try {
      return await this.studentAssessmentsService.getAssessmentSummary(
        studentId,
      );
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve assessment summary',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('student/:studentId/current')
  async getCurrentAssessment(
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    try {
      const assessment =
        await this.studentAssessmentsService.getCurrentAssessment(studentId);
      if (!assessment) {
        throw new HttpException(
          'No current assessment found for this student',
          HttpStatus.NOT_FOUND,
        );
      }
      return assessment;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to retrieve current assessment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const assessment = await this.studentAssessmentsService.findOne(id);
      if (!assessment) {
        throw new HttpException('Assessment not found', HttpStatus.NOT_FOUND);
      }
      return assessment;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to retrieve assessment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentAssessmentDto: UpdateStudentAssessmentDto,
  ) {
    try {
      const updatedAssessment = await this.studentAssessmentsService.update(
        id,
        updateStudentAssessmentDto,
      );
      if (!updatedAssessment) {
        throw new HttpException('Assessment not found', HttpStatus.NOT_FOUND);
      }
      return updatedAssessment;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update assessment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/complete')
  async completeAssessment(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    completionData: {
      overall_score?: number;
      passed?: boolean;
      examiner_notes?: string;
    },
  ) {
    try {
      const completedAssessment =
        await this.studentAssessmentsService.completeAssessment(
          id,
          completionData,
        );
      if (!completedAssessment) {
        throw new HttpException('Assessment not found', HttpStatus.NOT_FOUND);
      }
      return completedAssessment;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to complete assessment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id/cancel')
  async cancelAssessment(
    @Param('id', ParseIntPipe) id: number,
    @Body() cancellationData: { reason?: string },
  ) {
    try {
      const cancelledAssessment =
        await this.studentAssessmentsService.cancelAssessment(
          id,
          cancellationData.reason,
        );
      if (!cancelledAssessment) {
        throw new HttpException('Assessment not found', HttpStatus.NOT_FOUND);
      }
      return cancelledAssessment;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to cancel assessment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleted = await this.studentAssessmentsService.remove(id);
      if (!deleted) {
        throw new HttpException('Assessment not found', HttpStatus.NOT_FOUND);
      }
      return { message: 'Assessment deleted successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to delete assessment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
