import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ArtistDocument } from './schema/artist.schema';
import { CreateArtistDto } from './dto/createArtist.dto';
import { UtilService } from '../common/util.service';
import { InjectModel } from '@nestjs/mongoose';
import { Artist } from './schema/artist.schema';
import { UpdateArtistDto } from './dto/updateArtist.dto';
@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist.name)
    private artistModel: Model<ArtistDocument>,
    @Inject(UtilService) private readonly utilService: UtilService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistDocument> {
    const createdArtist = new this.artistModel({
      ...createArtistDto,
      slug: this.utilService.slugfy(createArtistDto.name),
    });
    return createdArtist.save();
  }

  async findAll(): Promise<ArtistDocument[]> {
    return this.artistModel.find().exec();
  }
  async findOne(id: string): Promise<ArtistDocument | null> {
    return this.artistModel
      .findOne({
        _id: id,
      })
      .exec();
  }
  async update(
    id: string,
    updateArtistDto: UpdateArtistDto,
  ): Promise<Artist | null> {
    return this.artistModel.findByIdAndUpdate(id, updateArtistDto);
  }
}
