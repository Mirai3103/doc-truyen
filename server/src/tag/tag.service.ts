import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TagDocument } from './schema/tag.schema';
import { CreateTagDto } from './dto/createTag.dto';
import { UtilService } from '../common/util.service';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schema/tag.schema';
import { UpdateTeamDto } from '@/team/dto/updateTeam.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
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
  async findOne(id: string): Promise<TagDocument | null> {
    return this.tagModel
      .findOne({
        _id: id,
      })
      .exec();
  }
  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag | null> {
    return this.tagModel.findByIdAndUpdate(id, updateTagDto);
  }
}
