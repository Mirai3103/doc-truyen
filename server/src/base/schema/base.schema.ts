import { Field, ID, ObjectType, extend } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Document } from 'mongoose';
import { IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType()
export class BaseSchema extends Document {
  @Field(() => String)
  @IDField(() => ID)
  _id: MongooseSchema.Types.ObjectId;
  @Field(() => Date)
  createdAt: Date = new Date();
  @Field(() => Date)
  updatedAt: Date = new Date();
}
