import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';

import morgan from 'morgan';

dotenv.config();
import { AppModule } from './app.module';
import mongoose from 'mongoose';
function logAccessTokenMiddleware(req: any, res: any, next: any) {
  console.log(req.headers.authorization);
  next();
}
async function bootstrap() {
  mongoose.set('debug', function (coll, method, query, doc, options) {
    console.log(JSON.stringify(query));
  });
  const app = await NestFactory.create(AppModule);

  app.use(morgan(process.env.MORGAN_LOG_FORMAT || 'dev'));
  app.use(logAccessTokenMiddleware);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(process.env.PORT) || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
