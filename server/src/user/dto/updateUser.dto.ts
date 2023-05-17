import { Field, HideField, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, ValidateIf } from 'class-validator';
import { Role } from '../schema/user.schema';

@InputType()
export class UpdateUserDto {
  @IsString()
  @Field(() => String, { nullable: true })
  @IsEmail()
  @ValidateIf((o) => o.email !== undefined)
  email?: string;
  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(3)
  @ValidateIf((o) => o.displayName !== undefined)
  displayName?: string;
  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(3)
  @ValidateIf((o) => o.base64Avatar !== undefined)
  base64Avatar?: string;
  @Field(() => String, { nullable: true })
  @IsString()
  @ValidateIf((o) => o.description !== undefined)
  description?: string;
  @Field(() => Int, { nullable: true })
  @ValidateIf((o) => o.role !== undefined)
  role?: Role;
  @HideField()
  refreshTokens?: string[];
  @Field(() => String, { nullable: true })
  @IsString()
  @MinLength(3)
  @ValidateIf((o) => o.username !== undefined)
  username?: string;
}
