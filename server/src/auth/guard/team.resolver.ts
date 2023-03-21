import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  Context,
} from '@nestjs/graphql';
import { TeamService } from '../../team/team.service';
import { Team } from '../../team/schema/team.schema';
import { CreateTeamDto } from '../../team/dto/createTeam.dto';
import { UpdateTeamDto } from '../../team/dto/updateTeam.dto';
import { GrapqlJwtAuthGuard } from '@/auth/guard/grapql-jwt.auth.guard';
import { CurrentUser } from '@/common/decorator/graphql-user.decorator';
import { UserPayload } from '@/auth/interface/user-payload.jwt';

@Resolver(() => Team)
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}
  @Query(() => Team)
  async team(@Args('id') id: string) {
    const team = await this.teamService.findOne(id);
    if (!team) {
      throw new NotFoundException(id);
    }
    return team;
  }
  @Query(() => [Team])
  async teams() {
    return await this.teamService.findAll();
  }
  @UseGuards(GrapqlJwtAuthGuard)
  @Mutation(() => Team)
  async createTeam(
    @Args('createTeamInput') createTeamDto: CreateTeamDto,
    @CurrentUser() user: UserPayload,
  ) {
    console.log('user', user);
    createTeamDto.createdBy = user._id;
    return await this.teamService.create(createTeamDto);
  }
  @UseGuards(GrapqlJwtAuthGuard)
  @Mutation(() => Team)
  async updateTeam(
    @Args('id') id: string,
    @Args('updateTeamInput') updateTeamDto: UpdateTeamDto,
    @CurrentUser() user: UserPayload,
  ) {
    const team = await this.teamService.update(id, updateTeamDto, user._id);
    if (!team) {
      throw new NotFoundException(id);
    }
    return team;
  }
  @Mutation(() => Boolean)
  @UseGuards(GrapqlJwtAuthGuard)
  async addUserToTeam(
    @Args('userId') userId: string,
    @Args('teamId') teamId: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.teamService.addUserToTeam(userId, teamId, user._id);
  }
}
