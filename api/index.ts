import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { SwaggerConfig } from '../src/config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import cookieParser from 'cookie-parser';

const server = express();
let app: any;

async function createNestServer(expressInstance: express.Express) {
  console.log('🚀 Creating NestJS server...');

  try {
    const nestApp = await NestFactory.create(
      AppModule,
      new (require('@nestjs/platform-express').ExpressAdapter)(expressInstance),
      {
        logger: ['error', 'warn', 'log'],
      },
    );

    // Swagger setup
    SwaggerConfig.setup(nestApp);

    // CORS setup
    nestApp.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    // Validation setup
    useContainer(nestApp.select(AppModule), { fallbackOnErrors: true });
    nestApp.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    // Middleware
    nestApp.use(cookieParser());

    // Global prefix
    if (process.env.GLOBAL_PREFIX) {
      nestApp.setGlobalPrefix(process.env.GLOBAL_PREFIX, { exclude: ['/'] });
    }

    await nestApp.init();
    console.log('✅ NestJS server created successfully');
    return nestApp;
  } catch (error) {
    console.error('❌ Error creating NestJS server:', error);
    throw error;
  }
}

export default async (req: VercelRequest, res: VercelResponse) => {
  console.log(`📝 Request: ${req.method} ${req.url}`);

  try {
    if (!app) {
      app = await createNestServer(server);
    }

    return server(req as any, res as any);
  } catch (error) {
    console.error('❌ Server error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
};
