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
import { PunchesDefinitionsService } from '../service/punchesDefinitions.service';

@ApiTags('Techniques')
@Controller('punches-definitions')
export class PunchesDefinitionsController {
  constructor(
    private readonly punchesDefinitionsService: PunchesDefinitionsService,
  ) {}
  @Post()
  create(@Body() createPunchesDefinitionsDto: any) {
    return this.punchesDefinitionsService.create(createPunchesDefinitionsDto);
  }
  @Get()
  findAll() {
    return this.punchesDefinitionsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.punchesDefinitionsService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePunchesDefinitionsDto: any) {
    return this.punchesDefinitionsService.update(
      +id,
      updatePunchesDefinitionsDto,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.punchesDefinitionsService.remove(+id);
  }
}
