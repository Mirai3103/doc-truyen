import { ComicService } from './comic.service';
/*
https://docs.nestjs.com/modules
*/

import { AuthorModule } from '@/author/author.module';
import { ChapterModule } from '@/chapter/chapter.module';
import { CommonModule } from '@/common/common.module';
import { TagModule } from '@/tag/tag.module';
import { TeamModule } from '@/team/team.module';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComicResolver } from './comic.resolver';
import { Comic, ComicSchema } from './schema/comic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comic.name,
        schema: ComicSchema,
      },
    ]),
    AuthorModule,
    TeamModule,
    TagModule,
    CommonModule,
    forwardRef(() => ChapterModule),
  ],
  controllers: [],
  exports: [ComicService],
  providers: [ComicService, ComicResolver],
})
export class ComicModule {}
