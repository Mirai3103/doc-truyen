import { BaseSchema } from '@/base/schema/base.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
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
  @FilterableField()
  name: string;
  @Field()
  totalComic: number;
  @Prop()
  @Field(() => String, { nullable: true })
  description: string;
  @Prop({ default: TagType.Genre })
  @Field()
  @FilterableField()
  type: TagType;
}
export type TagDocument = Tag & Document;
export const TagSchema = SchemaFactory.createForClass(Tag);
