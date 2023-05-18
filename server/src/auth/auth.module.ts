import { CommonModule } from '@/common/common.module';
import { CloudinaryModule } from '@/file/cloudinary/cloudinary.module';
import { UserModule } from '@/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GrapqlJwtAuthGuard } from './guard/grapql-jwt.auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { WithRoleGuard } from './guard/roles.guard';
import { GoogleStrategy } from './strategy/google.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    CommonModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'secret',
      signOptions: { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES || '30s' },
    }),
    CloudinaryModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    LocalAuthGuard,
    JwtStrategy,
    JwtAuthGuard,
    GrapqlJwtAuthGuard,
    GoogleStrategy,
    WithRoleGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
