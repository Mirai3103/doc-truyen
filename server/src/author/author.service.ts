/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Author } from './interface/author.interface';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UtilService } from '../common/util.service';
import { InjectModel } from '@nestjs/mongoose';
import { Author as AuthorModel } from './schema/author.schema';
@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(AuthorModel.name)
    private authorModel: Model<Author>,
    @Inject(UtilService) private readonly utilService: UtilService,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const createdAuthor = new this.authorModel({
      ...createAuthorDto,
      slug: this.utilService.slugfy(createAuthorDto.name),
    });
    return createdAuthor.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().exec();
  }
  async findOne(id: string): Promise<Author | null> {
    return this.authorModel
      .findOne({
        _id: id,
      })
      .exec();
  }
  async update(
    id: string,
    updateAuthorDto: CreateAuthorDto,
  ): Promise<Author | null> {
    return this.authorModel.findByIdAndUpdate(id, updateAuthorDto);
  }
}
