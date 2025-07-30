import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './service/app.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { CacheModule } from '@nestjs/cache-manager';
import { TerminusModule } from '@nestjs/terminus';

import { MetricsMiddleware } from './middlewares/metrics.middleware';
import { MetricsModule } from 'metrics.module';
import { rewritePathToRoot } from './lib/rewrite-path-to-root';
import { RequestLoggerMiddleware } from './middlewares/RequestLoggerMiddleware';
import { RouteRewriteMiddleware } from './middlewares/RouteRewriteMiddleware';

// Controllers
import { BeltRequirementsController } from './controller/belt-requirements.controller';
import { CombinationsController } from './controller/combinations.controller';
import { FallingController } from './controller/falling.controller';
import { FormsController } from './controller/forms.controller';
import { OneStepsController } from './controller/oneSteps.controller';
import { ParentMappingController } from './controller/parentMapping.controller';
import { ParentsController } from './controller/parents.controller';
import { StancesController } from './controller/stances.controller';
import { StudentsController } from './controller/students.controller';

// Services
import { BeltRequirementsService } from './service/beltRequirements.service.ts';
import { CombinationsService } from './service/combinations.service';
import { FallingService } from './service/falling.service';
import { FormsService } from './service/forms.service';
import { OneStepsService } from './service/oneSteps.service';
import { ParentMappingService } from './service/parentMapping.service';
import { ParentsService } from './service/parents.service';
import { StancesService } from './service/stances.service';
import { StudentsService } from './service/students.service';
import { DatabaseService } from './service/database.service';

@Module({
  imports: [
    MetricsModule,
    TerminusModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
    }),
    CacheModule.register({
      ttl: 1000 * 60 * 60 * 24,
      max: 10_000, // maximum number of items in cache
    }),
    PassportModule,
    HttpModule.register({
      timeout: 60000, // 60 seconds
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      name: 'TNK',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      autoLoadModels: false,
      synchronize: false,
      models: [],
    }),

    SequelizeModule.forFeature([], 'MainDB'),
  ],
  controllers: [
    AppController,
    BeltRequirementsController,
    CombinationsController,
    FallingController,
    FormsController,
    OneStepsController,
    ParentMappingController,
    ParentsController,
    StancesController,
    StudentsController,
  ],
  providers: [
    AppService,
    JwtService,
    DatabaseService,
    BeltRequirementsService,
    CombinationsService,
    FallingService,
    FormsService,
    OneStepsService,
    ParentMappingService,
    ParentsService,
    StancesService,
    StudentsService,
  ],
})
export class AppModule implements NestModule {
  private logger = new Logger(AppModule.name);
  configure(consumer: MiddlewareConsumer) {
    const rewriteBase = rewritePathToRoot();
    if (rewriteBase) {
      this.logger.log(
        `REWRITE_PATH_TO_ROOT env var was provided, rewriting all routes from '/${rewriteBase}*' to '/'.`,
      );
      this.logger.log(
        `App listening on port ${
          process.env.PORT || 6137
        } press Ctrl+C to stop'`,
      );
      consumer
        .apply(RouteRewriteMiddleware)
        .forRoutes({ path: `${rewriteBase}*`, method: RequestMethod.ALL });
    } else {
      this.logger.log(
        `REWRITE_PATH_TO_ROOT env var NOT provided, will not rewrite routes.`,
      );
    }
    consumer.apply(RequestLoggerMiddleware, MetricsMiddleware).forRoutes('*');
  }
}
