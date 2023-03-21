import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  Context,
  ResolveField,
} from '@nestjs/graphql';
import { TeamService } from './team.service';
import { Team } from './schema/team.schema';
import { CreateTeamDto } from './dto/createTeam.dto';
import { UpdateTeamDto } from './dto/updateTeam.dto';
import { GrapqlJwtAuthGuard } from '@/auth/guard/grapql-jwt.auth.guard';
import { CurrentUser } from '@/common/decorator/graphql-user.decorator';
import { UserPayload } from '@/auth/interface/user-payload.jwt';
import { UserService } from '@/user/user.service';
import { User } from '@/user/schema/user.schema';

@Resolver(() => Team)
export class TeamResolver {
  constructor(
    private readonly teamService: TeamService,
    private readonly userService: UserService,
  ) {}
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
    const allTeams = await this.teamService.findAll();
    return allTeams;
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
