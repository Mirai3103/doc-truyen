import { ComicService } from './comic.service';
/*
https://docs.nestjs.com/modules
*/

import { AuthorModule } from '@/author/author.module';
import { ChapterModule } from '@/chapter/chapter.module';
import { CommonModule } from '@/common/common.module';
import { TagModule } from '@/tag/tag.module';
import { UserModule } from '@/user/user.module';
import { CacheModule } from '@nestjs/cache-manager';
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComicResolver } from './comic.resolver';
import { Comic, ComicSchema } from './schema/comic.schema';
import { User, UserSchema } from '@/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comic.name,
        schema: ComicSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    CacheModule.register(),
    AuthorModule,
    UserModule,
    TagModule,
    CommonModule,
    forwardRef(() => ChapterModule),
  ],
  controllers: [],
  exports: [ComicService],
  providers: [ComicService, ComicResolver],
})
export class ComicModule {}
