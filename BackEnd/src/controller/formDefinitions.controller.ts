import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { FormDefinitionsService } from '../service/formDefinitions.service';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('form-definitions')
@Controller({ path: 'form-definitions', version: '1' })
export class FormDefinitionsController {
  constructor(
    private readonly formDefinitionsService: FormDefinitionsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  @ApiOperation({ summary: 'Create a new form definition' })
  @ApiResponse({
    status: 201,
    description: 'Form definition created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid form definition data',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions',
  })
  async create(@Body() createFormDefinitionDto: any) {
    try {
      return await this.formDefinitionsService.create(createFormDefinitionDto);
    } catch (error) {
      throw new HttpException(
        `Failed to create form definition: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all active form definitions' })
  @ApiResponse({
    status: 200,
    description: 'List of all active form definitions',
  })
  @ApiQuery({
    name: 'beltRank',
    required: false,
    description: 'Filter by belt rank (e.g., white, orange, green, etc.)',
  })
  async findAll(@Query('beltRank') beltRank?: string) {
    try {
      if (beltRank) {
        return await this.formDefinitionsService.findByBeltRank(beltRank);
      }
      return await this.formDefinitionsService.findAll();
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve form definitions: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific form definition by ID' })
  @ApiParam({ name: 'id', description: 'Form definition ID', type: 'number' })
  @ApiResponse({ status: 200, description: 'Form definition found' })
  @ApiResponse({ status: 404, description: 'Form definition not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const formDefinition = await this.formDefinitionsService.findOne(id);

      if (!formDefinition) {
        throw new HttpException(
          `Form definition with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return formDefinition;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to retrieve form definition: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('belt/:beltRank')
  @ApiOperation({ summary: 'Get form definitions for a specific belt rank' })
  @ApiParam({
    name: 'beltRank',
    description: 'Belt rank (e.g., white, orange, green, etc.)',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Form definitions for the specified belt rank',
  })
  async findByBeltRank(@Param('beltRank') beltRank: string) {
    try {
      return await this.formDefinitionsService.findByBeltRank(beltRank);
    } catch (error) {
      throw new HttpException(
        `Failed to retrieve form definitions for belt rank ${beltRank}: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  @ApiOperation({ summary: 'Update a form definition' })
  @ApiParam({ name: 'id', description: 'Form definition ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Form definition updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Form definition not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - insufficient permissions',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFormDefinitionDto: any,
  ) {
    try {
      const updatedFormDefinition = await this.formDefinitionsService.update(
        id,
        updateFormDefinitionDto,
      );

      if (!updatedFormDefinition) {
        throw new HttpException(
          `Form definition with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return updatedFormDefinition;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to update form definition: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  @ApiOperation({
    summary: 'Soft delete a form definition (set active_indicator to 0)',
  })
  @ApiParam({ name: 'id', description: 'Form definition ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Form definition deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'Form definition not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - admin access required',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleted = await this.formDefinitionsService.remove(id);

      if (!deleted) {
        throw new HttpException(
          `Form definition with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return { message: 'Form definition deleted successfully', id };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to delete form definition: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id/permanent')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  @ApiOperation({
    summary: 'Permanently delete a form definition',
  })
  @ApiParam({ name: 'id', description: 'Form definition ID', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Form definition permanently deleted',
  })
  @ApiResponse({ status: 404, description: 'Form definition not found' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - admin access required',
  })
  async hardDelete(@Param('id', ParseIntPipe) id: number) {
    try {
      const deleted = await this.formDefinitionsService.remove(id);

      if (!deleted) {
        throw new HttpException(
          `Form definition with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return { message: 'Form definition permanently deleted', id };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        `Failed to permanently delete form definition: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('bulk')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(['admin', 'instructor'])
  @ApiOperation({ summary: 'Bulk create form definitions (for seeding data)' })
  @ApiResponse({
    status: 201,
    description: 'Form definitions created successfully',
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid data' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - admin access required',
  })
  async bulkCreate(@Body() formDefinitions: any[]) {
    try {
      const created =
        await this.formDefinitionsService.bulkCreate(formDefinitions);
      return {
        message: `Successfully created ${created.length} form definitions`,
        created: created.length,
        data: created,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to bulk create form definitions: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
