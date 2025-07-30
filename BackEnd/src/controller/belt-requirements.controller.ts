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
import { BeltRequirementsService } from './belt-requirements.service';
import { belt_requirements } from './belt_requirements.model'; // Adjust path as needed

@Controller('belt-requirements')
export class BeltRequirementsController {
  constructor(
    private readonly beltRequirementsService: BeltRequirementsService,
  ) {}

  @Get()
  async findAll(): Promise<belt_requirements[]> {
    return this.beltRequirementsService.findAll();
  }

  @Get(':belt_order')
  async findOne(
    @Param('belt_order', ParseIntPipe) belt_order: number,
  ): Promise<belt_requirements> {
    return this.beltRequirementsService.findOne(belt_order);
  }

  @Post()
  async create(
    @Body() data: Partial<belt_requirements>,
  ): Promise<belt_requirements> {
    return this.beltRequirementsService.create(data);
  }

  @Put(':belt_order')
  async update(
    @Param('belt_order', ParseIntPipe) belt_order: number,
    @Body() data: Partial<belt_requirements>,
  ): Promise<belt_requirements> {
    return this.beltRequirementsService.update(belt_order, data);
  }

  @Delete(':belt_order')
  async remove(
    @Param('belt_order', ParseIntPipe) belt_order: number,
  ): Promise<{ message: string }> {
    await this.beltRequirementsService.remove(belt_order);
    return { message: `Deleted belt requirement with order ${belt_order}` };
  }
}
