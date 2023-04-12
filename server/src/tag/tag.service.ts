import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UtilService } from '../common/util.service';
import { CreateTagDto } from './dto/createTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import { Tag, TagDocument, TagType } from './schema/tag.schema';
@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag.name)
    private tagModel: Model<TagDocument>,
    @Inject(UtilService) private readonly utilService: UtilService,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<TagDocument> {
    const createdTag = new this.tagModel({
      ...createTagDto,
      slug: this.utilService.slugfy(createTagDto.name),
    });
    return createdTag.save();
  }

  async findAll(): Promise<TagDocument[]> {
    return this.tagModel.find().exec();
  }
  async findOne(id: string | ObjectId): Promise<TagDocument | null> {
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
