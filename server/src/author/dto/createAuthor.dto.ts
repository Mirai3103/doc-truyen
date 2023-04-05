import { IsString, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthorDto {
  @IsString()
  @Field(() => String)
  @MinLength(3)
  name: string;
  @IsString()
  @Field(() => String)
  description: string;
}
