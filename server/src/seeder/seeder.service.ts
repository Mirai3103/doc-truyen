import { Chapter, ChapterDocument } from '@/chapter/schema/chapter.schema';
import { Comic, ComicDocument } from '@/comic/schema/comic.schema';
import { View } from '@/view/schema/view.schema';
import { ViewService } from '@/view/view.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SeederService {
  constructor(
    @InjectModel(Chapter.name)
    private readonly chapterModel: Model<ChapterDocument>,
    private readonly viewService: ViewService,
    @InjectModel(Comic.name) private readonly comicModel: Model<ComicDocument>,
  ) {}
  async seedViewChapter() {
    const chapters = await this.chapterModel
      .find({})
      .select('_id createdAt')
      .lean();
    for await (const chapter of chapters) {
      const diffDay = this.getDiffDay(chapter.createdAt, new Date());

      if (diffDay <= 1) {
        const randomIncrease = Math.floor(Math.random() * 600);

        await this.viewService.increaseView(chapter._id + '', randomIncrease);
      } else if (diffDay < 7) {
        const randomIncrease = Math.floor(Math.random() * 400);
        await this.viewService.increaseView(chapter._id + '', randomIncrease);
      } else {
        const randomIncrease = Math.floor(Math.random() * 100);
        await this.viewService.increaseView(chapter._id + '', randomIncrease);
      }
    }
  }

  private getDiffDay(from: Date, to: Date) {
    from = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const diffTime = Math.abs(to.getTime() - from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  async updateDateView() {
    const views = await this.viewService.createDayViewReport();
    for (const view of views) {
      await this.chapterModel.updateOne(
        { _id: view.chapter._id },
        { $set: { dateViewCount: view.count } },
      );
    }
  }
  async updateWeekView() {
    const views = await this.viewService.createDayViewReport();
    for (const view of views) {
      await this.chapterModel.updateOne(
        { _id: view.chapter._id },
        { $set: { weekViewCount: view.count } },
      );
    }
  }
  async updateMonthView() {
    const views = await this.viewService.createDayViewReport();
    for (const view of views) {
      await this.chapterModel.updateOne(
        { _id: view.chapter._id },
        { $set: { monthViewCount: view.count } },
      );
    }
  }

  async updateYearView() {
    const views = await this.viewService.createDayViewReport();
    for await (const view of views) {
      await this.chapterModel.updateOne(
        { _id: view.chapter._id },
        { $set: { yearViewCount: view.count } },
      );
    }
  }
}
