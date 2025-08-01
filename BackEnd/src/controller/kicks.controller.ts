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
import { KicksService } from '../service/kicks.service';

@ApiTags('Techniques')
@Controller('kicks')
export class KicksController {
  constructor(private readonly kicksService: KicksService) {}
  @Post()
  create(@Body() createKicksDto: any) {
    return this.kicksService.create(createKicksDto);
  }
  @Get()
  findAll() {
    return this.kicksService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kicksService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateKicksDto: any) {
    return this.kicksService.update(+id, updateKicksDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.kicksService.remove(+id);
  }
}
