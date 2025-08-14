import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StudentsService } from '../service/students.service';
import { CreateStudentDto, students, StudentsAttributes } from 'src/models/students';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { InstructorPayload } from '../auth/jwt.strategy';

@ApiTags('Students')
@Controller({ path: 'students', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['admin', 'instructor'])
@ApiBearerAuth('JWT')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new student (instructors only)' })
  @ApiResponse({ status: 201, description: 'Student created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Login required' })
  create(
    @Body() createStudentsDto: CreateStudentDto,
    @User() instructor: InstructorPayload,
  ) {
    console.log(`Instructor ${instructor.email} is creating a new student`);
    return this.studentsService.create(createStudentsDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all students with optional pagination (instructors only)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of students to return',
  })
  @ApiQuery({
    name: 'offset',
    required: false,
    type: Number,
    description: 'Number of students to skip',
  })
  @ApiResponse({ status: 200, description: 'Students retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Login required' })
  findAll(
    @User() instructor: InstructorPayload,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ): Promise<students[]> {
    console.log(
      `Instructor ${instructor.email} (${instructor.role}) accessed students list`,
    );
    return this.studentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a student by ID (instructors only)' })
  @ApiResponse({ status: 200, description: 'Student found' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Login required' })
  findOne(@Param('id') id: string, @User() instructor: InstructorPayload) {
    console.log(`Instructor ${instructor.email} accessed student ${id}`);
    return this.studentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a student (instructors only)' })
  @ApiResponse({ status: 200, description: 'Student updated successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Login required' })
  update(
    @Param('id') id: string,
    @Body() updateStudentsDto: StudentsAttributes,
    @User() instructor: InstructorPayload,
  ) {
    console.log(`Instructor ${instructor.email} is updating student ${id}`);
    return this.studentsService.update(+id, updateStudentsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a student (instructors only)' })
  @ApiResponse({ status: 200, description: 'Student deleted successfully' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Login required' })
  remove(@Param('id') id: string, @User() instructor: InstructorPayload) {
    console.log(`Instructor ${instructor.email} is deleting student ${id}`);
    return this.studentsService.remove(+id);
  }
}
