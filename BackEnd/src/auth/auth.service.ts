import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  InstructorsService,
  CreateInstructorDto,
} from '../service/instructors.service';
import { Instructors } from '../models/instructors';
import * as bcrypt from 'bcrypt';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  instructor: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: 'instructor' | 'admin';
  };
}

export interface JwtPayload {
  email: string;
  sub: number; // instructor_id
  role: 'instructor' | 'admin';
}

@Injectable()
export class AuthService {
  constructor(
    private instructorsService: InstructorsService,
    private jwtService: JwtService,
  ) {}

  async validateInstructor(
    email: string,
    password: string,
  ): Promise<Instructors | null> {
    const instructor = await this.instructorsService.findByEmail(email);

    if (!instructor) {
      return null;
    }

    if (instructor.getDataValue('is_active') === false) {
      throw new UnauthorizedException('Account is deactivated');
    }

    const isPasswordValid = await this.instructorsService.validatePassword(
      instructor,
      password,
    );

    if (!isPasswordValid) {
      return null;
    }

    // Update last login timestamp
    await this.instructorsService.updateLastLogin(
      instructor.getDataValue('instructor_id'),
    );

    return instructor;
  }

  async login(instructor: Instructors): Promise<LoginResponse> {
    const payload: JwtPayload = {
      email: instructor.getDataValue('email'),
      sub: instructor.getDataValue('instructor_id'),
      role: instructor.getDataValue('role'),
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      instructor: {
        id: instructor.getDataValue('instructor_id'),
        email: instructor.getDataValue('email'),
        firstName: instructor.getDataValue('first_name'),
        lastName: instructor.getDataValue('last_name'),
        role: instructor.getDataValue('role'),
      },
    };
  }

  async loginWithCredentials(loginDto: LoginDto): Promise<LoginResponse> {
    const instructor = await this.validateInstructor(
      loginDto.email,
      loginDto.password,
    );

    if (!instructor) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.login(instructor);
  }

  async register(
    createInstructorDto: CreateInstructorDto,
  ): Promise<Instructors> {
    try {
      const instructor =
        await this.instructorsService.create(createInstructorDto);
      return instructor;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new ConflictException('Failed to create instructor account');
    }
  }

  async changePassword(
    instructorId: number,
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    const instructor = await this.instructorsService.findById(instructorId);

    if (!instructor) {
      throw new UnauthorizedException('Instructor not found');
    }

    const isCurrentPasswordValid =
      await this.instructorsService.validatePassword(
        instructor,
        currentPassword,
      );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    await this.instructorsService.changePassword(instructorId, newPassword);
  }

  async getProfile(instructorId: number): Promise<any> {
    const instructor = await this.instructorsService.findByIdSafe(instructorId);

    if (!instructor) {
      throw new UnauthorizedException('Instructor not found');
    }

    return {
      id: instructor.instructor_id,
      email: instructor.email,
      firstName: instructor.first_name,
      lastName: instructor.last_name,
      role: instructor.role,
      isActive: instructor.is_active,
      lastLogin: instructor.last_login,
      createdAt: instructor.created_at,
    };
  }

  async refreshToken(instructorId: number): Promise<{ access_token: string }> {
    const instructor = await this.instructorsService.findById(instructorId);

    if (!instructor || instructor.getDataValue('is_active') === false) {
      throw new UnauthorizedException(
        'Invalid instructor or account deactivated',
      );
    }

    const payload: JwtPayload = {
      email: instructor.getDataValue('email'),
      sub: instructor.getDataValue('instructor_id'),
      role: instructor.getDataValue('role'),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
