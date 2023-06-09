import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';

import morgan from 'morgan';
// get project root path
import path from 'path';
const parentPath = path.resolve(path.resolve(), '..');
dotenv.config({
  path: `${parentPath}${path.sep}dev.env`,
  override: true,
});

import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan(process.env.MORGAN_LOG_FORMAT || 'dev'));
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(Number(process.env.PORT) || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
