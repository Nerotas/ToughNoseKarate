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
import { KicksDefinitionsService } from '../service/kicksDefinitions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('kicks-definitions')
@Controller({ path: 'kicks-definitions', version: '1' })
export class KicksDefinitionsController {
  constructor(
    private readonly kicksDefinitionsService: KicksDefinitionsService,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  create(@Body() createKicksDefinitionsDto: any) {
    return this.kicksDefinitionsService.create(createKicksDefinitionsDto);
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  bulkCreate(@Body() dtos: any[]) {
    return this.kicksDefinitionsService.bulkCreate(dtos);
  }
  @Get()
  findAll() {
    return this.kicksDefinitionsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.kicksDefinitionsService.findOne(+id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  update(@Param('id') id: string, @Body() updateKicksDefinitionsDto: any) {
    return this.kicksDefinitionsService.update(+id, updateKicksDefinitionsDto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  remove(@Param('id') id: string) {
    return this.kicksDefinitionsService.remove(+id);
  }
}
