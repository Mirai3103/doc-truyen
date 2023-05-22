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
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ComicService } from './comic.service';
import AdvanceSearchInput from './dto/advance-search.dto';
import CreateComicInput from './dto/create-comic-input.dto';
import { TrendingSortInput } from './dto/trendingSort.dto';
import { Comic } from './schema/comic.schema';
@Resolver(() => Comic)
export class ComicResolver {
  constructor(
    @Inject(ComicService) private readonly commicService: ComicService,
    @Inject(AuthorService) private readonly authorService: AuthorService,
    @Inject(TagService) private readonly tagService: TagService,
    @Inject(ChapterService) private readonly chapterService: ChapterService,
    @Inject(CACHE_MANAGER) private cacheManager: CacheStore,
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
    const author = await this.authorService.findOne(comic.author._id + '');
    return author;
  }
  @ResolveField(() => Author)
  async artist(@Parent() comic: Comic) {
    if (comic.artist?.name) return comic.artist;
    if (!comic.artist) return null;
    const author = await this.authorService.findOne(comic.artist._id + '');
    return author;
  }
  @ResolveField(() => User)
  async createdBy(@Parent() comic: Comic) {
    if (comic.createdBy.email) return comic.createdBy;
    const user = await this.userService.findByUniqueField(
      comic.createdBy._id + '',
    );
    return user;
  }
  @ResolveField(() => [Tag])
  async genres(@Parent() comic: Comic) {
    if (comic.genres && comic.genres[0].name) return comic.genres;
    const tags = await this.tagService.getListsTag(
      comic.genres.map((tag) => tag._id),
    );
    return tags;
  }
  @ResolveField(() => [Tag])
  async category(@Parent() comic: Comic) {
    if (comic.category.name) return comic.category;
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
    const key = `recent-comics-${limit}-${page}`;
    const cached = await this.cacheManager.get(key);

    if (cached) {
      return cached;
    }

    const data = await this.commicService.getRecentComics(limit, page);
    const expireTime = 60 * 15; //15 minutes
    this.cacheManager.set(key, data, { ttl: expireTime });

    return data;
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
    const key = `top-comics-${limit}-${page}`;
    const cached = await this.cacheManager.get(key);
    if (cached) {
      return cached;
    }
    const data = await this.commicService.getTopComics(limit, page);
    const expireTime = 60 * 15; //15 minutes
    this.cacheManager.set(key, data, { ttl: expireTime });
    return data;
  }
  @Query(() => Comic)
  @UseGuards(GrapqlMayBeNeedIdentityGuard)
  async getComicBySlug(@Args('slug') slug: string, @CurrentUser() user: any) {
    return await this.commicService.getComicBySlug(slug);
  }
  @Query(() => [Comic])
  async getTrendingComics(@Args('input') input: TrendingSortInput) {
    const key = `trending-comics-${JSON.stringify(input)}`;
    const cached = await this.cacheManager.get(key);
    if (cached) {
      return cached;
    }
    const data = await this.commicService.getTrendingComics(input);
    const expireTime = 60 * 15; //15 minutes
    await this.cacheManager.set(key, data, { ttl: expireTime });
    return data;
  }
  @Query(() => [Comic])
  @UseGuards(new WithRoleGuardGQL(Role.CREATOR))
  async getContributedComics(
    @Args('userId') userId: string,
    @Args('limit', { type: () => Number, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('page', { type: () => Number, nullable: true, defaultValue: 1 })
    page: number,
    @CurrentUser() user: UserPayload,
  ) {
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
  @ResolveField(() => Number)
  async chapterCount(@Parent() comic: Comic) {
    return await this.chapterService.countChapterByComicId(comic._id);
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
  @Query(() => [Comic])
  async advanceSearchComics(@Args('input') input: AdvanceSearchInput) {
    return await this.commicService.advanceSearch(input);
  }
}
