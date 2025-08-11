import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggerService } from './service/logger.service';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProd = process.env.NODE_ENV === 'production';

  // Behind proxy in prod (needed for secure cookies)
  app.set('trust proxy', 1);

  // Simplest: exact origins, no allowedHeaders override
  const whitelist = new Set([
    'http://localhost:3000',
    'https://toughnosekarate.netlify.app',
    process.env.FRONTEND_URL || '',
  ]);

  interface CorsOriginCallback {
    (err: Error | null, allow?: boolean): void;
  }

  interface CorsOptions {
    origin: (origin: string | undefined, cb: CorsOriginCallback) => void;
    credentials: boolean;
    methods: string[];
    optionsSuccessStatus: number;
  }

  app.enableCors(<CorsOptions>{
    origin: (origin: string | undefined, cb: CorsOriginCallback) => {
      if (!origin) return cb(null, true); // allow Postman/curl
      if (
        whitelist.has(origin) ||
        (isProd && origin.endsWith('.netlify.app'))
      ) {
        return cb(null, true);
      }
      return cb(new Error(`CORS blocked: ${origin}`), false);
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 204,
  });

  // Get configuration service
  const configService = app.get(AppConfigService);

  // Validate required configurations on startup
  try {
    configService.validateRequiredConfigs();
    console.log(`✅ Environment validation passed`);
    console.log(`🗄️  Database: ${configService.getDatabaseConnectionInfo()}`);
    console.log(`🌍 Environment: ${configService.nodeEnv}`);
  } catch (error) {
    console.error('❌ Environment validation failed:', error.message);
    process.exit(1);
  }

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  // Enable cookie parser
  app.use(cookieParser());

  // Add global validation pipe for input validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Tough Nose Karate API')
    .setDescription('Martial Arts Management System REST API')
    .setVersion('1.0')
    .addServer('/v1', 'Version 1')
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('Students', 'Student management endpoints')
    .addTag('Techniques', 'Technique definition endpoints')
    .addTag('Belt Requirements', 'Belt requirement endpoints')
    .addTag('Health', 'System health endpoints')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
    },
  });

  app.useLogger(app.get(LoggerService));
  const port = configService.port;
  console.log(`🚀 App listening on port ${port} - press Ctrl+C to stop`);
  await app.listen(port);
}

process.on('SIGINT', function () {
  console.log('Ctrl+C pressed, stopping app...');
  process.exit(0);
});

bootstrap();
