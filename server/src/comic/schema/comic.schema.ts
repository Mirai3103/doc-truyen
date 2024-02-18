import { Author } from '@/author/schema/author.schema';
import { BaseSchema } from '@/base/schema/base.schema';
import { Chapter } from '@/chapter/schema/chapter.schema';
import { Tag } from '@/tag/schema/tag.schema';
import { User } from '@/user/schema/user.schema';

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export enum Status {
  Paused = 'Tạm dừng',
  Completed = 'Hoàn thành',
  Ongoing = 'Đang tiến hành',
  Drop = 'Drop',
  NonPublished = 'Chưa xuất bản',
}

@ObjectType()
export class ComicStatus {
  @Field(() => String)
  id: string;
  @Field()
  name: string;
  public static readonly allStatus = Object.keys(Status).map((key) => ({
    id: key,
    name: (Status as any)[key],
  }));
}

@Schema({
  timestamps: true,
})
@ObjectType()
export class Comic extends BaseSchema {
  @Prop()
  @Field()
  name: string;
  @Prop({ type: [{ type: String }] })
  @Field(() => [String])
  otherNames: string[];
  @Prop()
  @Field()
  slug: string;
  @Prop()
  @Field()
  description: string;
  @Prop()
  @Field()
  imageCoverUrl: string;
  @Prop()
  @Field()
  imageThumbUrl: string;
  @Field({ nullable: true })
  officeUrl?: string;
  @Prop({ default: Status.NonPublished })
  @Field()
  status: Status = Status.NonPublished;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tag' })
  @Field({ nullable: true })
  category: Tag = '64362ce5372c92c23ca0bcc8' as any;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  createdBy: User;

  @Prop({
    type: MongooseSchema.Types.Array,
  })
  @Field(() => [String])
  contributors: string[] = [];
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Author' })
  @Field()
  author: Author;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Author' })
  @Field({ nullable: true })
  artist?: Author;
  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Tag' }] })
  @Field(() => [Tag])
  genres: Tag[] = [];
  @Prop()
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  followCount: number;
  @Field(() => Chapter, { nullable: true })
  recentChapter: Chapter;
  @Field(() => Int)
  chapterCount = 0;
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

export type ComicDocument = Comic & Document;
export const ComicSchema = SchemaFactory.createForClass(Comic);
