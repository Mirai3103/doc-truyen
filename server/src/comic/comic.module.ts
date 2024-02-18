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
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { ComicBriefDto } from './dto/comic.dto';
import CreateComicInput from './dto/create-comic-input.dto';
import { withCreatorRole } from '@/auth/guard/roles.guard';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryMongooseModule to register the entity with mongoose
      // and provide a QueryService
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: Comic,
            name: Comic.name,
            schema: ComicSchema,
          },
        ]),
      ],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: ComicBriefDto,
          EntityClass: Comic,
          enableTotalCount: true,
          read: {
            guards: [],
          },
          create: {
            disabled: true,
          },
          update: {
            disabled: true,
          },
          delete: {
            disabled: true,
          },
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
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
