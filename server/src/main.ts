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
  console.log('create app');
  const app = await NestFactory.create(AppModule);
  console.log('app created');
  app.use(morgan(process.env.MORGAN_LOG_FORMAT || 'dev'));
  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(new ValidationPipe());

  //logger console
  //middleware

  await app.listen(Number(process.env.PORT) || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

// async function runCrwaler() {
//   const app = await NestFactory.create(AppModule);
//   const crawlerService = app.get(ComikService);
//   // const cuuService = app.get(CrawlerService);
//   console.log('Start crawl data');
//   // await cuuService.crawlData();
//   console.log('Start generate json');
//   await crawlerService.generateJson();
// }
// runCrwaler();
