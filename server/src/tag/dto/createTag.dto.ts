import { IsString, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { TagType } from '../schema/tag.schema';

@InputType()
export class CreateTagDto {
  @IsString()
  @Field(() => String)
  @MinLength(3)
  name: string;
  @IsString()
  @Field(() => String)
  description: string;
  @IsString()
  @Field(() => String)
  type: TagType = TagType.Genre;
}
