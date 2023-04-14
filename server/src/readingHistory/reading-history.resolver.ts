import { Chapter } from '@/chapter/schema/chapter.schema';
import { ComicService } from '@/comic/comic.service';
import { Comic } from '@/comic/schema/comic.schema';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
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
  async getAllHistories(
    @Args('userId', {
      type: () => String,
    })
    userId: string,
    @Args('page', {
      type: () => Number,
      defaultValue: 1,
      nullable: true,
    })
    page: number,
    @Args('limit', {
      type: () => Number,
      defaultValue: 30,
      nullable: true,
    })
    limit: number,
  ) {
    return await this.readingHistoryService.getReadingHistories(
      userId,
      limit,
      page,
    );
  }
  @ResolveField(() => Chapter)
  async chapter(@Parent() history: ReadingHistory) {
    return history.chapter;
  }
  @ResolveField(() => Comic)
  async comic(@Parent() history: ReadingHistory) {
    return this.comicService.getById(history.chapter.comic._id);
  }
}
