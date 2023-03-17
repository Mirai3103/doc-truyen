import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// export const AuthorSchema = new Schema({
//   name: String,
//   slug: String,
//   description: String,
// });
// export const Author = mongoose.model('Author', AuthorSchema);
@Schema()
@ObjectType()
export class Author {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Field()
  name: string;

  @Prop()
  @Field()
  slug: string;

  @Prop()
  @Field()
  description: string;
}
export const AuthorSchema = SchemaFactory.createForClass(Author);
