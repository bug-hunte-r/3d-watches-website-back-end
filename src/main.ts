import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import { join } from 'path';
import express from 'express';

async function bootstrap() {
  const server = express();

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );

  server.set('trust proxy', 1);

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://3d-watch-app.netlify.app',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: ['set-cookie'],
  });

  app.use(
    '/uploads/images',
    express.static(join(__dirname, '..', 'uploads/images')),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();