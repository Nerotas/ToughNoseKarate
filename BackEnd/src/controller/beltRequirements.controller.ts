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
import { BeltRequirementsService } from '../service/beltRequirements.service';

@ApiTags('Belt Requirements')
@Controller('belt-Requirements')
export class BeltRequirementsController {
  constructor(
    private readonly beltRequirementsService: BeltRequirementsService,
  ) {}
  @Post()
  create(@Body() createBeltRequirementsDto: any) {
    return this.beltRequirementsService.create(createBeltRequirementsDto);
  }
  @Get()
  findAll() {
    return this.beltRequirementsService.findAll();
  }
  @Get(':beltRank')
  findOne(@Param('beltRank') beltRank: string) {
    return this.beltRequirementsService.findOne(beltRank);
  }
  @Patch(':beltRank')
  update(
    @Param('beltRank') beltRank: string,
    @Body() updateBeltRequirementsDto: any,
  ) {
    return this.beltRequirementsService.update(
      beltRank,
      updateBeltRequirementsDto,
    );
  }
  @Delete(':beltRank')
  remove(@Param('beltRank') beltRank: string) {
    return this.beltRequirementsService.remove(beltRank);
  }
}
