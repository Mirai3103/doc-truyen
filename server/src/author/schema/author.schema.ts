import { BaseSchema } from '@/base/schema/base.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Author extends BaseSchema {
  @Prop()
  @Field()
  @FilterableField()
  name: string;

  @Field()
  totalComic: number;
  @Prop()
  @Field({ nullable: true })
  description?: string;
}

export type AuthorDocument = Author & Document;
export const AuthorSchema = SchemaFactory.createForClass(Author);
