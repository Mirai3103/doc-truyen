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
  @Field(() => String, { nullable: true })
  @IsBase64()
  @ValidateIf((o) => o.imageUrl !== undefined)
  imageBase64: string;
  @IsString()
  @Field(() => String, { nullable: true })
  @IsUrl()
  @ValidateIf((o) => o.officialUrl !== undefined)
  officialUrl: string;
  @Field(() => String, { nullable: true })
  @IsString()
  @ValidateIf((o) => o.slug !== undefined)
  createdBy: string;
}
