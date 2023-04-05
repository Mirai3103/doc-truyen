import { CrawlerService } from './crawler.service';
import { HttpModule } from '@nestjs/axios';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comic, ComicSchema } from '@/comic/schema/comic.schema';
import { Chapter, ChapterSchema } from '@/chapter/schema/chapter.schema';
import { Author, AuthorSchema } from '@/author/schema/author.schema';
import { Team, TeamSchema } from '@/team/schema/team.schema';
import { CommonModule } from '@/common/common.module';
import { AuthorModule } from '@/author/author.module';
import { ComikService } from './comik.service';
import { Tag, TagSchema } from '@/tag/schema/tag.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Comic.name,
        schema: ComicSchema,
      },
      {
        name: Chapter.name,
        schema: ChapterSchema,
      },
      {
        name: Tag.name,
        schema: TagSchema,
      },
      {
        name: Author.name,
        schema: AuthorSchema,
      },
      {
        name: Team.name,
        schema: TeamSchema,
      },
    ]),
    CommonModule,
    AuthorModule,
  ],
  providers: [CrawlerService, ComikService],
})
export class CrawlerModule {}
