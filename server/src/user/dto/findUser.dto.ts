import { Field, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';
@InputType()
export class FindUserDto {
  @Field(() => String, { nullable: true })
  @Transform(({ value }) => (value == '' ? undefined : value))
  username?: string;
  @Field(() => String, { nullable: true })
  @Transform(({ value }) => (value == '' ? undefined : value))
  email?: string;
  @Field(() => String, { nullable: true })
  @Transform(({ value }) => (value == '' ? undefined : value))
  _id?: mongoose.Types.ObjectId;
}
