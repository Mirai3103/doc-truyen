import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @IsString()
  @Validate(
    (value: string) => {
      const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,16}$/;
      return USERNAME_REGEX.test(value);
    },
    {
      message: 'Tên đăng nhập không hợp lệ',
    },
  )
  @Field()
  username: string;
  @IsString()
  @MinLength(6)
  @Field()
  @MaxLength(32)
  rawPassword: string;
  @IsString()
  @Field()
  @IsEmail()
  email: string;
  @Field({ nullable: true })
  displayName?: string;
  @Field({ nullable: true })
  avatarUrl?: string;
}
