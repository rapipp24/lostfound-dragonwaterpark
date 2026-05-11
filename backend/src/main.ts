import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aktifkan validasi global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Dukungan x-www-form-urlencoded
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
