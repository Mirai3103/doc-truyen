import {
  GrapqlMayBeNeedIdentityGuard,
  WithRoleGuardGQL,
} from '@/auth/guard/grapql-jwt.auth.guard';
import { AuthorService } from '@/author/author.service';
import { Author } from '@/author/schema/author.schema';
import { ChapterService } from '@/chapter/chapter.service';
import { Chapter } from '@/chapter/schema/chapter.schema';
import { CurrentUser } from '@/common/decorator/graphql-user.decorator';
import { Tag } from '@/tag/schema/tag.schema';
import { TagService } from '@/tag/tag.service';

import { UserPayload } from '@/auth/interface/user-payload.jwt';
import { Role, User } from '@/user/schema/user.schema';
import { UserService } from '@/user/user.service';
import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  ObjectType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Cache } from 'cache-manager';
import { ComicService } from './comic.service';
import AdvanceSearchInput, { ComicPage } from './dto/advance-search.dto';
import CreateComicInput from './dto/create-comic-input.dto';
import {
  SortOption,
  TrendingSortInput,
  TrendingSortType,
} from './dto/trendingSort.dto';
import { Comic, ComicStatus } from './schema/comic.schema';
@Resolver(() => Comic)
export class ComicResolver {
  constructor(
    @Inject(ComicService) private readonly commicService: ComicService,
    @Inject(AuthorService) private readonly authorService: AuthorService,
    @Inject(TagService) private readonly tagService: TagService,
    @Inject(ChapterService) private readonly chapterService: ChapterService,
    private readonly userService: UserService,
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
    if (comic.author.name) return comic.author;
    const author = await this.authorService.authorLoader.load(
      comic.author._id + '',
    );
    return author;
  }
  @ResolveField(() => Author)
  async artist(@Parent() comic: Comic) {
    if (comic.artist?.name) return comic.artist;
    if (!comic.artist) return null;
    const author = await this.authorService.authorLoader.load(
      comic.artist._id + '',
    );
    return author;
  }
  @ResolveField(() => User)
  async createdBy(@Parent() comic: Comic) {
    if (comic.createdBy.email) return comic.createdBy;
    const user = await this.userService.userDataloader.load(
      comic.createdBy._id + '',
    );
    return user;
  }
  @ResolveField(() => [Tag])
  async genres(@Parent() comic: Comic) {
    if (comic.genres && comic.genres[0].name) return comic.genres;
    const genrePromise: Promise<Tag>[] = [];
    for (const genre of comic.genres) {
      genrePromise.push(this.tagService.tagDataLoader.load(genre._id + ''));
    }
    const tags = await Promise.all(genrePromise);
    return tags;
  }
  @ResolveField(() => Tag)
  async category(@Parent() comic: Comic) {
    if (comic.category.name) return comic.category;
    if (!comic.category) return null;
    const tags = await this.tagService.tagDataLoader.load(
      comic.category._id + '',
    );
    return tags;
  }
  ///
  @ResolveField(() => Chapter)
  async recentChapter(@Parent() comic: Comic) {
    return await this.chapterService.lastestChapterByComicIdDataLoader.load(
      comic._id + '',
    );
  }
  @ResolveField(() => Number)
  async chapterCount(@Parent() comic: Comic) {
    return await this.chapterService.countChapterByComicIdDataLoader.load(
      comic._id + '',
    );
  }
  @Query(() => ComicPage)
  async getRecentComics(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
  ) {
    const data = await this.commicService.getRecentComics(limit, page);
    return data;
  }

  @Query(() => ComicPage)
  async getTopComics(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
  ) {
    const data = await this.commicService.getTopComics(limit, page);
    return data;
  }
  @Query(() => Comic)
  @UseGuards(GrapqlMayBeNeedIdentityGuard)
  async getComicBySlug(@Args('slug') slug: string, @CurrentUser() user: any) {
    return await this.commicService.getComicBySlug(slug);
  }
  @Query(() => [Comic])
  async getTrendingComics(@Args('input') input: TrendingSortInput) {
    const data = await this.commicService.getTrendingComics(input);
    return data;
  }
  @Query(() => [Comic])
  @UseGuards(new WithRoleGuardGQL(Role.CREATOR))
  async getContributedComics(
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
    @CurrentUser() user: UserPayload,
  ) {
    const userId = user._id;
    return await this.commicService.getContributedComics(
      userId,
      limit,
      page,
      user.role,
    );
  }
  @Query(() => [Comic])
  async getComicCreatedByUser(
    @Args('userId') userId: string,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
  ) {
    return await this.commicService.getContributedComics(userId, limit, page);
  }
  @Mutation(() => Comic)
  @UseGuards(new WithRoleGuardGQL(Role.CREATOR))
  async createComic(
    @Args('input') input: CreateComicInput,
    @CurrentUser() user: UserPayload,
  ) {
    input.userId = user._id;
    const result = await this.commicService.createNewComic(input);
    return result;
  }

  @Mutation(() => Comic)
  @UseGuards(new WithRoleGuardGQL(Role.CREATOR))
  async updateComic(
    @Args('id') id: string,
    @Args('input') input: CreateComicInput,
    @CurrentUser() user: UserPayload,
  ) {
    const result = await this.commicService.updateComic(id, input, user._id);
    return result;
  }
  @Mutation(() => Boolean)
  @UseGuards(new WithRoleGuardGQL(Role.CREATOR))
  async deleteComic(@Args('id') id: string, @CurrentUser() user: UserPayload) {
    await this.commicService.deleteComic(id, user._id);
    return true;
  }
  @Query(() => ComicPage)
  async advanceSearchComics(@Args('input') input: AdvanceSearchInput) {
    return await this.commicService.advanceSearch(input);
  }
  @Query(() => ComicPage)
  async getComicsByAuthorId(
    @Args('id') id: string,
    @Args('page', { defaultValue: 1, nullable: true }) page: number,
    @Args('limit', { defaultValue: 25, nullable: true }) limit: number,
  ) {
    return await this.commicService.advanceSearch({
      authorIds: [id],
      limit,
      page,
      sortField: TrendingSortType.NEWEST,
      sortType: 'desc',
    });
  }
  @Query(() => ComicPage)
  async getComicsByTagId(
    @Args('id') id: string,
    @Args('page', { defaultValue: 1, nullable: true }) page: number,
    @Args('limit', { defaultValue: 25, nullable: true }) limit: number,
  ) {
    return await this.commicService.advanceSearch({
      genreIds: [id],
      limit,
      page,
      sortField: TrendingSortType.NEWEST,
      sortType: 'desc',
    });
  }
  @Query(() => ComicPage)
  async getComicsByUserId(
    @Args('id') id: string,
    @Args('page', { defaultValue: 1, nullable: true }) page: number,
    @Args('limit', { defaultValue: 25, nullable: true }) limit: number,
  ) {
    return await this.commicService.advanceSearch({
      creatorId: id,
      limit,
      page,
      sortField: TrendingSortType.NEWEST,
      sortType: 'desc',
    });
  }

  @Query(() => ComicPage)
  @UseGuards(new WithRoleGuardGQL(Role.USER))
  async getFollowedComics(
    @Args('page', { defaultValue: 1, nullable: true }) page: number,
    @Args('limit', { defaultValue: 25, nullable: true }) limit: number,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.commicService.getUserFollowedComic(user._id, page, limit);
  }
  @Query(() => [SortOption])
  async getSortOptions() {
    return SortOption.allSortOptions;
  }

  @Mutation(() => Boolean)
  @UseGuards(new WithRoleGuardGQL(Role.USER))
  async toggleFollowComic(
    @Args('comicId') comicId: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.userService.toggleFollowComic(user._id, comicId);
  }
  @Query(() => Boolean)
  @UseGuards(new WithRoleGuardGQL(Role.USER))
  async isInFollowedComics(
    @Args('comicId') comicId: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.userService.isInFollowedComics(user._id, comicId);
  }

  @Query(() => [ComicStatus])
  async getAllComicStatus() {
    return ComicStatus.allStatus;
  }
}
