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
import { CombinationsService } from '../service/combinations.service';

@ApiTags('Techniques')
@Controller('combinations')
export class CombinationsController {
  constructor(private readonly combinationsService: CombinationsService) {}
  @Post()
  create(@Body() createCombinationsDto: any) {
    return this.combinationsService.create(createCombinationsDto);
  }
  @Get()
  findAll() {
    return this.combinationsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.combinationsService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCombinationsDto: any) {
    return this.combinationsService.update(+id, updateCombinationsDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.combinationsService.remove(+id);
  }
}
