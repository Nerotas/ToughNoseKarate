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
    const baseCookie = {
      httpOnly: true,
      secure: isProd, // required for SameSite=None on HTTPS
      sameSite: isProd ? ('none' as const) : ('lax' as const),
      path: '/',
    };

    response.cookie('accessToken', result.access_token, {
      ...baseCookie,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    response.cookie('refreshToken', result.refresh_token, {
      ...baseCookie,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // TEMP debug
    if (!isProd) {
      console.log('Set login cookies');
    }

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

  @Post('refresh')
  @SkipThrottle() // avoid rate limiting refresh
  @UseGuards(RefreshJwtAuthGuard) // use the custom guard wrapper
  async refresh(@User() user, @Res({ passthrough: true }) res: Response) {
    const accessToken = await this.authService.issueAccessToken(user);
    const refreshToken = await this.authService.refreshToken(user);

    const isProd = process.env.NODE_ENV === 'production';
    const baseCookie: import('express').CookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      path: '/',
    };

    res.cookie('accessToken', accessToken, {
      ...baseCookie,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      ...baseCookie,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { success: true };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @SkipThrottle() // optional: prevent throttling harmless profile pings
  async getProfile(@User() user: InstructorPayload, @Req() req: Request) {
    // TEMP DEBUG (remove after confirming)
    if (process.env.LOG_AUTH_DEBUG === 'true') {
      console.log(
        'Profile cookies keys:',
        Object.keys((req as any).cookies || {}),
      );
      console.log('User payload:', user);
    }
    // If strategy sets only id: change to user.id
    const id =
      (user as any).instructorId ?? (user as any).id ?? (user as any).sub;
    return this.authService.getProfile(id);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: Response) {
    const isProd = process.env.NODE_ENV === 'production';
    const baseCookie = {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? ('none' as const) : ('lax' as const),
      path: '/',
    };
    response.clearCookie('accessToken', baseCookie);
    response.clearCookie('refreshToken', baseCookie);
    return { success: true, message: 'Logout successful.' };
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
}
