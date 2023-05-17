import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '../schema/user.schema';
@ObjectType()
export class UserQueryDto {
  @Field(() => [User])
  users: User[];
  @Field(() => Int)
  count: number;
}
