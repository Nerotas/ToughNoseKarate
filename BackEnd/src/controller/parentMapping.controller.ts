import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParentMappingService } from '../service/parentMapping.service';

@Controller('parent-Mapping')
export class ParentMappingController {
  constructor(private readonly parentMappingService: ParentMappingService) {}

  @Post()
  create(@Body() createParentMappingDto: any) {
    return this.parentMappingService.create(createParentMappingDto);
  }

  @Get()
  findAll() {
    return this.parentMappingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentMappingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParentMappingDto: any) {
    return this.parentMappingService.update(+id, updateParentMappingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentMappingService.remove(+id);
  }
}
