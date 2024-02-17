import { WithRoleGuardGQL } from '@/auth/guard/grapql-jwt.auth.guard';
import { Role } from '@/user/schema/user.schema';
import { NotFoundException, UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CreateTagDto } from './dto/createTag.dto';
import { UpdateTagDto } from './dto/updateTag.dto';
import { Tag } from './schema/tag.schema';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}
  @Query(() => Tag)
  async tag(@Args('id') id: string) {
    const tag = await this.tagService.findOne(id);
    if (!tag) {
      throw new NotFoundException(id);
    }
    return tag;
  }
  @Query(() => [Tag])
  async tags() {
    return await this.tagService.findAll();
  }
  @Mutation(() => Tag)
  @UseGuards(new WithRoleGuardGQL(Role.CREATOR))
  async createTag(@Args('createTagInput') createTagDto: CreateTagDto) {
    return await this.tagService.create(createTagDto);
  }
  @Mutation(() => Tag)
  @UseGuards(new WithRoleGuardGQL(Role.CREATOR))
  async updateTag(
    @Args('id') id: string,
    @Args('updateTagInput') updateTagDto: UpdateTagDto,
  ) {
    const tag = await this.tagService.update(id, updateTagDto);
    if (!tag) {
      throw new NotFoundException(id);
    }
    return tag;
  }
  @Query(() => [Tag])
  async getCategories() {
    return await this.tagService.getCategories();
  }
  @Query(() => [Tag])
  async getGenres() {
    return await this.tagService.getGenres();
  }
}
