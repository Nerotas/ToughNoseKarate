import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OneStepsService } from '../service/oneSteps.service';

@Controller('one-Steps')
export class OneStepsController {
  constructor(private readonly oneStepsService: OneStepsService) {}

  @Post()
  create(@Body() createOneStepsDto: any) {
    return this.oneStepsService.create(createOneStepsDto);
  }

  @Get()
  findAll() {
    return this.oneStepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oneStepsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOneStepsDto: any) {
    return this.oneStepsService.update(+id, updateOneStepsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oneStepsService.remove(+id);
  }
}
