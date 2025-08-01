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
import { BlocksService } from '../service/blocks.service';

@ApiTags('Techniques')
@Controller('blocks')
export class BlocksController {
  constructor(private readonly blocksService: BlocksService) {}
  @Post()
  create(@Body() createBlocksDto: any) {
    return this.blocksService.create(createBlocksDto);
  }
  @Get()
  findAll() {
    return this.blocksService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blocksService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlocksDto: any) {
    return this.blocksService.update(+id, updateBlocksDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blocksService.remove(+id);
  }
}
