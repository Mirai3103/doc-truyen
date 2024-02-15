import { Comic, ComicSchema } from '@/comic/schema/comic.schema';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '../common/common.module';
import { DatabaseModule } from '../database/database.module';
import { Tag, TagSchema } from './schema/tag.schema';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';
import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryMongooseModule } from '@ptc-org/nestjs-query-mongoose';
import { CreateTagDto } from './dto/createTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import { GrapqlJwtAuthGuard } from '@/auth/guard/grapql-jwt.auth.guard';
import { withCreatorRole } from '@/auth/guard/roles.guard';

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
            document: Tag,
            name: Tag.name,
            schema: TagSchema,
          },
        ]),
      ],
      // describe the resolvers you want to expose
      resolvers: [
        {
          DTOClass: Tag,
          EntityClass: Tag,
          CreateDTOClass: CreateTagDto,
          UpdateDTOClass: UpdateTagDto,
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
        name: Tag.name,
        schema: TagSchema,
      },
      {
        name: Comic.name,
        schema: ComicSchema,
      },
    ]),
    forwardRef(() => CommonModule),
  ],
  exports: [TagService],
  providers: [TagService, TagResolver],
})
export class TagModule {}
