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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Belt Requirements')
@Controller('belt-Requirements')
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
