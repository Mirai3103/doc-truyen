import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { View, ViewDocument } from './schema/view.schema';
import { Chapter, ChapterDocument } from '@/chapter/schema/chapter.schema';

@Injectable()
export class ViewService {
  constructor(@InjectModel(View.name) private viewModel: Model<ViewDocument>) {}
  public async increaseView(chapterId: string, amount = 1) {
    const today = new Date();
    const view = await this.viewModel.findOne({
      chapter: {
        _id: chapterId,
      },
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
    });
    if (!view) {
      try {
        await this.viewModel.create({
          chapter: {
            _id: chapterId,
          },
          count: 1,
          date: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
          ),
        });
      } catch (error) {
        console.error(chapterId, today);
      }
    } else {
      view.count += amount;
      await view.save();
    }
  }
  public createDayViewReport() {
    const today = new Date();
    const todayView = this.viewModel
      .find({
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      })
      .exec();
    return todayView;
  }
  public async createViewReport(from: Date, to: Date) {
    const view = await this.viewModel
      .aggregate([
        {
          $match: {
            date: {
              $gte: from,
              $lte: to,
            },
          },
        },
        {
          $group: {
            _id: '$chapter',
            count: {
              $sum: '$count',
            },
          },
        },
      ])
      .exec();
    return view;
  }

  public async createWeekViewReport() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    return await this.createViewReport(sevenDaysAgo, today);
  }
  async createMonthViewReport() {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    return await this.createViewReport(thirtyDaysAgo, today);
  }
  async createYearViewReport() {
    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(today.getDate() - 365);
    return await this.createViewReport(oneYearAgo, today);
  }
}
