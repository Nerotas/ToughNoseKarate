import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Instructors } from '../models/instructors';
import { InstructorsService } from '../service/instructors.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION', '1d'),
        },
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([Instructors]),
  ],
  providers: [JwtStrategy, JwtAuthGuard, RolesGuard, InstructorsService],
  exports: [JwtStrategy, JwtAuthGuard, RolesGuard, PassportModule, JwtModule],
})
export class AuthModule {}
