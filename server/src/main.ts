import dotenv from 'dotenv';
dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CrawlerService } from './crawler/crawler.service';
import { ComikService } from './crawler/comik.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

async function runCrwaler() {
  const app = await NestFactory.create(AppModule);
  const crawlerService = app.get(ComikService);
  await crawlerService.generateJson();
}
runCrwaler();
// const args = process.argv.slice(2);
// if (args.join('').includes('crawl')) {
//   console.log('Crawling data...');

// } else {
//   console.log('Starting server...');
//   bootstrap();
// }
