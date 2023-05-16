import { Field, ObjectType } from '@nestjs/graphql';
import { Author } from '../schema/author.schema';

@ObjectType()
export class QueryAuthorsDTO {
  @Field(() => [Author])
  authors: Author[];
  @Field()
  count: number;
}
