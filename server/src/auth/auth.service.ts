/*
https://docs.nestjs.com/providers#services
*/

import { UtilService } from '@/common/util.service';
import { User, UserDocument } from '@/user/schema/user.schema';
import { UserService } from '@/user/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { LoginDto } from './dto/login.dto';
type ObjectId = mongoose.Types.ObjectId;
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
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES || '15d',
    });
    user.refreshTokens.push(refreshToken);
    this.userService.update(user._id as any, {
      refreshTokens: user.refreshTokens,
    });
    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken,
    };
  }
  async refreshToken(refreshToken: string) {
    const { sub } = this.jwtService.decode(refreshToken) as any;
    const user = await this.userService.findByUniqueField(sub);

    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user._id,
        role: user.role,
      }),
    };
  }
  async logout(refreshToken: string) {
    const payload: any = this.jwtService.decode(refreshToken);
    const userId = payload.sub;
    const user = await this.userService.findByUniqueField(userId);
    if (!user) {
      return;
    }

    user.refreshTokens = user.refreshTokens.filter(
      (token) => token !== refreshToken,
    );
    this.userService.update(userId as any, {
      refreshTokens: user.refreshTokens,
    });
  }
}
