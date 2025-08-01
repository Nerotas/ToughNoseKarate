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
import { ParentsService } from '../service/parents.service';

@ApiTags('Students')
@Controller('parents')
export class ParentsController {
  constructor(private readonly parentsService: ParentsService) {}
  @Post()
  create(@Body() createParentsDto: any) {
    return this.parentsService.create(createParentsDto);
  }
  @Get()
  findAll() {
    return this.parentsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parentsService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParentsDto: any) {
    return this.parentsService.update(+id, updateParentsDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parentsService.remove(+id);
  }
}
