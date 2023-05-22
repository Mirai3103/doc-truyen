import { Field, InputType } from '@nestjs/graphql';
import { ValidateBy } from 'class-validator';

export enum TrendingSortType {
  FOLLOW_COUNT = 'totalViewCount',
  TOP_WEEK = 'topWeek',
  TOP_MONTH = 'topMonth',
  TOP_YEAR = 'topYear',
  NEWEST = 'newest',
}

@InputType()
export class TrendingSortInput {
  @Field()
  @ValidateBy({
    name: 'isTrendingSortField',
    validator: {
      validate: (value: string) => {
        return Object.values(TrendingSortType).includes(value as any);
      },
    },
  })
  type: TrendingSortType;
  @Field({ defaultValue: 5, nullable: true })
  limit: number;
  @Field({ defaultValue: 5, nullable: true })
  page: number;
}
