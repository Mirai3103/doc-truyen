/*
https://docs.nestjs.com/providers#services
*/

import { ChapterService } from '@/chapter/chapter.service';
import { User } from '@/user/schema/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class ReadingHistoryService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly chapterService: ChapterService,
  ) {}
  // only save 200 lastest chapters
  public async markAsRead(userId: string, chapterId: string | ObjectId) {
    const user = await this.userModel
      .findOne({
        _id: userId,
      })
      .populate('readingHistories.chapter');
    const chapter = await this.chapterService.getChapterById(chapterId);
    if (!chapter) {
      throw new NotFoundException('Chapter not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const existed = user.readingHistories.find(
      (history) => history.chapter._id === chapter._id,
    );
    if (existed) {
      existed.createdAt = new Date();
      await user.save();
      return;
    }

    //same comic id
    const existedComic = user.readingHistories.find(
      (history) =>
        history.chapter.comic._id.toString() === chapter.comic._id.toString(),
    );
    if (existedComic) {
      user.readingHistories = user.readingHistories.filter(
        (history) =>
          history.chapter.comic._id.toString() !== chapter.comic._id.toString(),
      );
      user.readingHistories.push({
        createdAt: new Date(),
        chapter,
      });
      if (user.readingHistories.length > 200) {
        user.readingHistories.shift();
      }
      user.save();
      return;
    }

    user.readingHistories.push({
      createdAt: new Date(),
      chapter,
    });
    if (user.readingHistories.length > 200) {
      user.readingHistories.shift();
    }
    user.save();
  }
  public async getReadingHistories(
    userId: string,
    limit: number,
    page: number,
  ) {
    const user = await this.userModel
      .findOne({
        _id: userId,
      })
      .populate('readingHistories.chapter')
      .sort({
        'readingHistories.createdAt': -1,
      })
      .skip((page - 1) * limit)
      .limit(limit);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.readingHistories;
  }
}
