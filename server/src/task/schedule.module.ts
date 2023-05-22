import { CrawlerModule } from '@/crawler/crawler.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';

@Module({
  imports: [ScheduleModule.forRoot(), CrawlerModule],
  providers: [TasksService],
})
export class AppScheduleModule {}
