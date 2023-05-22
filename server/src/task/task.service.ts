import { CrawlerService } from '@/crawler/crawler.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly crawlerService: CrawlerService) {}

  @Cron('0 30 04 * * 0-6')
  crawNewest() {
    this.logger.debug(
      'Called when the current time is 04:30:00 every day of the week.',
    );
    this.crawlerService.crawNewChapter();
  }
  //   @Cron(CronExpression.EVERY_10_SECONDS)
  //   test() {
  //     this.logger.debug('Called every 10 seconds');
  //   }
}
