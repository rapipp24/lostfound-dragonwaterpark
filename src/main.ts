import {ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // ini yang mencegata kalo ada data yang masuk untuk dicek
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
