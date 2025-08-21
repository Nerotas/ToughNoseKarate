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
import { PunchesDefinitionsService } from '../service/punchesDefinitions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { PunchesDefinitionsAttributes } from '../models';

@ApiTags('Techniques')
@Controller({ path: 'punches-definitions', version: '1' })
export class PunchesDefinitionsController {
  constructor(
    private readonly punchesDefinitionsService: PunchesDefinitionsService,
  ) {}
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  create(@Body() createPunchesDefinitionsDto: any) {
    return this.punchesDefinitionsService.create(createPunchesDefinitionsDto);
  }
  @Get()
  findAll() {
    return this.punchesDefinitionsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.punchesDefinitionsService.findOne(+id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  update(
    @Param('id') id: string,
    @Body() updatePunchesDefinitionsDto: PunchesDefinitionsAttributes,
  ) {
    console.log(updatePunchesDefinitionsDto);

    return this.punchesDefinitionsService.update(
      +id,
      updatePunchesDefinitionsDto,
    );
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  remove(@Param('id') id: string) {
    return this.punchesDefinitionsService.remove(+id);
  }
}
