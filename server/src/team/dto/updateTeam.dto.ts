import {
  IsBase64,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTeamDto {
  @IsString()
  @ValidateIf((o) => o.description !== undefined)
  @Field(() => String, { nullable: true })
  @MinLength(3)
  name: string;
  @IsString()
  @ValidateIf((o) => o.description !== undefined)
  @Field(() => String, { nullable: true })
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
