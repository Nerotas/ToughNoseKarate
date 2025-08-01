import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
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
import { OneStepsController } from './controller/oneSteps.controller';
import { ParentMappingController } from './controller/parentMapping.controller';
import { ParentsController } from './controller/parents.controller';
import { PunchesController } from './controller/punches.controller';
import { StanceDefinitionsController } from './controller/stanceDefinitions.controller';
import { StancesController } from './controller/stances.controller';
import { StudentsController } from './controller/students.controller';

// Services
import { AppService } from './service/app.service';

import { CombinationsService } from './service/combinations.service';
import { FallingService } from './service/falling.service';
import { FormsService } from './service/forms.service';
import { KicksService } from './service/kicks.service';
import { OneStepsService } from './service/oneSteps.service';
import { ParentMappingService } from './service/parentMapping.service';
import { ParentsService } from './service/parents.service';
import { PunchesService } from './service/punches.service';
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
import { oneSteps } from './models/oneSteps';
import { parentMapping } from './models/parentMapping';
import { parents } from './models/parents';
import { punches } from './models/punches';
import { stanceDefinitions } from './models/stanceDefinitions';
import { stances } from './models/stances';
import { students } from './models/students';
import { FamiliesService } from './service/families.service';
import { BeltRequirementsService } from './service/beltRequirements.service';
import { BlocksService } from './service/blocks.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    PassportModule,
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'toughnosekarate',
      models: [
        beltRequirements,
        blocks,
        combinations,
        falling,
        families,
        forms,
        kicks,
        oneSteps,
        parentMapping,
        parents,
        punches,
        stanceDefinitions,
        stances,
        students,
      ],
      autoLoadModels: true,
      synchronize: false,
    }),
    SequelizeModule.forFeature([
      beltRequirements,
      blocks,
      combinations,
      falling,
      families,
      forms,
      kicks,
      oneSteps,
      parentMapping,
      parents,
      punches,
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
    OneStepsController,
    ParentMappingController,
    ParentsController,
    PunchesController,
    StanceDefinitionsController,
    StancesController,
    StudentsController,
  ],
  providers: [
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
    Logger,
    LoggerService,
    OneStepsService,
    ParentMappingService,
    ParentsService,
    PunchesService,
    StanceDefinitionsService,
    StancesService,
    StudentsService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MetricsMiddleware)
      .forRoutes('*');
  }
}
