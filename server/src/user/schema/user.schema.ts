import { ObjectType, Field, HideField } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@/base/schema/base.schema';
import mongoose from 'mongoose';
import { Team } from '@/team/schema/team.schema';
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
  @Prop()
  @Field()
  avatarUrl: string;
  @Prop()
  @Field()
  description: string;
  @Prop({
    default: Role.USER,
    type: Number,
  })
  @Field()
  role: Role;
  @HideField()
  @Prop({
    type: mongoose.Types.Array<string>,
    default: [],
  })
  refreshTokens: string[];
  @Field(() => [Team])
  @Prop({
    type: [{ type: mongoose.Types.ObjectId, ref: 'Team' }],
  })
  teams: Team[] = [];
}
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  if (this.displayName && this.displayName.trim() === '') {
    this.displayName = this.username;
  }
  next();
});
