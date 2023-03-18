import { IsString, MinLength, ValidateIf } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateArtistDto {
  @IsString()
  @ValidateIf((o) => o.description !== undefined)
  @Field(() => String, { nullable: true })
  @MinLength(3)
  name: string;
  @IsString()
  @ValidateIf((o) => o.description !== undefined)
  @Field(() => String, { nullable: true })
  description: string;
}
