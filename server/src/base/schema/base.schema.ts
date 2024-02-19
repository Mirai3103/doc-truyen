import { Field, ID, ObjectType, extend } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Document } from 'mongoose';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType()
export class BaseSchema extends Document {
  @Field(() => String)
  @IDField(() => ID)
  _id: MongooseSchema.Types.ObjectId;
  @FilterableField(() => Date, {
    allowedComparisons: ['eq', 'neq', 'lt', 'lte', 'gt', 'gte'],
  })
  createdAt: Date = new Date();

  @FilterableField(() => Date, {
    allowedComparisons: ['eq', 'neq', 'lt', 'lte', 'gt', 'gte'],
  })
  updatedAt: Date = new Date();
}
@ObjectType()
export class BaseSchemaDto {
  @Field(() => String)
  @IDField(() => ID)
  _id: MongooseSchema.Types.ObjectId;
  @FilterableField(() => Date, {
    allowedComparisons: ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'between'],
    nullable: true,
  })
  createdAt: Date;
  @FilterableField(() => Date, {
    allowedComparisons: ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'between'],
    nullable: true,
  })
  updatedAt: Date;
}
