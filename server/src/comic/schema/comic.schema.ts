import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@/base/schema/base.schema';
import { Tag } from '@/tag/schema/tag.schema';
import { Team } from '@/team/schema/team.schema';
import { Author } from '@/author/schema/author.schema';
import { Artist } from '@/artist/schema/artist.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Comic extends BaseSchema {
  @Prop()
  @Field()
  name: string;
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
  @Field()
  category: Tag;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Team' })
  @Field()
  team: Team;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Author' })
  @Field()
  author: Author;
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Artist' })
  @Field()
  artist: Artist;
}
export enum Status {
  Paused = 'Tạm dừng',
  Completed = 'Hoàn thành',
  Ongoing = 'Đang tiến hành',
  Drop = 'Drop',
}
export type ComicDocument = Comic & Document;
export const ComicSchema = SchemaFactory.createForClass(Comic);
