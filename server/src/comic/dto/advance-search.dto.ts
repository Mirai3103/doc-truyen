import { Field, InputType, ObjectType } from '@nestjs/graphql';

import { PaginateResult } from '@/common/dto/pagination.dto';
import { Comic } from '../schema/comic.schema';

@InputType()
export default class AdvanceSearchInput {
  @Field(() => String, { nullable: true })
  keyword?: string;
  @Field(() => [String], { nullable: true })
  categoryIds?: string[];
  @Field(() => [String], { nullable: true })
  authorIds?: string[];

  @Field(() => [String], { nullable: true })
  genreIds?: string[];
  @Field(() => String, { nullable: true })
  creatorId?: string;
  @Field({ defaultValue: 'updatedAt', nullable: true })
  sortField: string;
  @Field({ defaultValue: 'desc', nullable: true })
  sortType: 'asc' | 'desc';
  @Field({ defaultValue: 25, nullable: true })
  limit: number;
  @Field({ defaultValue: 1, nullable: true })
  page: number;
}
@ObjectType()
export class ComicPage extends PaginateResult(Comic) {}
