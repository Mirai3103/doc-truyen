import { Field, InputType } from '@nestjs/graphql';
import mongoose from 'mongoose';
@InputType()
export class FindUserDto {
  @Field(() => String, { nullable: true })
  username?: string;
  @Field(() => String, { nullable: true })
  email?: string;
  @Field(() => String, { nullable: true })
  _id?: mongoose.Types.ObjectId;
}
