import { BaseSchema } from '@/base/schema/base.schema';
import { Comic } from '@/comic/schema/comic.schema';
import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Chapter extends BaseSchema {
  @Prop()
  @Field()
  order: number;
  @Prop()
  @Field({ nullable: true })
  name?: string;
  @Prop()
  @Field()
  chapterNumber: string;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Comic' })
  @Field(() => Comic)
  comic: Comic;
  @Prop({ type: [{ url: String, order: Number }] })
  @Field(() => [Page])
  pages: Page[];
  @Field(() => Chapter, { nullable: true })
  nextChapter?: Chapter;
  @Field(() => Chapter, { nullable: true })
  previousChapter?: Chapter;
  @Field(() => Int)
  pageCount: number;
  // analytics
  @Prop({ default: 0 })
  @Field(() => Int)
  weekViewCount: number;
  @Prop({ default: 0 })
  @Field(() => Int)
  monthViewCount: number;
  @Prop({ default: 0 })
  @Field(() => Int)
  yearViewCount: number;
  @Prop({ default: 0 })
  @Field(() => Int)
  totalViewCount: number;
  @Prop({ default: 0 })
  @Field(() => Int)
  todayViewCount: number;
}

@ObjectType()
@InputType('PageInput')
export class Page {
  @Field(() => String)
  url: string;

  @Field(() => Number)
  order: number;
}
export type ChapterDocument = Chapter & Document;
export const ChapterSchema = SchemaFactory.createForClass(Chapter);
