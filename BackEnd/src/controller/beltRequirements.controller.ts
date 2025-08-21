import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BeltRequirementsService } from '../service/beltRequirements.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Belt Requirements')
@Controller({ path: 'belt-requirements', version: '1' })
export class BeltRequirementsController {
  constructor(
    private readonly beltRequirementsService: BeltRequirementsService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  @Delete(':beltRank')
  remove(@Param('beltRank') beltRank: string) {
    return this.beltRequirementsService.remove(beltRank);
  }
}
