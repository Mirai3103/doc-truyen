import { Comic, ComicSchema } from '@/comic/schema/comic.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { DatabaseModule } from '../database/database.module';
import { AuthorController } from './author.controller';
import { AuthorResolver } from './author.resolver';
import { AuthorService } from './author.service';
import { Author, AuthorSchema } from './schema/author.schema';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@nestjs-query/query-graphql';
import { NestjsQueryMongooseModule } from '@nestjs-query/query-mongoose';
import { Chapter, ChapterSchema } from '@/chapter/schema/chapter.schema';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { WithRoleGuard } from '@/auth/guard/roles.guard';
import { Role } from '@/user/schema/user.schema';
import { GrapqlJwtAuthGuard } from '@/auth/guard/grapql-jwt.auth.guard';

@Module({
  imports: [
    DatabaseModule,
    CommonModule,
    NestjsQueryGraphQLModule.forFeature({
      // import the NestjsQueryMongooseModule to register the entity with mongoose
      // and provide a QueryService
      imports: [
        NestjsQueryMongooseModule.forFeature([
          {
            document: Author,
            name: Author.name,
            schema: AuthorSchema,
          },
        ]),
      ],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: Author,
          EntityClass: Author,
          CreateDTOClass: CreateAuthorDto,
          UpdateDTOClass: UpdateAuthorDto,
          enableTotalCount: true,
          read: {
            guards: [],
          },
          create: {
            guards: [GrapqlJwtAuthGuard],
          },
          update: {
            guards: [GrapqlJwtAuthGuard],
          },
          delete: {
            guards: [GrapqlJwtAuthGuard],
          },
          pagingStrategy: PagingStrategies.OFFSET,
        },
      ],
    }),
    MongooseModule.forFeature([
      {
        name: Author.name,
        schema: AuthorSchema,
      },
      {
        name: Comic.name,
        schema: ComicSchema,
      },
    ]),
  ],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorResolver],
  exports: [AuthorService],
})
export class AuthorModule {}
