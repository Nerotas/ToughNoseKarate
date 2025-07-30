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
import { ParentsService } from '../service/parents.service';
import {
  parents,
  parentsCreationAttributes,
} from '../models/parents';

@Controller('parents')
export class ParentsController {
  constructor(
    private readonly parentsService: ParentsService,
  ) {}

  @Get()
  async findAll(): Promise<parents[]> {
    return await this.parentsService.findAll();
  }

  @Get(':parentid')
  async findOne(
    @Param('parentid', ParseIntPipe) parentid: number,
  ): Promise<parents> {
    return await this.parentsService.findOne(parentid);
  }

  @Post()
  async create(
    @Body() data: parentsCreationAttributes,
  ): Promise<parents> {
    return await this.parentsService.create(data);
  }

  @Put(':parentid')
  async update(
    @Param('parentid', ParseIntPipe) parentid: number,
    @Body() data: Partial<parents>,
  ): Promise<parents> {
    return await this.parentsService.update(parentid, data);
  }

  @Delete(':parentid')
  async remove(
    @Param('parentid', ParseIntPipe) parentid: number,
  ): Promise<{ message: string }> {
    await this.parentsService.remove(parentid);
    return { message: `Deleted parent with id ${parentid}` };
  }
}
