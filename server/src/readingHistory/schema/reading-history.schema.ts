import { Chapter } from '@/chapter/schema/chapter.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
@ObjectType()
export class ReadingHistory {
  @Field(() => Date)
  @Prop()
  createdAt: Date = new Date();
  @Field(() => Chapter, { nullable: true })
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'Chapter',
  })
  chapter: Chapter;
}

export type IReadingHistory = {
  createdAt: Date;
  chapter: Chapter;
};

export const ReadingHistorySchema =
  SchemaFactory.createForClass(ReadingHistory);
