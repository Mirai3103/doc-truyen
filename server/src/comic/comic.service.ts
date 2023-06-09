/*
https://docs.nestjs.com/providers#services
*/

import { ChapterService } from '@/chapter/chapter.service';
import { slugfy } from '@/common/utils';
import { Role } from '@/user/schema/user.schema';
import { UserService } from '@/user/user.service';
import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import AdvanceSearchInput from './dto/advance-search.dto';
import CreateComicInput from './dto/create-comic-input.dto';
import { TrendingSortInput, TrendingSortType } from './dto/trendingSort.dto';
import { Comic, Status } from './schema/comic.schema';
@Injectable()
export class ComicService {
  constructor(
    @InjectModel(Comic.name) private readonly comicModal: Model<Comic>,
    private readonly userService: UserService,
    @Inject(forwardRef(() => ChapterService))
    private readonly chapterService: ChapterService,
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
  public async updateUpdatedAtAll() {
    const comics = await this.comicModal.find();
    comics.forEach(async (comic) => {
      if (comic) {
        await this.updateUpdatedAt(comic._id + '');
      }
    });
  }
  public async updateUpdatedAt(comicId: string) {
    const comic = await this.comicModal.findById(comicId);
    if (!comic) {
      return;
    }
    const lastChapter = await this.chapterService.getLastedChapterByComicId(
      comic._id,
    );
    if (lastChapter) {
      comic.updatedAt = lastChapter.createdAt;
      await comic.save({
        timestamps: false,
      });
    }
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
      .sort({ updatedAt: -1 })
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
    role: Role = Role.CREATOR,
  ) {
    const query =
      role === Role.CREATOR
        ? {
            createdBy: {
              _id: userId,
            },
          }
        : {};
    const result = await this.comicModal
      .find(query)
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
  async deleteComic(id: string | ObjectId, userId: string | ObjectId) {
    const comic = await this.comicModal.findById(id);
    if (!comic) {
      throw new NotFoundException('Comic not found');
    }
    if (comic.createdBy._id.toString() !== userId.toString()) {
      throw new ForbiddenException('You are not allowed to delete this comic');
    }

    await this.comicModal.remove({
      _id: id,
      createdBy: {
        _id: userId,
      },
    });
    await this.chapterService.deleteChapterOfComic(id);
  }
  public async advanceSearch(
    advanceSearchInput: AdvanceSearchInput,
  ): Promise<Comic[]> {
    const {
      authorId,
      categoryId,
      genreIds,
      limit,
      page,
      sortType,
      sortField,
      artistId,
      creatorId,
      keyword,
    } = advanceSearchInput;
    const query: any = {};
    if (authorId) {
      query.author = {
        _id: authorId,
      };
    }
    if (categoryId) {
      query.category = {
        _id: categoryId,
      };
    }
    if (genreIds) {
      query.genres = {
        $all: genreIds.map((id) => {
          return {
            _id: id,
          };
        }),
      };
    }
    if (artistId) {
      query.artist = {
        _id: artistId,
      };
    }
    if (creatorId) {
      query.createdBy = {
        _id: creatorId,
      };
    }
    if (keyword) {
      query.$or = [
        {
          name: {
            $regex: keyword,
            $options: 'i',
          },
        },
        {
          otherNames: {
            $regex: keyword,
            $options: 'i',
          },
        },
      ];
    }

    const skip = (page - 1) * limit;
    const sort: any = {};
    sort[sortField] = sortType;
    return await this.comicModal.find(query).sort(sort).skip(skip).limit(limit);
  }
}
