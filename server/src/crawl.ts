import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
import { CrawlModule } from './crawl/crawl.module';
import { CrawlService } from './crawl/crawl.service';
async function bootstrap() {
  const app = await NestFactory.create(CrawlModule);
  const crawlService = app.get(CrawlService);
  await crawlService.crawl();
  app.use(morgan(process.env.MORGAN_LOG_FORMAT || 'dev'));
}
bootstrap();
