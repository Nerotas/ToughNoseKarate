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
import { CombinationsService } from '../service/combinations.service';
import {
  combinations,
  combinationsCreationAttributes,
} from '../models/combinations';

@Controller('combinations')
export class CombinationsController {
  constructor(
    private readonly combinationsService: CombinationsService,
  ) {}

  @Get()
  async findAll(): Promise<combinations[]> {
    return await this.combinationsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<combinations> {
    return await this.combinationsService.findOne(id);
  }

  @Post()
  async create(
    @Body() data: combinationsCreationAttributes,
  ): Promise<combinations> {
    return await this.combinationsService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<combinations>,
  ): Promise<combinations> {
    return await this.combinationsService.update(id, data);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    await this.combinationsService.remove(id);
    return { message: `Deleted combination with id ${id}` };
  }
}
