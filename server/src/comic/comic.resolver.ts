import { GrapqlMayBeNeedIdentityGuard } from '@/auth/guard/grapql-jwt.auth.guard';
import { AuthorService } from '@/author/author.service';
import { Author } from '@/author/schema/author.schema';
import { ChapterService } from '@/chapter/chapter.service';
import { Chapter } from '@/chapter/schema/chapter.schema';
import { CurrentUser } from '@/common/decorator/graphql-user.decorator';
import { Tag } from '@/tag/schema/tag.schema';
import { TagService } from '@/tag/tag.service';
import { Team } from '@/team/schema/team.schema';
import { TeamService } from '@/team/team.service';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ComicService } from './comic.service';
import { TrendingSortInput } from './dto/trendingSort.dto';
import { Comic } from './schema/comic.schema';
@Resolver(() => Comic)
export class ComicResolver {
  constructor(
    @Inject(ComicService) private readonly commicService: ComicService,
    @Inject(AuthorService) private readonly authorService: AuthorService,
    @Inject(TeamService) private readonly teamService: TeamService,
    @Inject(TagService) private readonly tagService: TagService,
    @Inject(ChapterService) private readonly chapterService: ChapterService,
  ) {}
  @Query(() => Comic)
  async getComicById(@Args('id') id: string) {
    return await this.commicService.getById(id);
  }
  @Query(() => [Comic])
  async getAllComics() {
    return await this.commicService.getAll();
  }
  // define how to get Author populated
  @ResolveField(() => Author)
  async author(@Parent() comic: Comic) {
    const author = await this.authorService.findOne(comic.author._id + '');

    return author;
  }
  @ResolveField(() => Author)
  async artist(@Parent() comic: Comic) {
    if (!comic.artist) return null;
    const author = await this.authorService.findOne(comic.artist._id + '');
    return author;
  }
  @ResolveField(() => Team)
  async team(@Parent() comic: Comic) {
    if (!comic.team) return null;
    const team = await this.teamService.findOne(comic.team._id + '');
    return team;
  }
  @ResolveField(() => [Tag])
  async genres(@Parent() comic: Comic) {
    const tags = await this.tagService.getListsTag(
      comic.genres.map((tag) => tag._id),
    );
    return tags;
  }
  @ResolveField(() => [Tag])
  async category(@Parent() comic: Comic) {
    if (!comic.category) return null;
    const tags = await this.tagService.findOne(comic.category._id);
    return tags;
  }
  @Query(() => [Comic])
  async getRecentComics(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
  ) {
    return await this.commicService.getRecentComics(limit, page);
  }
  @ResolveField(() => Chapter)
  async recentChapter(@Parent() comic: Comic) {
    return await this.chapterService.getLastedChapterByComicId(comic._id);
  }
  @Query(() => [Comic])
  async getTopComics(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
  ) {
    return await this.commicService.getTopComics(limit, page);
  }
  @Query(() => Comic)
  @UseGuards(GrapqlMayBeNeedIdentityGuard)
  async getComicBySlug(@Args('slug') slug: string, @CurrentUser() user: any) {
    return await this.commicService.getComicBySlug(slug);
  }
  @Query(() => [Comic])
  async getTrendingComics(@Args('input') input: TrendingSortInput) {
    return await this.commicService.getTrendingComics(input);
  }
  @Query(() => [Comic])
  async getComicsByTeamId(@Args('teamId') teamId: string) {
    return await this.commicService.getComicsByTeamId(teamId);
  }
}
