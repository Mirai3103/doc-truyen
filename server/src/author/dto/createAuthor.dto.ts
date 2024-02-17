import { IsString, MinLength } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { BeforeCreateMany } from '@ptc-org/nestjs-query-graphql';

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
