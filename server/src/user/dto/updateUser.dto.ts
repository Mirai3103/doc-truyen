import { Field, HideField, InputType } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, ValidateIf } from 'class-validator';
import { Role } from '../schema/user.schema';

@InputType()
export class UpdateUserDto {
  @IsString()
  @Field(() => String, { nullable: true })
  @IsEmail()
  @ValidateIf((o) => o.username !== undefined)
  email?: string;
  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(3)
  @ValidateIf((o) => o.username !== undefined)
  displayName?: string;
  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(3)
  @ValidateIf((o) => o.username !== undefined)
  base64Avatar?: string;
  @Field(() => String, { nullable: true })
  @IsString()
  @ValidateIf((o) => o.username !== undefined)
  description?: string;
  @HideField()
  role?: Role;
  @HideField()
  refreshTokens?: string[];
}
