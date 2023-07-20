import { ComikService } from '@/crawler/comik.service';
import { CrawlerService } from '@/crawler/crawler.service';
import { SeederService } from '@/seeder/seeder.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly crawlerService: CrawlerService,
    private readonly commikService: ComikService,
    private readonly seedService: SeederService,
  ) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async crawNewest() {
    this.logger.debug(
      'start craw newest when the current time is 00:00:00, 06:00:00, 12:00:00, 18:00:00 every day of the week.',
    );
    await this.crawlerService.crawNewChapter();
    await this.commikService.crawlNewManga();
  }
  @Cron(CronExpression.EVERY_30_MINUTES)
  async seedViewChapter() {
    this.logger.debug(
      'start seed view chapter when the current time is 00:00:00, 06:00:00, 12:00:00, 18:00:00 every day of the week.',
    );
    await this.seedService.seedViewChapter();
    await Promise.all([
      this.seedService.updateDateView(),
      this.seedService.updateWeekView(),
    ]);
  }
  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async seedViewChapterYear() {
    await Promise.all([this.seedService.updateYearView()]);
  }

  @Cron(CronExpression.EVERY_WEEK)
  async seedViewChapterMonth() {
    await Promise.all([this.seedService.updateMonthView()]);
  }
}
