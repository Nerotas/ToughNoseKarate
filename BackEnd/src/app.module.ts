import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService, JwtModule } from '@nestjs/jwt';
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
import { BlocksController } from './controller/blocks.controller';
import { CombinationsController } from './controller/combinations.controller';
import { FallingController } from './controller/falling.controller';
import { FamiliesController } from './controller/families.controller';
import { FormDefinitionsController } from './controller/formDefinitions.controller';
import { FormsController } from './controller/forms.controller';
import { KicksController } from './controller/kicks.controller';
import { KicksDefinitionsController } from './controller/kicksDefinitions.controller';
import { OneStepsController } from './controller/oneSteps.controller';
import { OneStepsDefinitionsController } from './controller/oneStepsDefinitions.controller';
import { ParentMappingController } from './controller/parentMapping.controller';
import { ParentsController } from './controller/parents.controller';
import { PunchesController } from './controller/punches.controller';
import { PunchesDefinitionsController } from './controller/punchesDefinitions.controller';
import { SelfDefenseDefinitionsController } from './controller/selfDefenseDefinitions.controller';
import { StanceDefinitionsController } from './controller/stanceDefinitions.controller';
import { StancesController } from './controller/stances.controller';
import { StudentsController } from './controller/students.controller';
import { StudentProgressController } from './controller/studentProgress.controller';
import { StudentTestsController } from './controller/studentTests.controller';
import { StudentAssessmentsController } from './controller/studentAssessments.controller';

// Services
import { AppService } from './service/app.service';

import { CombinationsService } from './service/combinations.service';
import { FallingService } from './service/falling.service';
import { FormDefinitionsService } from './service/formDefinitions.service';
import { FormsService } from './service/forms.service';
import { KicksService } from './service/kicks.service';
import { KicksDefinitionsService } from './service/kicksDefinitions.service';
import { OneStepsService } from './service/oneSteps.service';
import { OneStepsDefinitionsService } from './service/oneStepsDefinitions.service';
import { ParentMappingService } from './service/parentMapping.service';
import { ParentsService } from './service/parents.service';
import { PunchesService } from './service/punches.service';
import { PunchesDefinitionsService } from './service/punchesDefinitions.service';
import { SelfDefenseDefinitionsService } from './service/selfDefenseDefinitions.service';
import { StanceDefinitionsService } from './service/stanceDefinitions.service';
import { StancesService } from './service/stances.service';
import { StudentsService } from './service/students.service';
import { StudentProgressService } from './service/studentProgress.service';
import { StudentTestsService } from './service/studentTests.service';
import { StudentAssessmentsService } from './service/studentAssessments.service';
import { InstructorsService } from './service/instructors.service';
import { LoggerService } from './service/logger.service';

// Auth
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthModule } from './auth/auth.module';

// Health
import { HealthController } from './health/health.controller';
import { LocalHealthCheckService } from './health/health.service';

// Models
import { beltRequirements } from './models/beltRequirements';
import { blocks } from './models/blocks';
import { combinations } from './models/combinations';
import { falling } from './models/falling';
import { families } from './models/families';
import { FormDefinitions } from './models/formDefinitions';
import { forms } from './models/forms';
import { kicks } from './models/kicks';
import { kicksDefinitions } from './models/kicksDefinitions';
import { oneSteps } from './models/oneSteps';
import { oneStepsDefinitions } from './models/oneStepsDefinitions';
import { parentMapping } from './models/parentMapping';
import { parents } from './models/parents';
import { punches } from './models/punches';
import { punchesDefinitions } from './models/punchesDefinitions';
import { selfDefenseDefinitions } from './models/selfDefenseDefinitions';
import { stanceDefinitions } from './models/stanceDefinitions';
import { stances } from './models/stances';
import { students } from './models/students';
import { studentTests } from './models/studentTests';
import { testResults } from './models/testResults';
import { StudentAssessments } from './models/student_assessments';
import { Instructors } from './models/instructors';
import { FamiliesService } from './service/families.service';
import { BeltRequirementsService } from './service/beltRequirements.service';
import { BlocksService } from './service/blocks.service';
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
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        ssl: configService.get<boolean>('DB_SSL'),
        models: [
          beltRequirements,
          blocks,
          combinations,
          falling,
          families,
          FormDefinitions,
          forms,
          Instructors,
          kicks,
          kicksDefinitions,
          oneSteps,
          oneStepsDefinitions,
          parentMapping,
          parents,
          punches,
          punchesDefinitions,
          selfDefenseDefinitions,
          stanceDefinitions,
          stances,
          students,
          studentTests,
          testResults,
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
      blocks,
      combinations,
      falling,
      families,
      FormDefinitions,
      forms,
      Instructors,
      kicks,
      kicksDefinitions,
      oneSteps,
      oneStepsDefinitions,
      parentMapping,
      parents,
      punches,
      punchesDefinitions,
      selfDefenseDefinitions,
      stanceDefinitions,
      stances,
      students,
      studentTests,
      testResults,
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
    BlocksController,
    CombinationsController,
    FallingController,
    FamiliesController,
    FormDefinitionsController,
    FormsController,
    HealthController,
    KicksController,
    KicksDefinitionsController,
    OneStepsController,
    OneStepsDefinitionsController,
    ParentMappingController,
    ParentsController,
    PunchesController,
    PunchesDefinitionsController,
    SelfDefenseDefinitionsController,
    StanceDefinitionsController,
    StancesController,
    StudentsController,
    StudentProgressController,
    StudentTestsController,
    StudentAssessmentsController,
  ],
  providers: [
    AppConfigService,
    AppService,
    BeltRequirementsService,
    BlocksService,
    CombinationsService,
    FallingService,
    FamiliesService,
    FormDefinitionsService,
    FormsService,
    LocalHealthCheckService,
    JwtService,
    KicksService,
    KicksDefinitionsService,
    Logger,
    LoggerService,
    OneStepsService,
    OneStepsDefinitionsService,
    ParentMappingService,
    ParentsService,
    PunchesService,
    PunchesDefinitionsService,
    SelfDefenseDefinitionsService,
    StanceDefinitionsService,
    StancesService,
    StudentsService,
    StudentProgressService,
    StudentTestsService,
    StudentAssessmentsService,
    InstructorsService,
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
