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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FamiliesService } from '../service/families.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { InstructorOnly, Roles } from '../decorators/roles.decorator';

@ApiTags('Families')
@Controller({ path: 'families', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(['admin', 'instructor'])
@InstructorOnly()
@ApiBearerAuth('JWT')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}
  @Post()
  create(@Body() createFamiliesDto: any) {
    return this.familiesService.create(createFamiliesDto);
  }
  @Get()
  findAll() {
    return this.familiesService.findAll();
  }

  @Get('student/:studentid')
  @ApiOperation({ summary: 'Get family members by student ID' })
  @ApiResponse({ status: 200, description: 'Family members found.' })
  findByStudentId(@Param('studentid') studentid: string) {
    return this.familiesService.findByStudentId(+studentid);
  }

  @Get('parent/:parentid')
  @ApiOperation({ summary: 'Get family members by parent ID' })
  @ApiResponse({ status: 200, description: 'Family members found.' })
  findByParentId(@Param('parentid') parentid: string) {
    return this.familiesService.findByParentId(+parentid);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.familiesService.findOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFamiliesDto: any) {
    return this.familiesService.update(+id, updateFamiliesDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.familiesService.remove(+id);
  }
}
