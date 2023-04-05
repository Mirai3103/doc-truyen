import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TeamDocument } from './schema/team.schema';
import { CreateTeamDto } from './dto/createTeam.dto';
import { UtilService } from '../common/util.service';
import { InjectModel } from '@nestjs/mongoose';
import { Team } from './schema/team.schema';
import { UpdateTeamDto } from './dto/updateTeam.dto';
import { User } from '@/user/schema/user.schema';
@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private teamModel: Model<TeamDocument>,
    @Inject(UtilService) private readonly utilService: UtilService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<TeamDocument> {
    const createdTeam = new this.teamModel({
      ...createTeamDto,
      imageUrl: createTeamDto.imageBase64
        ? await this.utilService.saveFile(createTeamDto.imageBase64)
        : undefined,
      userId: undefined,
      slug: this.utilService.slugfy(createTeamDto.name),
    });
    await createdTeam.save();
    await this.addUserToTeam(
      createdTeam.createdBy + '',
      createdTeam._id + '',
      createdTeam.createdBy + '',
    );

    return createdTeam;
  }

  async findAll(): Promise<TeamDocument[]> {
    return this.teamModel
      .find()
      .lean()
      .populate(['createdBy', 'members'])
      .exec();
  }
  async findOne(id: string): Promise<TeamDocument | null> {
    return this.teamModel
      .findOne({
        _id: id,
      })
      .exec();
  }
  async findBySlug(slug: string): Promise<TeamDocument | null> {
    return await this.teamModel
      .findOne({
        slug,
      })
      .exec();
  }
  async update(
    id: string,
    updateTeamDto: UpdateTeamDto,
    authId: string,
  ): Promise<Team | null> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return null;
    }
    if (team.createdBy!.toString() !== authId) {
      throw new ForbiddenException('You are not the owner of this team');
    }
    return this.teamModel.findByIdAndUpdate(id, {
      ...updateTeamDto,
      slug: updateTeamDto.name
        ? this.utilService.slugfy(updateTeamDto.name)
        : undefined,
    });
  }
  async addUserToTeam(
    userId: string,
    teamId: string,
    senderUserId: string,
  ): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    const team = await this.teamModel.findById(teamId);

    if (user !== null && team !== null) {
      if (senderUserId !== team.createdBy!._id.toString()) {
        return false;
      }
      if (team.members.map((member) => member._id + '').includes(userId)) {
        return false;
      }
      user.teams.push(team);
      team.members.push(user);
      await user.save();
      await team.save();
      return true;
    }
    return false;
  }
  async removeUserFromTeam(
    userId: string,
    teamId: string,
    senderUserId: string,
  ): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    const team = await this.teamModel.findById(teamId);

    if (userId === senderUserId) {
      return false;
    }
    if (user === null || team === null) {
      return false;
    }
    if (
      senderUserId !== team.createdBy!._id.toString() &&
      senderUserId !== userId
    ) {
      return false;
    }
    team.members = team.members.filter(
      (member) => member._id.toString() !== userId,
    );
    user.teams = user.teams.filter((team) => team._id.toString() !== teamId);
    await user.save();
    await team.save();
    return true;
  }
}
