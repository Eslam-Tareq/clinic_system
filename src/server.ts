// src/server.ts
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import type { Request, Response } from 'express';
import express = require('express');
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

// طريقة import متوافقة مع TypeScript بدون تعديل tsconfig:
import cookieParser = require('cookie-parser');

const server = express();

// Initialization once (cold start handled here)
const initPromise = (async () => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  // اختياري: شغّل الـ Swagger بس في non-production لو حاب تقلل حجم المنتج:
  if (process.env.NODE_ENV !== 'production') {
    try {
      SwaggerConfig.setup(app);
    } catch (e) {
      console.warn('Swagger setup failed:', e);
    }
  }

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  const prefix = process.env.GLOBAL_PREFIX ?? 'api';
  app.setGlobalPrefix(prefix, { exclude: ['/'] });

  // مهم: نسمي init بدل listen
  await app.init();
  return server;
})();

export default async function handler(req: Request, res: Response) {
  try {
    const appServer = await initPromise;
    appServer(req, res);
  } catch (err) {
    console.error('Server handler error:', err);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
}
