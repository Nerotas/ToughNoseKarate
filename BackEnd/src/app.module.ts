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
  controllers: [AppController],
  providers: [AppService, JwtService],
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
