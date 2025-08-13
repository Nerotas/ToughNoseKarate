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
import { StanceDefinitionsService } from '../service/stanceDefinitions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Techniques')
@Controller({ path: 'stance-definitions', version: '1' })
export class StanceDefinitionsController {
  constructor(
    private readonly stanceDefinitionsService: StanceDefinitionsService,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  update(@Param('id') id: string, @Body() updateStanceDefinitionsDto: any) {
    return this.stanceDefinitionsService.update(
      +id,
      updateStanceDefinitionsDto,
    );
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  remove(@Param('id') id: string) {
    return this.stanceDefinitionsService.remove(+id);
  }
}
