import dotenv = require('dotenv');
dotenv.config();
import serverlessExpress from '@vendia/serverless-express';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import cookieParser = require('cookie-parser');
import { useContainer } from 'class-validator';
import { Handler } from 'express';
let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  SwaggerConfig.setup(app);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cookieParser());

  app.setGlobalPrefix(process.env.GLOBAL_PREFIX, { exclude: ['/'] });
  app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}
bootstrap();
export const handler: Handler = async (
  event: any,
  context: any,
  callback: any,
) => {
  server = server ?? (await bootstrap());
  return server(event, context, callback);
};
