import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../../src/app.module';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import serverlessExpress from '@vendia/serverless-express';

let cachedServer: any;

async function createServer() {
  if (!cachedServer) {
    const expressApp = express();

    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      { logger: false },
    );

    // Enable CORS for Netlify
    app.enableCors({
      origin: [
        'https://your-app.netlify.app',
        'https://your-staging-app.netlify.app',
        'http://localhost:3000',
      ],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    // Enable cookie parser
    app.use(cookieParser());

    // Set global prefix for API routes
    app.setGlobalPrefix('api');

    await app.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler = async (event: any, context: any) => {
  const server = await createServer();
  return server(event, context);
};
