import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  KeySet,
  Relation,
} from '@ptc-org/nestjs-query-graphql';
import { Comic, Status } from '../schema/comic.schema';
import { Tag } from '@/tag/schema/tag.schema';
import { User } from '@/user/schema/user.schema';
import { Author } from '@/author/schema/author.schema';
import { Chapter } from '@/chapter/schema/chapter.schema';
import { BaseSchema, BaseSchemaDto } from '@/base/schema/base.schema';
import {
  Assembler,
  ClassTransformerAssembler,
} from '@ptc-org/nestjs-query-core';

@ObjectType()
@KeySet(['slug', '_id'])
@Relation('category', () => Tag, {})
export class ComicBriefDto extends BaseSchemaDto {
  @FilterableField(() => String, {
    allowedComparisons: ['eq', 'neq', 'like', 'iLike', 'notLike'],
  })
  name: string;

  @Field(() => [String])
  otherNames: string[];

  @FilterableField(() => String, {
    allowedComparisons: ['eq', 'neq', 'like', 'iLike', 'notLike'],
  })
  slug: string;
  @Field()
  description: string;
  @Field()
  imageCoverUrl: string;

  @FilterableField(() => String, {
    allowedComparisons: ['eq', 'in', 'notIn'],
  })
  status: Status = Status.NonPublished;
  @Field(() => Tag)
  category: Tag = '64362ce5372c92c23ca0bcc8' as any;
  @Field(() => User)
  createdBy: User;
  @FilterableField(() => [String], {
    allowedComparisons: ['in', 'notIn'],
  })
  contributors: string[] = [];
  @Field()
  author: Author;
  @Field(() => Tag)
  genres: Tag[] = [];

  @FilterableField(() => Number, {
    allowedComparisons: ['between', 'gt', 'gte', 'lt', 'lte', 'neq'],
  })
  followCount: number;
  @Field()
  recentChapter: Chapter;

  @FilterableField(() => Number, {
    allowedComparisons: ['between', 'gt', 'gte', 'lt', 'lte', 'neq'],
  })
  @Field(() => Int)
  chapterCount = 0;
  // analytics
  weekViewCount: number;
  monthViewCount: number;
  yearViewCount: number;

  @FilterableField(() => Number, {
    allowedComparisons: ['between', 'gt', 'gte', 'lt', 'lte', 'neq'],
  })
  totalViewCount: number;
  todayViewCount: number;
}

@Assembler(ComicBriefDto, Comic)
export class ComicBriefDtoAssembler extends ClassTransformerAssembler<
  ComicBriefDto,
  Comic
> {
  convertToDTO(entity: Comic): ComicBriefDto {
    return entity.toJSON();
  }
}
