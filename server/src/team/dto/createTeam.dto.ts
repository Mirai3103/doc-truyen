import {
  IsBase64,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTeamDto {
  @IsString()
  @Field(() => String)
  @MinLength(3)
  name: string;
  @IsString()
  @Field(() => String)
  @ValidateIf((o) => o.description !== undefined)
  description: string;
  @IsString()
  @Field(() => String)
  @IsBase64()
  @ValidateIf((o) => o.imageUrl !== undefined)
  imageBase64: string;
  @IsString()
  @Field(() => String)
  @IsUrl()
  @ValidateIf((o) => o.officialUrl !== undefined)
  officialUrl: string;
}
