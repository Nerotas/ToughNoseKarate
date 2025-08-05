import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentTestsService } from '../service/studentTests.service';
import { studentTestsAttributes } from '../models/studentTests';

@Controller('student-tests')
export class StudentTestsController {
  constructor(private readonly studentTestsService: StudentTestsService) {}

  @Post()
  create(@Body() createStudentTestDto: Omit<studentTestsAttributes, 'testid'>) {
    return this.studentTestsService.create(createStudentTestDto);
  }

  @Get()
  findAll() {
    return this.studentTestsService.findAll();
  }

  @Get('student/:studentId')
  findByStudentId(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.studentTestsService.findByStudentId(studentId);
  }

  @Get('student/:studentId/history')
  getTestHistory(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.studentTestsService.getTestHistory(studentId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.studentTestsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentTestDto: Partial<studentTestsAttributes>,
  ) {
    return this.studentTestsService.update(id, updateStudentTestDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.studentTestsService.remove(id);
  }
}
