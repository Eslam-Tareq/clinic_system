// IMPORTANT: This must be the very first import
import 'tsconfig-paths/register';
import 'reflect-metadata';

// Set up path mapping manually
import { register } from 'tsconfig-paths';
const tsConfig = require('../tsconfig.json');
register({
  baseUrl: tsConfig.compilerOptions.baseUrl || './',
  paths: tsConfig.compilerOptions.paths || {},
});

import dotenv from 'dotenv';
dotenv.config();

import serverlessExpress from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SwaggerConfig } from '../src/config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import cookieParser from 'cookie-parser';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let server: any;

async function bootstrap() {
  console.log('🚀 Bootstrapping NestJS application...');

  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log'],
    });

    // Swagger setup
    SwaggerConfig.setup(app);

    // CORS setup
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    // Validation setup
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    // Middleware
    app.use(cookieParser());

    // Global prefix
    if (process.env.GLOBAL_PREFIX) {
      app.setGlobalPrefix(process.env.GLOBAL_PREFIX, { exclude: ['/'] });
    }

    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();

    console.log('✅ NestJS application bootstrapped successfully');
    return serverlessExpress({ app: expressApp });
  } catch (error) {
    console.error('❌ Bootstrap error:', error);
    throw error;
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  console.log(`📝 Request: ${req.method} ${req.url}`);

  try {
    if (!server) {
      server = await bootstrap();
    }

    return server(req, res);
  } catch (error) {
    console.error('❌ Handler error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};
