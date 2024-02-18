import { Comic, ComicDocument } from '@/comic/schema/comic.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UtilService } from '../common/util.service';
import { CreateTagDto } from './dto/createTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import { Tag, TagDocument, TagType } from './schema/tag.schema';
import DataLoader from 'dataloader';
import { ObjectId as ObjectIdClass } from 'mongodb';
@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
    @Inject(UtilService) private readonly utilService: UtilService,
    @InjectModel(Comic.name) private comicModel: Model<ComicDocument>,
  ) {}

  public tagDataLoader = new DataLoader<string, TagDocument>(async (ids) => {
    const tags = await this.tagModel.find({
      _id: {
        $in: ids.map((id) => new ObjectIdClass(id)),
      },
    });
    const tagMap: { [key: string]: TagDocument } = {};
    tags.forEach((tag) => {
      tagMap[tag._id + ''] = tag;
    });
    return ids.map((id) => tagMap[id]);
  });
  async create(createTagDto: CreateTagDto): Promise<TagDocument> {
    const createdTag = new this.tagModel({
      ...createTagDto,
    });
    return createdTag.save();
  }
  async countComicsByTagId(tagId: string | ObjectId) {
    return this.comicModel
      .countDocuments({
        $or: [
          {
            genres: {
              $in: [tagId],
            },
          },
          {
            category: {
              _id: tagId,
            },
          },
        ],
      })
      .exec();
  }
  async findAllByTagId(tagId: string | ObjectId, page = 1, limit = 25) {
    return this.comicModel
      .find({
        $or: [
          {
            genres: {
              $in: [tagId],
            },
          },
          {
            category: {
              _id: tagId,
            },
          },
        ],
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findAll(): Promise<TagDocument[]> {
    return this.tagModel.find().exec();
  }
  async findOne(id: string | ObjectId | null): Promise<TagDocument | null> {
    return this.tagModel
      .findOne({
        _id: id,
      })
      .exec();
  }
  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag | null> {
    return this.tagModel.findByIdAndUpdate(id, updateTagDto);
  }
  async getListsTag(listId: string[] | ObjectId[]) {
    return await this.tagModel.find({
      _id: {
        $in: listId,
      },
    });
  }
  async getCategories() {
    return await this.tagModel.find({
      type: TagType.Category,
    });
  }
  async getGenres() {
    return await this.tagModel.find({
      type: TagType.Genre,
    });
  }
}
