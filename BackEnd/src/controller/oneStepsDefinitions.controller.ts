import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OneStepsDefinitionsService } from '../service/oneStepsDefinitions.service';

@ApiTags('onestep-definitions')
@Controller({ path: 'onestep-definitions', version: '1' })
export class OneStepsDefinitionsController {
  constructor(
    private readonly oneStepsDefinitionsService: OneStepsDefinitionsService,
  ) {}
  @Post()
  create(@Body() createOneStepsDefinitionsDto: any) {
    return this.oneStepsDefinitionsService.create(createOneStepsDefinitionsDto);
  }
  @Get()
  @ApiOperation({ summary: 'Get all one-step definitions' })
  @ApiResponse({ status: 200, description: 'Return all one-step definitions' })
  async findAll() {
    try {
      const result = await this.oneStepsDefinitionsService.findAll();
      console.log('OneSteps findAll result:', result?.length || 0, 'items');
      return result;
    } catch (error) {
      console.error('OneSteps findAll error:', error);
      throw error;
    }
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
