import { InputType } from '@nestjs/graphql';

@InputType()
export class LoginDto {
  username: string;
  password: string;
}
