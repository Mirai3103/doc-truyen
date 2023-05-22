import { HttpModule } from '@nestjs/axios';
import { CrawlerService } from './crawler.service';
/*
https://docs.nestjs.com/modules
*/

import { AuthorModule } from '@/author/author.module';
import { Author, AuthorSchema } from '@/author/schema/author.schema';
import { Chapter, ChapterSchema } from '@/chapter/schema/chapter.schema';
import { ComicModule } from '@/comic/comic.module';
import { Comic, ComicSchema } from '@/comic/schema/comic.schema';
import { CommonModule } from '@/common/common.module';
import { Tag, TagSchema } from '@/tag/schema/tag.schema';
import { User, UserSchema } from '@/user/schema/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComikService } from './comik.service';

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
        name: User.name,
        schema: UserSchema,
      },
    ]),
    CommonModule,
    AuthorModule,
    ComicModule,
  ],
  providers: [CrawlerService, ComikService],
  exports: [CrawlerService, ComikService],
})
export class CrawlerModule {}
