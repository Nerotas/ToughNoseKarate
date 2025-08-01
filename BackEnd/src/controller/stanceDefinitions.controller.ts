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
import { StanceDefinitionsService } from '../service/stanceDefinitions.service';

@ApiTags('Techniques')
@Controller('stance-definitions')
export class StanceDefinitionsController {
  constructor(
    private readonly stanceDefinitionsService: StanceDefinitionsService,
  ) {}
  @Post()
  create(@Body() createStanceDefinitionsDto: any) {
    return this.stanceDefinitionsService.create(createStanceDefinitionsDto);
  }
  @Get()
  findAll() {
    return this.stanceDefinitionsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stanceDefinitionsService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStanceDefinitionsDto: any) {
    return this.stanceDefinitionsService.update(
      +id,
      updateStanceDefinitionsDto,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stanceDefinitionsService.remove(+id);
  }
}
