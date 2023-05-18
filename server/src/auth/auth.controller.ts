/*
https://docs.nestjs.com/controllers#controllers
*/

import { CreateUserDto } from '@/user/dto/createUser.dto';
import { User } from '@/user/schema/user.schema';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: Express.Request & { user: User }) {
    return this.authService.login(req.user);
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
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    console.log('googleAuth');
  }
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const tokenObj = await this.authService.googleLogin(req); // this will return a JWT token
    // redirect to frontend
    return res.redirect(
      `${process.env.CLIENT_URL}/login/callback?accesstoken=${tokenObj.accessToken}&refreshtoken=${tokenObj.refreshToken}`,
    );
  }
}
