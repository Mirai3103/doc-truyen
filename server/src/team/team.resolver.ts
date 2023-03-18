import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { TeamService } from './team.service';
import { Team } from './schema/team.schema';
import { CreateTeamDto } from './dto/createTeam.dto';
import { UpdateTeamDto } from './dto/updateTeam.dto';

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
  @Mutation(() => Team)
  async createTeam(@Args('createTeamInput') createTeamDto: CreateTeamDto) {
    return await this.teamService.create(createTeamDto);
  }
  @Mutation(() => Team)
  async updateTeam(
    @Args('id') id: string,
    @Args('updateTeamInput') updateTeamDto: UpdateTeamDto,
  ) {
    const team = await this.teamService.update(id, updateTeamDto);
    if (!team) {
      throw new NotFoundException(id);
    }
    return team;
  }
}
