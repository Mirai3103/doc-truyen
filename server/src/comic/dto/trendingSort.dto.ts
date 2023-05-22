import { Field, InputType } from '@nestjs/graphql';
import { ValidateBy } from 'class-validator';

export enum TrendingSortType {
  FOLLOW_COUNT = 'totalViewCount',
  TOP_WEEK = 'weekViewCount',
  TOP_MONTH = 'monthViewCount',
  TOP_YEAR = 'yearViewCount',
  NEWEST = 'updatedAt',
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
