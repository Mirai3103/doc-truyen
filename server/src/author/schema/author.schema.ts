import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@/base/schema/base.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Author extends BaseSchema {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  slug: string;

  @Prop()
  @Field()
  description: string;
}

export type AuthorDocument = Author & Document;
export const AuthorSchema = SchemaFactory.createForClass(Author);
