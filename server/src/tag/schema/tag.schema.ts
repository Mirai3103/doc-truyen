import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@/base/schema/base.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Tag extends BaseSchema {
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
export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);