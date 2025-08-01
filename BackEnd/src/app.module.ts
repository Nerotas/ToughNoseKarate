import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { CacheModule } from '@nestjs/cache-manager';
import { TerminusModule } from '@nestjs/terminus';

import { MetricsMiddleware } from './middlewares/metrics.middleware';
import { MetricsModule } from 'metrics.module';

// Controllers
import { AboutController } from './controller/about.controller';
import { BeltRequirementsController } from './controller/beltRequirements.controller';
import { BlocksController } from './controller/blocks.controller';
import { CombinationsController } from './controller/combinations.controller';
import { FallingController } from './controller/falling.controller';
import { FamiliesController } from './controller/families.controller';
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

// Services
import { AppService } from './service/app.service';

import { CombinationsService } from './service/combinations.service';
import { FallingService } from './service/falling.service';
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
import { LoggerService } from './service/logger.service';

// Health
import { HealthController } from './health/health.controller';
import { LocalHealthCheckService } from './health/health.service';

// Models
import { beltRequirements } from './models/beltRequirements';
import { blocks } from './models/blocks';
import { combinations } from './models/combinations';
import { falling } from './models/falling';
import { families } from './models/families';
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
          forms,
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
      forms,
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
    ]),
    CacheModule.register(),
    TerminusModule,
    MetricsModule,
  ],
  controllers: [
    AboutController,
    BeltRequirementsController,
    BlocksController,
    CombinationsController,
    FallingController,
    FamiliesController,
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
  ],
  providers: [
    AppConfigService,
    AppService,
    BeltRequirementsService,
    BlocksService,
    CombinationsService,
    FallingService,
    FamiliesService,
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
