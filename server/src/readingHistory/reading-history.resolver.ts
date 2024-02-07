import { GrapqlJwtAuthGuard } from '@/auth/guard/grapql-jwt.auth.guard';
import { UserPayload } from '@/auth/interface/user-payload.jwt';
import { Chapter } from '@/chapter/schema/chapter.schema';
import { ComicService } from '@/comic/comic.service';
import { CurrentUser } from '@/common/decorator/graphql-user.decorator';
import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ReadingHistoryService } from './reading-history.service';
import { ReadingHistory } from './schema/reading-history.schema';

@Resolver(() => ReadingHistory)
export class ReadingHistoryResolver {
  constructor(
    @Inject(ComicService) private readonly comicService: ComicService,
    @Inject(ReadingHistoryService)
    private readonly readingHistoryService: ReadingHistoryService,
  ) {}
  @Query(() => [ReadingHistory])
  @UseGuards(GrapqlJwtAuthGuard)
  async getAllHistories(
    @CurrentUser() currentUser: UserPayload,
    @Args('page', {
      type: () => Number,
      defaultValue: 1,
      nullable: true,
    })
    page: number,
    @Args('limit', {
      type: () => Number,
      defaultValue: 200,
      nullable: true,
    })
    limit: number,
  ) {
    return await this.readingHistoryService.getReadingHistories(
      currentUser._id,
      limit,
      page,
    );
  }
  @ResolveField(() => Chapter)
  @UseGuards(GrapqlJwtAuthGuard)
  async chapter(
    @Parent() history: ReadingHistory,
    @CurrentUser() user: UserPayload,
  ) {
    return history.chapter;
  }
  // @ResolveField(() => Comic)
  // async comic(@Parent() history: ReadingHistory) {
  //   return history.chapter
  //     ? this.comicService.getById(history.chapter.comic._id)
  //     : null;
  // }
  @Mutation(() => Boolean)
  @UseGuards(GrapqlJwtAuthGuard)
  async removeHistory(
    @Args('chapterId', {
      type: () => String,
    })
    chapterId: string,
    @CurrentUser() user: UserPayload,
  ) {
    return await this.readingHistoryService.removeHistory(user._id, chapterId);
  }
  @Mutation(() => Boolean)
  @UseGuards(GrapqlJwtAuthGuard)
  async removeAllHistories(@CurrentUser() user: UserPayload) {
    return await this.readingHistoryService.removeAllHistory(user._id);
  }
}
