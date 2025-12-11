import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser'
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import Express from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads/models'),
    serveRoot: '/uploads/models',
  });
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://3d-watch-app.netlify.app'
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, application/json'
  });
  app.use('/uploads/images', Express.static(join(__dirname, '..', 'uploads/images')));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();