import { BaseSchema } from '@/base/schema/base.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum TagType {
  Category = 'category',
  Genre = 'genre',
}
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
  @Field(() => String, { nullable: true })
  description: string;
  @Prop({ default: TagType.Genre })
  @Field()
  type: TagType;
}
export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);
