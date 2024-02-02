"use client";
import { RegisterOptions } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import {
  Length,
  Min,
  IsEmail,
  IsString,
  Validate,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateUserDto {
  username: string;
  @IsString()
  @MinLength(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự",
  })
  @MaxLength(32, {
    message: "Mật khẩu không được quá 32 ký tự",
  })
  rawPassword: string;
  @IsString()
  @IsEmail({}, { message: "Email không hợp lệ" })
  email: string;

  @MaxLength(50, { message: "Tên hiển thị nhiều nhất 50 kí tự" })
  @MinLength(3, { message: "Tên hiển thị ít nhất 3 kí tự" })
  displayName: string;
}
export const resolver = classValidatorResolver(CreateUserDto);
