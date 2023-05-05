/*
https://docs.nestjs.com/providers#services
*/

import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Schema } from 'mongoose';
import { Chapter } from './schema/chapter.schema';
import { ChapterOrder } from './dto/update-chapter-order';
import CreateChapterDto from './dto/create-chapter';
import { ComicService } from '@/comic/comic.service';

@Injectable()
export class ChapterService {
  constructor(
    @InjectModel(Chapter.name) private readonly chapterModal: Model<Chapter>,
    private readonly comicService: ComicService,
  ) {}
  create(input: CreateChapterDto) {
    const isOwner = this.comicService.isOwner(input.userId, input.comicId);
    if (!isOwner) {
      throw new ForbiddenException('You are not owner of this comic');
    }
    const order = Number(this.getLastedChapterByComicId(input.comicId)) + 1;
    const chapter = new this.chapterModal({
      chapterNumber: input.chapterNumber,
      comic: {
        _id: input.comicId,
      },
      createdAt: new Date(),
      order,
      pageCount: input.pages.length,
      pages: input.pages,
      name: input.name,
      updatedAt: new Date(),
    });
    return chapter.save();
  }
  countChapterByComicId(_id: Schema.Types.ObjectId) {
    return this.chapterModal.countDocuments({
      comic: {
        _id,
      },
    });
  }
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
  private async updateChapterOrder(
    chapterId: string | ObjectId,
    order: number,
  ) {
    const chapter = await this.chapterModal.findByIdAndUpdate(chapterId, {
      order,
    });
    return chapter;
  }
  public async changeChaptersOrder(chaptersOrderInput: ChapterOrder[]) {
    const promises = chaptersOrderInput.map((chapterOrderInput) =>
      this.updateChapterOrder(chapterOrderInput.id, chapterOrderInput.order),
    );
    return await Promise.all(promises);
  }
}
