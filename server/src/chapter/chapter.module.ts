import { ChapterService } from './chapter.service';
/*
https://docs.nestjs.com/modules
*/

import { ComicModule } from '@/comic/comic.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChapterResolver } from './chapter.resolver';
import { Chapter, ChapterSchema } from './schema/chapter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Chapter.name,
        schema: ChapterSchema,
      },
    ]),
    forwardRef(() => ComicModule),
  ],
  controllers: [],
  exports: [ChapterService],
  providers: [ChapterService, ChapterResolver],
})
export class ChapterModule {}
