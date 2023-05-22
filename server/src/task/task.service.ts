import { ComikService } from '@/crawler/comik.service';
import { CrawlerService } from '@/crawler/crawler.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly commikService: ComikService,
  ) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async crawNewest() {
    this.logger.debug(
      'Called when the current time is 04:30:00 every day of the week.',
    );
    await this.crawlerService.crawNewChapter();
    await this.commikService.crawlNewManga();
  }
}
