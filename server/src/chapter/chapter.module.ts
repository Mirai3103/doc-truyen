import { ChapterService } from './chapter.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from './schema/chapter.schema';
import { ComicModule } from '@/comic/comic.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chapter.name,
        schema: ChapterSchema,
      },
    ]),
    ComicModule,
  ],
  controllers: [],
  providers: [ChapterService],
})
export class ChapterModule {}
