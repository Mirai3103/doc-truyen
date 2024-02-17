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
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { withCreatorRole } from '@/auth/guard/roles.guard';
import { ComicEventHandlers } from './handlers';

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
            guards: [withCreatorRole],
          },
          update: {
            guards: [withCreatorRole],
          },
          delete: {
            guards: [withCreatorRole],
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
  providers: [AuthorService, AuthorResolver, ComicEventHandlers],
  exports: [AuthorService],
})
export class AuthorModule {}
