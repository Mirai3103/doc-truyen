import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TeamDocument } from './schema/team.schema';
import { CreateTeamDto } from './dto/createTeam.dto';
import { UtilService } from '../common/util.service';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schema/team.schema';
import { UpdateTeamDto } from './dto/updateTeam.dto';
@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private teamModel: Model<TeamDocument>,
    @Inject(UtilService) private readonly utilService: UtilService,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<TeamDocument> {
    const createdTeam = new this.teamModel({
      ...createTeamDto,
      imageUrl: createTeamDto.imageBase64
        ? await this.utilService.saveFile(createTeamDto.imageBase64)
        : undefined,
      slug: this.utilService.slugfy(createTeamDto.name),
    });
    return createdTeam.save();
  }

  async findAll(): Promise<TeamDocument[]> {
    return this.teamModel.find().exec();
  }
  async findOne(id: string): Promise<TeamDocument | null> {
    return this.teamModel
      .findOne({
        _id: id,
      })
      .exec();
  }
  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team | null> {
    return this.teamModel.findByIdAndUpdate(id, {
      ...updateTeamDto,
      slug: updateTeamDto.name
        ? this.utilService.slugfy(updateTeamDto.name)
        : undefined,
    });
  }
}
