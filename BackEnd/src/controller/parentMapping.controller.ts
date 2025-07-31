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
import { ParentMappingService } from '../service/parentMapping.service';
import {
  parent_mapping,
  parent_mappingCreationAttributes,
} from '../models/parent_mapping';

@Controller('parent-mapping')
export class ParentMappingController {
  constructor(private readonly parentMappingService: ParentMappingService) {}

  @Get()
  async findAll(): Promise<parent_mapping[]> {
    return await this.parentMappingService.findAll();
  }

  @Get(':studentid/:parentid')
  async findOne(
    @Param('studentid', ParseIntPipe) studentid: number,
    @Param('parentid', ParseIntPipe) parentid: number,
  ): Promise<parent_mapping> {
    return await this.parentMappingService.findOne(studentid, parentid);
  }

  @Post()
  async create(
    @Body() data: parent_mappingCreationAttributes,
  ): Promise<parent_mapping> {
    return await this.parentMappingService.create(data);
  }

  @Put(':studentid/:parentid')
  async update(
    @Param('studentid', ParseIntPipe) studentid: number,
    @Param('parentid', ParseIntPipe) parentid: number,
    @Body() data: Partial<parent_mapping>,
  ): Promise<parent_mapping> {
    return await this.parentMappingService.update(studentid, parentid, data);
  }

  @Delete(':studentid/:parentid')
  async remove(
    @Param('studentid', ParseIntPipe) studentid: number,
    @Param('parentid', ParseIntPipe) parentid: number,
  ): Promise<{ message: string }> {
    await this.parentMappingService.remove(studentid, parentid);
    return {
      message: `Deleted parent mapping for student ${studentid} and parent ${parentid}`,
    };
  }
}
