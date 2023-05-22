import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import path from 'path';
const parentPath = path.resolve(path.resolve(), '..');
dotenv.config({
  path: `${parentPath}${path.sep}dev.env`,
  override: true,
});

import { AppModule } from './app.module';
import { ComikService } from './crawler/comik.service';
import { CrawlerService } from './crawler/crawler.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const crawlerService = app.get(ComikService);
  const cuuService = app.get(CrawlerService);

  //   console.log('Start crawl tag and author');
  await app.listen(Number(process.env.PORT) || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log('Start crawl data');
  cuuService.crawNewChapter().then(() => {
    console.log('Done');
  });
  // crawlerService.crawlTagAndAuthor().then(() => {
  //   console.log('Done');
  // });
}
bootstrap();
