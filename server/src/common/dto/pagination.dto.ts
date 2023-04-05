import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';

export function PaginateResult<T>(ItemType: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PageClass {
    @Field(() => [ItemType])
    data: T[];

    @Field(() => Int)
    totalPages: number;
  }

  return PageClass;
}
export interface PageClass<T> {
  data: T[];
  totalPages: number;
}
