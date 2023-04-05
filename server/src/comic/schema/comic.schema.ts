import { Author } from '@/author/schema/author.schema';
import { BaseSchema } from '@/base/schema/base.schema';
import { Chapter } from '@/chapter/schema/chapter.schema';
import { Tag } from '@/tag/schema/tag.schema';
import { Team } from '@/team/schema/team.schema';
import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

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
  @Prop()
  @Field()
  officeUrl?: string;
  @Prop()
  @Field()
  status: Status;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Tag' })
  @Field({ nullable: true })
  category: Tag;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Team' })
  @Field()
  team: Team;
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
  @Field()
  followCount: number;
  @Field(() => Chapter)
  recentChapter: Chapter;
}
export enum Status {
  Paused = 'Tạm dừng',
  Completed = 'Hoàn thành',
  Ongoing = 'Đang tiến hành',
  Drop = 'Drop',
}
export type ComicDocument = Comic & Document;
export const ComicSchema = SchemaFactory.createForClass(Comic);
