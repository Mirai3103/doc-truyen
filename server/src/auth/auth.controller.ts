/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Controller,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Express } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Express.Request) {
    return this.authService.login(req.user as any);
  }
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
  @Post('logout')
  logout(@Request() req: any) {
    const { refreshToken } = req.body;
    return this.authService.logout(refreshToken);
  }
  @Post('getNewAccessToken')
  getNewAccessToken(@Request() req: any) {
    const { refreshToken } = req.body;
    return this.authService.refreshToken(refreshToken);
  }
}
