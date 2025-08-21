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
import { BlocksDefinitionsService } from '../service/blocksDefinitions.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { BlocksDefinitionsAttributes } from '../models';

@ApiTags('Techniques')
@Controller({ path: 'blocks-definitions', version: '1' })
export class BlocksDefinitionsController {
  constructor(
    private readonly blocksDefinitionsService: BlocksDefinitionsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  create(@Body() createBlocksDefinitionsDto: any) {
    return this.blocksDefinitionsService.create(createBlocksDefinitionsDto);
  }

  @Get()
  findAll() {
    return this.blocksDefinitionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blocksDefinitionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  update(
    @Param('id') id: string,
    @Body() updateBlocksDefinitionsDto: BlocksDefinitionsAttributes,
  ) {
    return this.blocksDefinitionsService.update(
      +id,
      updateBlocksDefinitionsDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  remove(@Param('id') id: string) {
    return this.blocksDefinitionsService.remove(+id);
  }
}
