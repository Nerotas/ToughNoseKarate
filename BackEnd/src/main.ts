import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerService } from './service/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
  });
  app.enableCors({
    origin: process.env.CORS ? [...process.env.CORS.split(',')] : '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'OPTIONS'],
    credentials: true,
    preflightContinue: true,
  });
  const config = new DocumentBuilder()
    .setTitle('Tough Nose Karate API')
    .setDescription('Martial Arts Management System REST API')
    .setVersion('1.0')

//to be implemented if live
    // .addBearerAuth(
    //   { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' },
    //   'JWT',
    // )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // this
    },
  });

  app.useLogger(app.get(LoggerService));
  const port = process.env.PORT || 3000;
  console.log('App listening on port', port, 'press Ctrl+C to stop');
  await app.listen(port);
}

process.on('SIGINT', function () {
  console.log('Ctrl+C pressed, stopping app...');
  process.exit(0);
});

bootstrap();
