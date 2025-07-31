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
import { FallingService } from '../service/falling.service';
import { falling, fallingCreationAttributes } from '../models/falling';

@Controller('falling')
export class FallingController {
  constructor(private readonly fallingService: FallingService) {}

  @Get()
  async findAll(): Promise<falling[]> {
    return await this.fallingService.findAll();
  }

  @Get(':studentid')
  async findOne(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<falling> {
    return await this.fallingService.findOne(studentid);
  }

  @Post()
  async create(@Body() data: fallingCreationAttributes): Promise<falling> {
    return await this.fallingService.create(data);
  }

  @Put(':studentid')
  async update(
    @Param('studentid', ParseIntPipe) studentid: number,
    @Body() data: Partial<falling>,
  ): Promise<falling> {
    return await this.fallingService.update(studentid, data);
  }

  @Delete(':studentid')
  async remove(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<{ message: string }> {
    await this.fallingService.remove(studentid);
    return { message: `Deleted falling data for student ${studentid}` };
  }
}
