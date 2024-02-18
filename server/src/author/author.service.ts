/*
https://docs.nestjs.com/providers#services
*/

import { Comic } from '@/comic/schema/comic.schema';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { UtilService } from '../common/util.service';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { QueryAuthorsDTO } from './dto/queryAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { Author, AuthorDocument } from './schema/author.schema';
import DataLoader from 'dataloader';
@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private authorModel: Model<AuthorDocument>,
    @Inject(UtilService) private readonly utilService: UtilService,
    @InjectModel(Comic.name) private comicModel: Model<Comic>,
  ) {}

  public authorLoader = new DataLoader<string, AuthorDocument>(async (ids) => {
    const authors = await this.authorModel.find({
      _id: {
        $in: ids.map((id) => new Types.ObjectId(id)),
      },
    });

    const authorMap: { [key: string]: AuthorDocument } = {};
    authors.forEach((author) => {
      authorMap[author._id + ''] = author;
    });
    return ids.map((id) => authorMap[id]);
  });

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorDocument> {
    const createdAuthor = new this.authorModel({
      ...createAuthorDto,
      slug: this.utilService.slugfy(createAuthorDto.name),
    });
    return createdAuthor.save();
  }
  public findAllByAuthorId(authorId: string | ObjectId, page = 1, limit = 25) {
    return this.comicModel
      .find({
        author: {
          _id: authorId,
        },
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }
  public async countComicsByAuthorId(authorId: string | ObjectId) {
    return this.comicModel
      .countDocuments({
        author: {
          _id: authorId,
        },
      })
      .exec();
  }

  async findAll(): Promise<AuthorDocument[]> {
    return this.authorModel.find().exec();
  }
  async delete(id: string) {
    this.authorModel.deleteOne({ _id: id }).exec();
  }

  async findOneBySlug(slug: string): Promise<AuthorDocument | null> {
    return this.authorModel
      .findOne({
        slug,
      })
      .exec();
  }

  async findOne(id: string): Promise<AuthorDocument | null> {
    return this.authorModel
      .findOne({
        _id: id,
      })
      .exec();
  }
  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author | null> {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorDto);
  }
  async createIfNotExist(authorName: string): Promise<AuthorDocument> {
    const nameSlug = this.utilService.slugfy(authorName);
    const author = await this.authorModel.findOne({
      slug: nameSlug,
    });
    if (author) {
      return author;
    }
    const createdAuthor = new this.authorModel({
      name: authorName,
      slug: nameSlug,
      description: null,
    });
    return await createdAuthor.save();
  }
  public async findAllPaginated(
    page = 1,
    limit = 25,
    keyword = '',
  ): Promise<QueryAuthorsDTO> {
    if (!keyword) {
      const count = await this.authorModel.countDocuments();
      const authors = await this.authorModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return {
        authors,
        count,
      };
    }

    const count = await this.authorModel.countDocuments({
      name: {
        $regex: keyword,
        $options: 'i',
      },
    });
    const authors = await this.authorModel
      .find({
        name: {
          $regex: keyword,
          $options: 'i',
        },
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    return {
      authors,
      count,
    };
  }
}
