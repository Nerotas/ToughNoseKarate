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
import { SelfDefenseDefinitionsService } from '../service/selfDefenseDefinitions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@ApiTags('Techniques')
@Controller({ path: 'self-defense-definitions', version: '1' })
export class SelfDefenseDefinitionsController {
  constructor(
    private readonly selfDefenseDefinitionsService: SelfDefenseDefinitionsService,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  create(@Body() createSelfDefenseDefinitionsDto: any) {
    return this.selfDefenseDefinitionsService.create(
      createSelfDefenseDefinitionsDto,
    );
  }
  @Get()
  findAll() {
    return this.selfDefenseDefinitionsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.selfDefenseDefinitionsService.findOne(+id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  update(
    @Param('id') id: string,
    @Body() updateSelfDefenseDefinitionsDto: any,
  ) {
    return this.selfDefenseDefinitionsService.update(
      +id,
      updateSelfDefenseDefinitionsDto,
    );
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  remove(@Param('id') id: string) {
    return this.selfDefenseDefinitionsService.remove(+id);
  }
}
