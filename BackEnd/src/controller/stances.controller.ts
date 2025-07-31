import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StancesService } from '../service/stances.service';

@Controller('stances')
export class StancesController {
  constructor(private readonly stancesService: StancesService) {}

  @Post()
  create(@Body() createStancesDto: any) {
    return this.stancesService.create(createStancesDto);
  }

  @Get()
  findAll() {
    return this.stancesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStancesDto: any) {
    return this.stancesService.update(+id, updateStancesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stancesService.remove(+id);
  }
}
