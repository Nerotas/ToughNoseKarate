import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { FormsService } from '../service/forms.service';
import { forms, formsCreationAttributes } from '../models/forms';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  async findAll(): Promise<forms[]> {
    return await this.formsService.findAll();
  }

  @Get(':studentid')
  async findOne(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<forms> {
    return await this.formsService.findOne(studentid);
  }

  @Post()
  async create(@Body() data: formsCreationAttributes): Promise<forms> {
    return await this.formsService.create(data);
  }

  @Put(':studentid')
  async update(
    @Param('studentid', ParseIntPipe) studentid: number,
    @Body() data: Partial<forms>,
  ): Promise<forms> {
    return await this.formsService.update(studentid, data);
  }

  @Delete(':studentid')
  async remove(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<{ message: string }> {
    await this.formsService.remove(studentid);
    return { message: `Deleted forms for student ${studentid}` };
  }
}
