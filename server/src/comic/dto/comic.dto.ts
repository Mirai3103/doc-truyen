import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  FilterableField,
  IDField,
  KeySet,
} from '@ptc-org/nestjs-query-graphql';
import { Status } from '../schema/comic.schema';
import { Tag } from '@/tag/schema/tag.schema';
import { User } from '@/user/schema/user.schema';
import { Author } from '@/author/schema/author.schema';
import { Chapter } from '@/chapter/schema/chapter.schema';

@ObjectType()
@KeySet(['slug', '_id'])
export class ComicBriefDto {
  @IDField(() => ID)
  _id: string;

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
