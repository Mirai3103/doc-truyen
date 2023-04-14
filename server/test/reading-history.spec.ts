import { AppModule } from '@/app.module';
import { User } from '@/user/schema/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import dotenv from 'dotenv';

import { Model } from 'mongoose';
describe('reading history test', () => {
  let module: TestingModule;
  let userModal: Model<User>;
  beforeAll(async () => {
    dotenv.config({
      path: 'E:\\personal projects\\doc-truyen\\dev.env',
    });
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    //get connection string from module

    userModal = await module.get(getModelToken(User.name));
  }, 100000);
  it('should be not null', async () => {
    //user id: 642fd6190978e275801c9dc1
    // chapter id: 642a7b3667bfa5828ba6bc20
    const oldChapter = (
      await userModal
        .findOne({
          _id: '642fd6190978e275801c9dc1',
        })
        .exec()
    )?.readingHistories.find(
      (history) =>
        history.chapter._id.toString() === '642a7b3667bfa5828ba6bc20',
    );
    const update = await userModal.findOneAndUpdate(
      {
        _id: '642fd6190978e275801c9dc1',
      },
      {
        $set: {
          'readingHistories.$[element].createdAt': new Date(),
        },
      },
    );
    const newChapter = (
      await userModal
        .findOne({
          _id: '642fd6190978e275801c9dc1',
        })
        .exec()
    )?.readingHistories.find(
      (history) =>
        history.chapter._id.toString() === '642a7b3667bfa5828ba6bc20',
    );

    expect(oldChapter?.createdAt).not.toEqual(newChapter?.createdAt);
  });
  it('should be ok', async () => {
    // 642a7b3667bfa5828ba6bc20
    const user = await userModal.findOne({
      _id: '642fd6190978e275801c9dc1',
    });

    user!.readingHistories.find(
      (history) =>
        history.chapter._id.toString() === '642a7b3667bfa5828ba6bc20',
    )!.createdAt = new Date();
    await user!.save();
  });
});
