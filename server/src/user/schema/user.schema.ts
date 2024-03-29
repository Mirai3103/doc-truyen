import { BaseSchema } from '@/base/schema/base.schema';
import { Comic } from '@/comic/schema/comic.schema';
import {
  ReadingHistory,
  ReadingHistorySchema,
} from '@/readingHistory/schema/reading-history.schema';
import { Field, HideField, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum Role {
  ADMIN = 10,
  CREATOR = 5,
  USER = 1,
}
@Schema({
  timestamps: true,
})
@ObjectType()
export class User extends BaseSchema {
  @Prop({
    unique: true,
  })
  @Field()
  username: string;
  @Prop()
  @HideField()
  hashPassword: string;
  @Prop({
    unique: true,
  })
  @Field()
  email: string;
  @Prop()
  @Field()
  displayName: string;
  @Prop({ default: null })
  @Field({ nullable: true })
  avatarUrl?: string;
  @Prop()
  @Field({ nullable: true })
  description: string;
  @Prop({
    default: Role.USER,
    type: Number,
  })
  @Field(() => Int)
  role: Role;
  @HideField()
  @Prop({
    type: mongoose.Types.Array<string>,
    default: [],
  })
  refreshTokens: string[];
  @Field(() => [Comic])
  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: 'Comic' }],
  })
  followedComics: (Comic | string | mongoose.Types.ObjectId)[] = [];
  @Field(() => [ReadingHistory])
  @Prop({
    type: [ReadingHistorySchema],
  })
  readingHistories: ReadingHistory[] = [];
  @Field(() => Int)
  totalUploadedComic: number;
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  if (this.displayName && this.displayName.trim() === '') {
    this.displayName = this.username;
  }
  next();
});
