/*
https://docs.nestjs.com/providers#services
*/

import { slugfy } from '@/common/utils';
import { UserService } from '@/user/user.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import CreateComicInput from './dto/create-comic-input.dto';
import { TrendingSortInput, TrendingSortType } from './dto/trendingSort.dto';
import { Comic, Status } from './schema/comic.schema';
@Injectable()
export class ComicService {
  constructor(
    @InjectModel(Comic.name) private readonly comicModal: Model<Comic>,
    private readonly userService: UserService,
  ) {}
  public async getAll() {
    return await this.comicModal.find();
  }
  public async getById(id: string | ObjectId) {
    return await this.comicModal.findById(id);
  }
  public async isOwner(userId: string, comicId: string) {
    const comic = await this.comicModal.findOne({
      _id: comicId,
      createdBy: {
        _id: userId,
      },
    });
    return !!comic;
  }

  public async getRecentComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by updateAt
    return await this.getPublishComicQuery()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
  }
  public async getTopComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by followCount
    return await this.getPublishComicQuery()
      .sort({ followCount: -1 })
      .skip(skip)
      .limit(limit);
  }
  public async getTopWeekComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by followCount
    return await this.getPublishComicQuery()
      .sort({ slug: -1 })
      .skip(skip)
      .limit(limit);
  }
  public async getTopMonthComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by followCount
    return await this.getPublishComicQuery()
      .sort({ followCount: -1 })
      .skip(skip)
      .limit(limit);
  }
  public async getTopYearComics(limit = 10, page = 1) {
    const skip = (page - 1) * limit;
    // order by followCount
    return await this.getPublishComicQuery()
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
    return await this.getPublishComicQuery()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }
  private getPublishComicQuery() {
    return this.comicModal.find({
      status: {
        $in: [Status.Completed, Status.Ongoing, Status.Drop, Status.Paused],
      },
    });
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

  public async getContributedComics(
    userId: string | ObjectId,
    limit = 20,
    page = 1,
  ) {
    const result = await this.comicModal
      .find({
        createdBy: {
          _id: userId,
        },
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return result;
  }
  public async createNewComic(input: CreateComicInput) {
    const comic = new this.comicModal({
      author: {
        _id: input.authorId,
      },
      category: {
        _id: input.categoryId,
      },
      name: input.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: {
        _id: input.userId,
      },
      description: input.description,
      followCount: 0,
      genres: input.genreIds.map((id) => {
        return {
          _id: id,
        };
      }),

      imageCoverUrl: input.imageCoverUrl,
      imageThumbUrl: input.imageThumbUrl,
      otherNames: input.otherNames,
      recentChapter: null,
      slug: slugfy(input.name),
      status: input.status || Status.NonPublished,
      officeUrl: input.officeUrl || null,
      artist: input.artistId
        ? {
            _id: input.artistId,
          }
        : null,
    });
    return await comic.save();
  }
  public async updateComic(
    id: string | ObjectId,
    input: CreateComicInput,
    userId: string | ObjectId,
  ) {
    const oldComic = await this.comicModal.findById(id);
    if (!oldComic) {
      throw new NotFoundException('Comic not found');
    }
    if (oldComic.createdBy._id.toString() !== userId.toString()) {
      throw new ForbiddenException('You are not allowed to update this comic');
    }
    const comic = await this.comicModal.findByIdAndUpdate(id, {
      author: {
        _id: input.authorId,
      },
      category: {
        _id: input.categoryId,
      },
      name: input.name,
      updatedAt: new Date(),
      description: input.description,
      genres: input.genreIds.map((id) => {
        return {
          _id: id,
        };
      }),
      imageCoverUrl: input.imageCoverUrl,
      imageThumbUrl: input.imageThumbUrl,
      otherNames: input.otherNames,
      slug: slugfy(input.name),
      status: input.status,
      officeUrl: input.officeUrl || null,
      artist: input.artistId
        ? {
            _id: input.artistId,
          }
        : null,
    });
    return comic;
  }
}
