import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '@/base/schema/base.schema';

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
  description: string;
  @Prop()
  @Field()
  imageUrl: string;
  @Prop()
  @Field()
  officialUrl: string;
}
export type TeamDocument = Team & Document;
export const TeamSchema = SchemaFactory.createForClass(Team);
