import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SelfDefenseDefinitionsService } from '../service/selfDefenseDefinitions.service';

@Controller('self-defense-definitions')
export class SelfDefenseDefinitionsController {
  constructor(
    private readonly selfDefenseDefinitionsService: SelfDefenseDefinitionsService,
  ) {}

  @Post()
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
  remove(@Param('id') id: string) {
    return this.selfDefenseDefinitionsService.remove(+id);
  }
}
