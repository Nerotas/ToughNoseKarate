import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { CacheModule } from '@nestjs/cache-manager';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { MetricsMiddleware } from './middlewares/metrics.middleware';
import { MetricsModule } from 'metrics.module';

// Controllers
import { AboutController } from './controller/about.controller';
import { BeltRequirementsController } from './controller/beltRequirements.controller';
import { BlocksDefinitionsController } from './controller/blocksDefinitions.controller';
import { FamiliesController } from './controller/families.controller';
import { FormDefinitionsController } from './controller/formDefinitions.controller';
import { KicksDefinitionsController } from './controller/kicksDefinitions.controller';
import { OneStepsDefinitionsController } from './controller/oneStepsDefinitions.controller';
import { ParentMappingController } from './controller/parentMapping.controller';
import { ParentsController } from './controller/parents.controller';
import { PunchesDefinitionsController } from './controller/punchesDefinitions.controller';
import { SelfDefenseDefinitionsController } from './controller/selfDefenseDefinitions.controller';
import { StanceDefinitionsController } from './controller/stanceDefinitions.controller';
import { StudentsController } from './controller/students.controller';
import { StudentAssessmentsController } from './controller/studentAssessments.controller';

// Services
import { AppService } from './service/app.service';
import { BlocksDefinitionsService } from './service/blocksDefinitions.service';
import { FormDefinitionsService } from './service/formDefinitions.service';
import { KicksDefinitionsService } from './service/kicksDefinitions.service';
import { OneStepsDefinitionsService } from './service/oneStepsDefinitions.service';
import { ParentMappingService } from './service/parentMapping.service';
import { ParentsService } from './service/parents.service';
import { PunchesDefinitionsService } from './service/punchesDefinitions.service';
import { SelfDefenseDefinitionsService } from './service/selfDefenseDefinitions.service';
import { StanceDefinitionsService } from './service/stanceDefinitions.service';
import { StudentsService } from './service/students.service';
import { StudentAssessmentsService } from './service/studentAssessments.service';
import { LoggerService } from './service/logger.service';

// Auth
import { AuthModule } from './auth/auth.module';

// Health
import { HealthController } from './health/health.controller';
import { LocalHealthCheckService } from './health/health.service';

// Models
import { beltRequirements } from './models/beltRequirements';
import { blocksDefinitions } from './models/blocksDefinitions';
import { families } from './models/families';
import { FormDefinitions } from './models/formDefinitions';
import { kicksDefinitions } from './models/kicksDefinitions';
import { oneStepsDefinitions } from './models/oneStepsDefinitions';
import { parentMapping } from './models/parentMapping';
import { parents } from './models/parents';
import { punchesDefinitions } from './models/punchesDefinitions';
import { selfDefenseDefinitions } from './models/selfDefenseDefinitions';
import { stanceDefinitions } from './models/stanceDefinitions';
import { students } from './models/students';
import { StudentAssessments } from './models/student_assessments';
import { Instructors } from './models/instructors';
import { FamiliesService } from './service/families.service';
import { BeltRequirementsService } from './service/beltRequirements.service';
import { configValidationSchema } from './config/environment.config';
import { AppConfigService } from './config/app-config.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      validationSchema: configValidationSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    PassportModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        ssl: configService.get<boolean>('DB_SSL'),
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        models: [
          beltRequirements,
          blocksDefinitions,
          families,
          FormDefinitions,
          Instructors,
          kicksDefinitions,
          oneStepsDefinitions,
          parentMapping,
          parents,
          punchesDefinitions,
          selfDefenseDefinitions,
          stanceDefinitions,
          students,
          StudentAssessments,
        ],
        autoLoadModels: true,
        synchronize: false,
        logging:
          configService.get<string>('NODE_ENV') === 'development'
            ? console.log
            : false,
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([
      beltRequirements,
      blocksDefinitions,
      families,
      FormDefinitions,
      Instructors,
      kicksDefinitions,
      oneStepsDefinitions,
      parentMapping,
      parents,
      punchesDefinitions,
      selfDefenseDefinitions,
      stanceDefinitions,
      students,
      StudentAssessments,
    ]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const redisHost = configService.get<string>('REDIS_HOST');
        const redisPort = configService.get<number>('REDIS_PORT');
        const redisPassword = configService.get<string>('REDIS_PASSWORD');
        const cacheTtl = configService.get<number>('CACHE_TTL', 300) * 1000; // Convert to milliseconds

        // Try Redis first, fallback to memory cache
        try {
          const { redisStore } = await import('cache-manager-redis-yet');
          return {
            store: redisStore,
            url: `redis://${redisPassword ? `:${redisPassword}@` : ''}${redisHost}:${redisPort}`,
            ttl: cacheTtl,
            max: 100, // Maximum number of items in cache
          };
        } catch (error) {
          console.warn(
            'Redis not available, using memory cache:',
            error.message,
          );
          return {
            ttl: cacheTtl,
            max: 100, // Maximum number of items in cache
          };
        }
      },
      inject: [ConfigService],
    }),
    TerminusModule,
    MetricsModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => [
        {
          name: 'short',
          ttl: configService.get<number>('THROTTLE_TTL', 60) * 1000, // Convert to milliseconds
          limit: configService.get<number>('THROTTLE_LIMIT', 10),
        },
      ],
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [
    AboutController,
    BeltRequirementsController,
    BlocksDefinitionsController,
    FamiliesController,
    FormDefinitionsController,
    HealthController,
    KicksDefinitionsController,
    OneStepsDefinitionsController,
    ParentMappingController,
    ParentsController,
    PunchesDefinitionsController,
    SelfDefenseDefinitionsController,
    StanceDefinitionsController,
    StudentsController,
    StudentAssessmentsController,
  ],
  providers: [
    AppConfigService,
    AppService,
    BeltRequirementsService,
    BlocksDefinitionsService,
    FamiliesService,
    FormDefinitionsService,
    LocalHealthCheckService,
    KicksDefinitionsService,
    Logger,
    LoggerService,
    OneStepsDefinitionsService,
    ParentMappingService,
    ParentsService,
    PunchesDefinitionsService,
    SelfDefenseDefinitionsService,
    StanceDefinitionsService,
    StudentsService,
    StudentAssessmentsService,
    // Global rate limiting guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
