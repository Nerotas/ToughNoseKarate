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
import { ParentsService } from '../service/parents.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Students')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['admin', 'instructor'])
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
