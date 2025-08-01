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
import { FallingService } from '../service/falling.service';

@ApiTags('Techniques')
@Controller('falling')
export class FallingController {
  constructor(private readonly fallingService: FallingService) {}
  @Post()
  create(@Body() createFallingDto: any) {
    return this.fallingService.create(createFallingDto);
  }
  @Get()
  findAll() {
    return this.fallingService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fallingService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFallingDto: any) {
    return this.fallingService.update(+id, updateFallingDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fallingService.remove(+id);
  }
}
