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
  public async markAsRead(userId: string, chapterId: string | ObjectId) {
    const user = await this.userModel
      .findOne({
        _id: userId,
      })
      .populate('readingHistories.chapter');
    const chapter = await this.chapterService.getChapterById(chapterId);
    if (!chapter) {
      return;
    }
    if (!user) {
      return;
    }
    if (!user.readingHistories) {
      user.readingHistories = [];
    }
    user.readingHistories = user.readingHistories.filter(
      (history) => history.chapter !== null,
    );
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
      await user.save();

      return;
    }

    user.readingHistories.push({
      createdAt: new Date(),
      chapter: chapter,
    });
    if (user.readingHistories.length > 200) {
      user.readingHistories.shift();
    }
    await user.save();
  }
  public async getReadingHistories(userId: string, limit = 200, page = 1) {
    const user = await this.userModel
      .findOne({
        _id: userId,
      })
      .populate('readingHistories.chapter')
      .lean();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const histories = user.readingHistories;
    histories
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      })
      .slice((page - 1) * limit, page * limit);
    return histories;
  }
  public async removeHistory(userId: string, chapterId: string | ObjectId) {
    const user = await this.userModel
      .findOne({
        _id: userId,
      })
      .populate('readingHistories.chapter');
    if (!user) {
      return false;
    }
    if (!user.readingHistories) {
      user.readingHistories = [];
    }
    user.readingHistories = user.readingHistories.filter(
      (history) => history.chapter._id.toString() !== chapterId.toString(),
    );
    await user.save();
    return true;
  }
  public async removeAllHistory(userId: string) {
    const user = await this.userModel
      .findOne({
        _id: userId,
      })
      .populate('readingHistories.chapter');
    if (!user) {
      return false;
    }
    user.readingHistories = [];
    await user.save();
    return true;
  }
}
