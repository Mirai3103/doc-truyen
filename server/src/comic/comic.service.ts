/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { TrendingSortInput, TrendingSortType } from './dto/trendingSort.dto';
import { Comic } from './schema/comic.schema';
@Injectable()
export class ComicService {
  constructor(
    @InjectModel(Comic.name) private readonly comicModal: Model<Comic>,
  ) {}
  public async getAll() {
    return await this.comicModal.find();
  }
  public async getById(id: string | ObjectId) {
    return await this.comicModal.findById(id);
  }
  public async getRecentComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by updateAt
    return await this.comicModal
      .find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
  }
  public async getTopComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by followCount
    return await this.comicModal
      .find()
      .sort({ followCount: -1 })
      .skip(skip)
      .limit(limit);
  }
  public async getTopWeekComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by followCount
    return await this.comicModal
      .find()
      .sort({ slug: -1 })
      .skip(skip)
      .limit(limit);
  }
  public async getTopMonthComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by followCount
    return await this.comicModal
      .find()
      .sort({ followCount: -1 })
      .skip(skip)
      .limit(limit);
  }
  public async getTopYearComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by followCount
    return await this.comicModal
      .find()
      .sort({ slug: 1 })
      .skip(skip)
      .limit(limit);
  }

  public async getComicBySlug(slug: string) {
    return await this.comicModal.findOne({ slug });
  }
  public async getComicSortNewest(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by createdAt
    return await this.comicModal
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }
  public async getTrendingComics({ limit, page, type }: TrendingSortInput) {
    switch (type) {
      case TrendingSortType.FOLLOW_COUNT:
        return await this.getTopComics(limit, page);
      case TrendingSortType.TOP_WEEK:
        return await this.getTopWeekComics(limit, page);
      case TrendingSortType.TOP_MONTH:
        return await this.getTopMonthComics(limit, page);
      case TrendingSortType.TOP_YEAR:
        return await this.getTopYearComics(limit, page);
      case TrendingSortType.NEWEST:
        return await this.getComicSortNewest(limit, page);
      default:
        return [];
    }
  }
}
