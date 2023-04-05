import { IsString, IsUrl, MinLength, ValidateIf } from 'class-validator';
import { InputType, Field, HideField } from '@nestjs/graphql';

@InputType()
export class CreateTeamDto {
  @IsString()
  @Field(() => String)
  @MinLength(3)
  name: string;
  @IsString()
  @Field(() => String, { nullable: true })
  @ValidateIf((o) => o.description !== undefined)
  description?: string;
  @IsString()
  @Field(() => String, { nullable: true })
  @ValidateIf((o) => o.imageBase64 !== undefined)
  imageBase64?: string;
  @IsString()
  @Field(() => String, { nullable: true })
  @IsUrl()
  @ValidateIf((o) => o.officialUrl !== undefined)
  officialUrl?: string;
  @HideField()
  createdBy: string;
}
