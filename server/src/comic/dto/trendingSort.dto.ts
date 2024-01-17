import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ValidateBy } from 'class-validator';

export enum TrendingSortType {
  FOLLOW_COUNT = 'totalViewCount',
  TOP_WEEK = 'weekViewCount',
  TOP_MONTH = 'monthViewCount',
  TOP_YEAR = 'yearViewCount',
  NEWEST = 'updatedAt',
}

@ObjectType()
export class SortType {
  @Field(() => String)
  field: string;
  @Field(() => String)
  direction: 'asc' | 'desc';
}
@ObjectType()
export class SortOption {
  @Field(() => String)
  name: string;
  @Field(() => SortType)
  value: SortType;

  public static readonly allSortOptions: SortOption[] = [
    {
      name: 'Mới cập nhật',
      value: {
        direction: 'desc',
        field: 'updatedAt',
      },
    },
    {
      name: 'Mới đăng',
      value: {
        direction: 'desc',
        field: 'createdAt',
      },
    },
    {
      name: 'Lượt xem nhiều nhất',
      value: {
        direction: 'desc',
        field: 'totalViewCount',
      },
    },
    {
      name: 'Lượt xem ít nhất',
      value: {
        direction: 'asc',
        field: 'totalViewCount',
      },
    },
    {
      name: 'Top theo dõi',
      value: {
        direction: 'desc',
        field: 'followCount',
      },
    },
    {
      name: 'Top tuần',
      value: {
        direction: 'desc',
        field: 'weekViewCount',
      },
    },
    {
      name: 'Top tháng',
      value: {
        direction: 'desc',
        field: 'monthViewCount',
      },
    },
    {
      name: 'Top năm',
      value: {
        direction: 'desc',
        field: 'yearViewCount',
      },
    },
    {
      name: 'Cũ nhất',
      value: {
        direction: 'asc',
        field: 'updatedAt',
      },
    },
    {
      name: 'Tên A-Z',
      value: {
        direction: 'asc',
        field: 'name',
      },
    },
    {
      name: 'Tên Z-A',
      value: {
        direction: 'desc',
        field: 'name',
      },
    },
  ];
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
