import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@/base/schema/base.schema';
import { Comic } from '@/comic/schema/comic.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Chapter extends BaseSchema {
  @Prop()
  @Field()
  order: number;
  @Prop()
  @Field()
  name: string;
  @Prop()
  @Field()
  chapterNumber: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comic' })
  @Field()
  comic: Comic;
  @Prop({ type: [{ url: String, order: Number }] })
  @Field(() => [Page])
  pages: Page[];
}

@ObjectType()
class Page {
  @Field(() => String)
  url: string;

  @Field(() => Number)
  order: number;
}
export type ChapterDocument = Chapter & Document;
export const ChapterSchema = SchemaFactory.createForClass(Chapter);
