import { CommonModule } from '@/common/common.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constant';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { LocalAuthGuard } from './local-auth.guard';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    UserModule,
    CommonModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'secret',
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES || '30s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
