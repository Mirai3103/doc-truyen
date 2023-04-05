import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@/base/schema/base.schema';
import { User } from '@/user/schema/user.schema';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Team extends BaseSchema {
  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  slug: string;

  @Prop()
  @Field()
  description?: string;
  @Prop()
  @Field({ nullable: true })
  imageUrl?: string;
  @Prop()
  @Field()
  officialUrl?: string;
  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }],
  })
  @Field(() => [User])
  members: User[] = [];
  @Prop({
    type: MongooseSchema.Types.ObjectId,
  })
  @Field(() => User)
  createdBy?: User;
}
export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);
