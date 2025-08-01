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
import { KicksDefinitionsService } from '../service/kicksDefinitions.service';

@ApiTags('Techniques')
@Controller('kicks-definitions')
export class KicksDefinitionsController {
  constructor(
    private readonly kicksDefinitionsService: KicksDefinitionsService,
  ) {}
  @Post()
  create(@Body() createKicksDefinitionsDto: any) {
    return this.kicksDefinitionsService.create(createKicksDefinitionsDto);
  }
  @Get()
  findAll() {
    return this.kicksDefinitionsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kicksDefinitionsService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKicksDefinitionsDto: any) {
    return this.kicksDefinitionsService.update(+id, updateKicksDefinitionsDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kicksDefinitionsService.remove(+id);
  }
}
