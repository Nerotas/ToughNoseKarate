import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { LoggerService } from './service/logger.service';
import { AppConfigService } from './config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
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

  // Configure CORS using config service
  app.enableCors({
    origin: configService.corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Tough Nose Karate API')
    .setDescription('Martial Arts Management System REST API')
    .setVersion('1.0')

    // TODO: Implement authentication (e.g., addBearerAuth) when the application goes live.
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
    //   'JWT',
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${configService.apiPrefix}`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
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
