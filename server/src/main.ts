import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import { AppModule } from './app.module';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  //logger console
  //middleware

  await app.listen(3000);
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
