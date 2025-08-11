import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { InstructorsService } from '../service/instructors.service';

interface RefreshJwtPayload {
  sub: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const refreshCookieExtractor = (req: Request): string | null => {
  if (!req) return null;
  return req.cookies?.refreshToken || null;
};

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private configService: ConfigService,
    private instructorsService: InstructorsService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([refreshCookieExtractor]),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('REFRESH_JWT_SECRET') ||
        configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: RefreshJwtPayload) {
    if (!payload?.sub) {
      throw new UnauthorizedException('Invalid refresh token payload');
    }

    const instructor = await this.instructorsService.findById(payload.sub);

    if (!instructor || instructor.getDataValue('is_active') === false) {
      throw new UnauthorizedException(
        'Invalid refresh token - instructor not found or inactive',
      );
    }

    return {
      instructorId: instructor.getDataValue('instructor_id'),
      email: instructor.getDataValue('email'),
      role: instructor.getDataValue('role'),
    };
  }
}
