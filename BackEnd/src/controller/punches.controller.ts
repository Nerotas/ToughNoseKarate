import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PunchesService } from '../service/punches.service';

@Controller('punches')
export class PunchesController {
  constructor(private readonly punchesService: PunchesService) {}

  @Post()
  create(@Body() createPunchesDto: any) {
    return this.punchesService.create(createPunchesDto);
  }

  @Get()
  findAll() {
    return this.punchesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.punchesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePunchesDto: any) {
    return this.punchesService.update(+id, updatePunchesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.punchesService.remove(+id);
  }
}
