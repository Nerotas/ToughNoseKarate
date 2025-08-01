import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OneStepsDefinitionsService } from '../service/oneStepsDefinitions.service';

@Controller('one-steps-definitions')
export class OneStepsDefinitionsController {
  constructor(
    private readonly oneStepsDefinitionsService: OneStepsDefinitionsService,
  ) {}

  @Post()
  create(@Body() createOneStepsDefinitionsDto: any) {
    return this.oneStepsDefinitionsService.create(createOneStepsDefinitionsDto);
  }

  @Get()
  findAll() {
    return this.oneStepsDefinitionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oneStepsDefinitionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOneStepsDefinitionsDto: any) {
    return this.oneStepsDefinitionsService.update(
      +id,
      updateOneStepsDefinitionsDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oneStepsDefinitionsService.remove(+id);
  }
}
