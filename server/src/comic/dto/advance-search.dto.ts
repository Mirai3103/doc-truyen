import { Field, InputType } from '@nestjs/graphql';
import { ValidateBy } from 'class-validator';
import { TrendingSortType } from './trendingSort.dto';

@InputType()
export default class AdvanceSearchInput {
  @Field(() => String, { nullable: true })
  keyword?: string;
  @Field(() => String, { nullable: true })
  categoryId?: string;
  @Field(() => String, { nullable: true })
  authorId?: string;
  @Field(() => String, { nullable: true })
  artistId?: string;
  @Field(() => [String], { nullable: true })
  genreIds?: string[];
  @Field(() => String, { nullable: true })
  creatorId?: string;
  @Field({ defaultValue: TrendingSortType.NEWEST, nullable: true })
  @ValidateBy({
    name: 'isTrendingSortField',
    validator: {
      validate: (value: string) => {
        return Object.values(TrendingSortType).includes(value as any);
      },
    },
  })
  sortField: TrendingSortType;
  @Field({ defaultValue: 'desc', nullable: true })
  sortType: 'asc' | 'desc';
  @Field({ defaultValue: 25, nullable: true })
  limit: number;
  @Field({ defaultValue: 1, nullable: true })
  page: number;
}
