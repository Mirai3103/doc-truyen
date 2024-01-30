import { Author, AuthorSchema } from '@/author/schema/author.schema';
import { Chapter, ChapterSchema } from '@/chapter/schema/chapter.schema';
import { Comic, ComicSchema } from '@/comic/schema/comic.schema';
import { Tag, TagSchema } from '@/tag/schema/tag.schema';
import { User, UserSchema } from '@/user/schema/user.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CrawlService } from './crawl.service';
import { DatabaseModule } from '@/database/database.module';
@Module({
  imports: [
    DatabaseModule,
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
        name: Author.name,
        schema: AuthorSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Tag.name,
        schema: TagSchema,
      },
    ]),
  ],
  providers: [CrawlService],
})
export class CrawlModule {}
