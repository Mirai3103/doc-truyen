/*
https://docs.nestjs.com/providers#services
*/

import { UtilService } from '@/common/util.service';
import { User } from '@/user/schema/user.schema';
import { UserService } from '@/user/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(UtilService) private readonly utilService: UtilService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}
  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.userService.findByUniqueField(loginDto.username);
    if (!user) {
      return null;
    }
    const isPasswordValid = await this.utilService.compare(
      loginDto.password,
      user.hashPassword,
    );
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
  async login(user: User) {
    const payload = {
      username: user.username,
      sub: user._id,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
