import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { OneStepsService } from '../service/oneSteps.service';
import { one_steps, one_stepsCreationAttributes } from '../models/one_steps';

@Controller('one-steps')
export class OneStepsController {
  constructor(private readonly oneStepsService: OneStepsService) {}

  @Get()
  async findAll(): Promise<one_steps[]> {
    return await this.oneStepsService.findAll();
  }

  @Get(':studentid')
  async findOne(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<one_steps> {
    return await this.oneStepsService.findOne(studentid);
  }

  @Post()
  async create(@Body() data: one_stepsCreationAttributes): Promise<one_steps> {
    return await this.oneStepsService.create(data);
  }

  @Put(':studentid')
  async update(
    @Param('studentid', ParseIntPipe) studentid: number,
    @Body() data: Partial<one_steps>,
  ): Promise<one_steps> {
    return await this.oneStepsService.update(studentid, data);
  }

  @Delete(':studentid')
  async remove(
    @Param('studentid', ParseIntPipe) studentid: number,
  ): Promise<{ message: string }> {
    await this.oneStepsService.remove(studentid);
    return { message: `Deleted one steps for student ${studentid}` };
  }
}
