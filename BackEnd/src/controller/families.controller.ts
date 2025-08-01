import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FamiliesService } from '../service/families.service';

@ApiTags('System')
@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}
  @Post()
  create(@Body() createFamiliesDto: any) {
    return this.familiesService.create(createFamiliesDto);
  }
  @Get()
  findAll() {
    return this.familiesService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiesService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamiliesDto: any) {
    return this.familiesService.update(+id, updateFamiliesDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiesService.remove(+id);
  }
}
