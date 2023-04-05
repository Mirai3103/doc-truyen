/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Chapter } from './schema/chapter.schema';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private readonly chapterModal: Model<Chapter>,
  ) {}
  public async getLastedChapterByComicId(comicId: string | ObjectId) {
    const chapter = await this.chapterModal
      .findOne({
        comic: {
          _id: comicId,
        },
      })
      .sort({ order: -1 })
      .exec();
    return chapter;
  }
  public async getChapterByComicId(comicId: string | ObjectId) {
    return await this.chapterModal
      .find({
        comic: {
          _id: comicId,
        },
      })
      .sort({ order: -1 })
      .exec();
  }
  public async getChapterById(chapterId: string | ObjectId) {
    return await this.chapterModal.findById(chapterId).exec();
  }
  public async getPreviousChapter(chapter: Chapter) {
    return await this.chapterModal
      .findOne({
        comic: {
          _id: chapter.comic._id,
        },
        order: {
          $lt: chapter.order,
        },
      })
      .sort({ order: -1 })
      .exec();
  }
  public async getNextChapter(chapter: Chapter) {
    return await this.chapterModal
      .findOne({
        comic: {
          _id: chapter.comic._id,
        },
        order: {
          $gt: chapter.order,
        },
      })
      .sort({ order: 1 })
      .exec();
  }
}
