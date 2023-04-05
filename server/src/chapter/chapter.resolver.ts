import { ComicService } from '@/comic/comic.service';
import { Comic } from '@/comic/schema/comic.schema';
import { Inject } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ChapterService } from './chapter.service';
import { Chapter } from './schema/chapter.schema';

@Resolver(() => Chapter)
export class ChapterResolver {
  constructor(
    @Inject(ChapterService) private readonly chapterService: ChapterService,
    @Inject(ComicService) private readonly comicService: ComicService,
  ) {}
  @Query(() => [Chapter])
  async getAllChapters(
    @Args('comicId', {
      type: () => String,
    })
    comicId: string,
  ) {
    return await this.chapterService.getChapterByComicId(comicId);
  }

  @Query(() => Chapter)
  async getChapterById(@Args('chapterId') chapterId: string) {
    return await this.chapterService.getChapterById(chapterId);
  }
  @ResolveField(() => Comic)
  async comic(@Parent() chapter: Chapter) {
    return await this.comicService.getById(chapter.comic._id);
  }
  @ResolveField(() => Chapter, { nullable: true })
  async previousChapter(@Parent() chapter: Chapter) {
    return await this.chapterService.getPreviousChapter(chapter);
  }
  @ResolveField(() => Chapter, { nullable: true })
  async nextChapter(@Parent() chapter: Chapter) {
    return await this.chapterService.getNextChapter(chapter);
  }
}
