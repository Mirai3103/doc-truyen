import { AppModule } from '@/app.module';
import { Comic } from '@/comic/schema/comic.schema';
import { User } from '@/user/schema/user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Model, Types } from 'mongoose';
describe('query comic test', () => {
  let module: TestingModule;
  let comicModal: Model<Comic>;
  beforeAll(async () => {
    mongoose.set('debug', function (coll, method, query, doc, options) {
      console.log({
        coll,
        method,
        query,
        doc,
        options,
      });
    });
    dotenv.config({
      path: 'E:\\personal projects\\doc-truyen\\.env',
    });
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    comicModal = await module.get(getModelToken(Comic.name));
  }, 100000);
  it('should be not null', async () => {
    const comics = await comicModal
      .find({
        author: {
          $in: ['646a09666ef4a9cee1122574'],
        },
      })
      .exec();

    console.log({
      comic: comics[0],
    });
    expect(comics).not.toBeNull();
  });
});
