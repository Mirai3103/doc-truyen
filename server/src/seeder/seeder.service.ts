import { Chapter, ChapterDocument } from '@/chapter/schema/chapter.schema';
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
  ) {}
  async seedViewChapter() {
    const chapters = await this.chapterModel
      .find({})
      .select('_id createdAt')
      .lean();
    for await (const chapter of chapters) {
      const diffDay = this.getDiffDay(chapter.createdAt, new Date());

      if (diffDay <= 1) {
        const randomIncrease = Math.floor(Math.random() * 60);

        for (let i = 0; i < randomIncrease; i++) {
          await this.viewService.increaseView(chapter._id + '');
        }
      } else if (diffDay < 7) {
        const randomIncrease = Math.floor(Math.random() * 40);

        for (let i = 0; i < randomIncrease; i++) {
          await this.viewService.increaseView(chapter._id + '');
        }
      } else {
        const randomIncrease = Math.floor(Math.random() * 10);

        for (let i = 0; i < randomIncrease; i++) {
          await this.viewService.increaseView(chapter._id + '');
        }
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
    for await (const view of views) {
      const chapter = await this.chapterModel.findById(view.chapter._id);
      if (chapter) {
        chapter.todayViewCount = view.count;
        await chapter.save();
      }
    }
  }
  async updateWeekView() {
    const views = await this.viewService.createDayViewReport();
    for await (const view of views) {
      const chapter = await this.chapterModel.findById(view.chapter._id);
      if (chapter) {
        chapter.weekViewCount = view.count;
        await chapter.save();
      }
    }
  }
  async updateMonthView() {
    const views = await this.viewService.createDayViewReport();
    for await (const view of views) {
      const chapter = await this.chapterModel.findById(view.chapter._id);
      if (chapter) {
        chapter.monthViewCount = view.count;
        await chapter.save();
      }
    }
  }

  async updateYearView() {
    const views = await this.viewService.createDayViewReport();
    for await (const view of views) {
      const chapter = await this.chapterModel.findById(view.chapter._id);
      if (chapter) {
        chapter.yearViewCount = view.count;
        await chapter.save();
      }
    }
  }
}
