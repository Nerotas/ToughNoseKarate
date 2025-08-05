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
import { BeltProgressionService } from '../service/beltProgression.service';
import { beltProgressionAttributes } from '../models/beltProgression';

@Controller('belt-progression')
export class BeltProgressionController {
  constructor(
    private readonly beltProgressionService: BeltProgressionService,
  ) {}

  @Post()
  create(
    @Body()
    createBeltProgressionDto: Omit<beltProgressionAttributes, 'progression_id'>,
  ) {
    return this.beltProgressionService.create(createBeltProgressionDto);
  }

  @Get()
  findAll() {
    return this.beltProgressionService.findAll();
  }

  @Get('student/:studentId')
  findByStudentId(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.beltProgressionService.findByStudentId(studentId);
  }

  @Get('student/:studentId/current')
  getCurrentBelt(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.beltProgressionService.getCurrentBelt(studentId);
  }

  @Get('student/:studentId/history')
  getBeltHistory(@Param('studentId', ParseIntPipe) studentId: number) {
    return this.beltProgressionService.getBeltHistory(studentId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.beltProgressionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBeltProgressionDto: Partial<beltProgressionAttributes>,
  ) {
    return this.beltProgressionService.update(id, updateBeltProgressionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.beltProgressionService.remove(id);
  }
}
