import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  // Pastikan folder uploads tersedia agar Multer tidak crash
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads', { recursive: true });
  }

  const app = await NestFactory.create(AppModule);

  // Aktifkan validasi global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Dukungan x-www-form-urlencoded & json
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // IZINKAN FOLDER 'uploads' BISA DIAKSES PUBLIK
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
