/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UtilService } from '../common/util.service';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { QueryAuthorsDTO } from './dto/queryAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { Author, AuthorDocument } from './schema/author.schema';
@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private authorModel: Model<AuthorDocument>,
    @Inject(UtilService) private readonly utilService: UtilService,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthorDocument> {
    const createdAuthor = new this.authorModel({
      ...createAuthorDto,
      slug: this.utilService.slugfy(createAuthorDto.name),
    });
    return createdAuthor.save();
  }

  async findAll(): Promise<AuthorDocument[]> {
    return this.authorModel.find().exec();
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
