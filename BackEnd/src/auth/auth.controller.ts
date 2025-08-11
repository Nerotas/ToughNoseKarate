import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Patch,
  Res,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { ThrottlerGuard, Throttle, SkipThrottle } from '@nestjs/throttler';
import { Response, Request } from 'express';

import { AuthService, LoginDto, LoginResponse } from './auth.service';
import { CreateInstructorDto } from '../service/instructors.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshJwtAuthGuard } from './refresh-jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { AdminOnly } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { InstructorPayload } from './jwt.strategy';

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

@ApiTags('Authentication')
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 attempts per minute
  @ApiOperation({ summary: 'Login instructor with email and password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'instructor@toughnosekarate.com' },
        password: { type: 'string', example: 'SecurePassword123!' },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        success: true,
        instructor: {
          id: 1,
          email: 'instructor@toughnosekarate.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'instructor',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 429, description: 'Too many login attempts' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponse> {
    const result = await this.authService.loginWithCredentials(loginDto);

    const isProd = process.env.NODE_ENV === 'production';

    // Set JWT as HttpOnly cookies
    response.cookie('accessToken', result.access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    response.cookie('refreshToken', result.refresh_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      success: true,
      instructor: result.instructor,
    };
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AdminOnly()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Register new instructor (admin only)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'newinstructor@toughnosekarate.com' },
        password: { type: 'string', example: 'SecurePassword123!' },
        first_name: { type: 'string', example: 'Jane' },
        last_name: { type: 'string', example: 'Smith' },
        role: {
          type: 'string',
          enum: ['instructor', 'admin'],
          example: 'instructor',
        },
      },
      required: ['email', 'password', 'first_name', 'last_name'],
    },
  })
  @ApiResponse({ status: 201, description: 'Instructor created successfully' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Admin access required',
  })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(
    @Body() createInstructorDto: CreateInstructorDto,
    @User() currentUser: InstructorPayload,
  ) {
    const instructor = await this.authService.register(createInstructorDto);

    // Log the registration for audit purposes
    console.log(
      `Admin ${currentUser.email} registered new instructor: ${instructor.email}`,
    );

    // Return safe instructor data (without password hash)
    return {
      id: instructor.instructor_id,
      email: instructor.email,
      firstName: instructor.first_name,
      lastName: instructor.last_name,
      role: instructor.role,
      isActive: instructor.is_active,
      createdAt: instructor.created_at,
    };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Get current instructor profile' })
  @ApiResponse({
    status: 200,
    description: 'Current instructor profile',
    schema: {
      example: {
        id: 1,
        email: 'instructor@toughnosekarate.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'instructor',
        isActive: true,
        lastLogin: '2024-01-01T12:00:00Z',
        createdAt: '2024-01-01T00:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@User() user: InstructorPayload) {
    return this.authService.getProfile(user.instructorId);
  }

  @Post('refresh')
  @UseGuards(RefreshJwtAuthGuard)
  @SkipThrottle()
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Refresh JWT token using refresh token' })
  @ApiResponse({
    status: 200,
    description: 'New access token generated and set in cookie',
    schema: {
      example: {
        success: true,
        message: 'Token refreshed successfully',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(
    @User() user: InstructorPayload,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.refreshToken(user.instructorId);

    const isProd = process.env.NODE_ENV === 'production';

    // Set new JWT as HttpOnly cookie
    response.cookie('accessToken', result.access_token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return {
      success: true,
      message: 'Token refreshed successfully',
    };
  }

  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Change password for current instructor' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        currentPassword: { type: 'string', example: 'OldPassword123!' },
        newPassword: { type: 'string', example: 'NewSecurePassword123!' },
      },
      required: ['currentPassword', 'newPassword'],
    },
  })
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  @ApiResponse({ status: 401, description: 'Current password is incorrect' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @User() user: InstructorPayload,
  ) {
    await this.authService.changePassword(
      user.instructorId,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );

    return { message: 'Password changed successfully' };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Logout instructor and clear authentication cookie',
  })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@Res({ passthrough: true }) response: Response) {
    const isProd = process.env.NODE_ENV === 'production';

    // Clear the authentication cookies
    response.clearCookie('accessToken', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      path: '/',
    });

    response.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'strict' : 'lax',
      path: '/',
    });

    return {
      success: true,
      message: 'Logout successful. Authentication cookies cleared.',
    };
  }
}
