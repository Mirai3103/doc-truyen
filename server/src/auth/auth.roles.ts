import { Role } from '@/user/schema/user.schema';

import { RolesBuilder } from 'nest-access-control';

export const roles: RolesBuilder = new RolesBuilder();

// Admin can do anything

roles
  .grant(Role.USER.toString())
  .readAny('profile')
  .attributes([
    '*, !hashPassword, !refreshTokens, !readingHistory, !followedComics, !comment, !email',
  ])
  .readOwn('profile')
  .attributes('*')
  .updateOwn('profile')
  .updateOwn('refreshTokens')
  .deleteOwn('refreshTokens')
  .readOwn('readingHistory')
  .updateOwn('readingHistory')
  .deleteOwn('readingHistory')
  .readOwn('followedComics')
  .updateOwn('followedComics')
  .deleteOwn('followedComics')
  .createOwn('followedComics')
  .createOwn('comment')
  .updateOwn('comment')
  .readAny('comment')
  .deleteOwn('comment')
  .createOwn('file')
  .updateOwn('file')
  .deleteOwn('file');

roles
  .grant(Role.CREATOR.toString())
  .extend(Role.USER.toString())
  .createOwn('comic')
  .updateOwn('comic')
  .deleteOwn('comic')
  .createOwn('chapter')
  .updateOwn('chapter')
  .deleteOwn('chapter')
  .createAny('author')
  .updateOwn('author')
  .deleteOwn('author')
  .createAny('tag')
  .updateOwn('tag')
  .deleteOwn('tag');
