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
import { StancesService } from '../service/stances.service';
import {
  stances,
  stancesCreationAttributes,
} from '../models/stances';

@Controller('stances')
export class StancesController {
  constructor(
    private readonly stancesService: StancesService,
  ) {}

  @Get()
  async findAll(): Promise<stances[]> {
    return await this.stancesService.findAll();
  }

  @Get(':studentid')
  async findOne(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<stances> {
    return await this.stancesService.findOne(studentid);
  }

  @Post()
  async create(
    @Body() data: stancesCreationAttributes,
  ): Promise<stances> {
    return await this.stancesService.create(data);
  }

  @Put(':studentid')
  async update(
    @Param('studentid', ParseIntPipe) studentid: number,
    @Body() data: Partial<stances>,
  ): Promise<stances> {
    return await this.stancesService.update(studentid, data);
  }

  @Delete(':studentid')
  async remove(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<{ message: string }> {
    await this.stancesService.remove(studentid);
    return { message: `Deleted stances for student ${studentid}` };
  }
}
