import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StudentsService } from '../service/students.service';
import {
  students,
  studentsCreationAttributes,
} from '../models/students';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
  ) {}

  @Get()
  async findAll(@Query('active') active?: string): Promise<students[]> {
    if (active === 'true') {
      return await this.studentsService.findActiveStudents();
    }
    return await this.studentsService.findAll();
  }

  @Get('by-rank/:rank')
  async findByRank(@Param('rank') rank: string): Promise<students[]> {
    return await this.studentsService.findStudentsByRank(rank);
  }

  @Get(':studentid')
  async findOne(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<students> {
    return await this.studentsService.findOne(studentid);
  }

  @Post()
  async create(
    @Body() data: studentsCreationAttributes,
  ): Promise<students> {
    return await this.studentsService.create(data);
  }

  @Put(':studentid')
  async update(
    @Param('studentid', ParseIntPipe) studentid: number,
    @Body() data: Partial<students>,
  ): Promise<students> {
    return await this.studentsService.update(studentid, data);
  }

  @Delete(':studentid')
  async remove(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<{ message: string }> {
    await this.studentsService.remove(studentid);
    return { message: `Deleted student with id ${studentid}` };
  }
}
