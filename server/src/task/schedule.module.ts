import { CrawlerModule } from '@/crawler/crawler.module';
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './task.service';
import { SeederModule } from '@/seeder/seeder.module';

@Module({
  imports: [ScheduleModule.forRoot(), CrawlerModule, SeederModule],
  providers: [TasksService],
})
export class AppScheduleModule {}
