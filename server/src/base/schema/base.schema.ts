import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
export class BaseSchema {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}
