import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { InstructorsService } from '../service/instructors.service';

export interface InstructorPayload {
  instructorId: number;
  email: string;
  role: 'instructor' | 'admin';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private instructorsService: InstructorsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (request: Request) => {
          return request?.cookies?.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<InstructorPayload> {
    // Payload structure: { email, sub: instructorId, role, iat, exp }
    const instructor = await this.instructorsService.findById(payload.sub);

    if (!instructor || instructor.getDataValue('is_active') === false) {
      throw new UnauthorizedException(
        'Invalid token - instructor not found or inactive',
      );
    }

    // Return the instructor payload that will be attached to request.user
    return {
      instructorId: instructor.getDataValue('instructor_id'),
      email: instructor.getDataValue('email'),
      role: instructor.getDataValue('role'),
    };
  }
}
