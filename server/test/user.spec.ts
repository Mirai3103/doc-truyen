import { TeamService } from '../src/team/team.service';
import { UserService } from '@/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '@/user/schema/user.schema';
import { Team } from '@/team/schema/team.schema';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { UtilService } from '@/common/util.service';
import assert from 'assert';
describe('Test crud user', () => {
  let userService: UserService;
  let userModal: Model<User>;
  let module: TestingModule;
  let utilService: UtilService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    userModal = module.get(getModelToken(User.name));
    userService = module.get(UserService);
    utilService = module.get(UtilService);
    await userModal.deleteMany({});
  });

  afterAll(async () => {
    await userModal.deleteMany({});
    await module.close();
  });

  describe('test teamservice', () => {
    it('count should error', async () => {
      expect(
        await userService.create({
          email: 'huuhoag1412@gmail.com',
          rawPassword: '123456',
          username: 'huuhoang',
        }),
      ).toBeTruthy();
      await expect(
        userService.create({
          email: 'huuhoag1412@gmail.com',
          rawPassword: '123456',
          username: 'hu2222uhoang',
        }),
      ).rejects.toThrowError();
      await expect(
        userService.create({
          email: 'huuhoag141ssss2@gmail.com',
          rawPassword: '123456',
          username: 'huuhoang',
        }),
      ).rejects.toThrowError();
    });
  });
});
