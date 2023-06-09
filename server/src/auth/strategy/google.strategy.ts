import { PassportStrategy } from '@nestjs/passport';
import { config } from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.SERVER_URL! + 'auth/google/callback',
      scope: ['email', 'profile'],
      accessType: 'offline',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const user = {
      email: profile.emails[0].value,
      displayName: profile.displayName,
      username: profile.emails[0].value,
      picture: profile.photos[0].value,
      accessToken,
      refreshToken,
    };

    done(null, user);
  }
}
