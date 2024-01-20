import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema, ObjectId } from 'mongoose';
@Schema({
  timestamps: false,
})
@ObjectType()
export class View {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  chapter: string | ObjectId;
  @Prop(() => Date)
  date: Date = new Date();
  @Prop({ default: 0 })
  count: number;
}
export type ViewDocument = View & Document;
export const ViewSchema = SchemaFactory.createForClass(View);
