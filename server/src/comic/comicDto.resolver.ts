import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ComicDto, ComicDtoAssembler } from './dto/comic.dto';
import { Author } from '@/author/schema/author.schema';
import { Tag } from '@/tag/schema/tag.schema';
import { User } from '@/user/schema/user.schema';
import { Chapter } from '@/chapter/schema/chapter.schema';
import { Inject } from '@nestjs/common';
import { AuthorService } from '@/author/author.service';
import { TagService } from '@/tag/tag.service';
import { ChapterService } from '@/chapter/chapter.service';
import { UserService } from '@/user/user.service';
import { CRUDResolver, PagingStrategies } from '@ptc-org/nestjs-query-graphql';
import {
  InjectAssemblerQueryService,
  QueryService,
} from '@ptc-org/nestjs-query-core';

@Resolver(() => ComicDto)
export class ComicDtoResolver extends CRUDResolver(ComicDto, {
  delete: { disabled: true },
  create: { disabled: true },
  update: { disabled: true },
  pagingStrategy: PagingStrategies.OFFSET,
  enableTotalCount: true,
}) {
  constructor(
    @InjectAssemblerQueryService(ComicDtoAssembler)
    readonly service: QueryService<ComicDto>,
    @Inject(AuthorService) private readonly authorService: AuthorService,
    @Inject(TagService) private readonly tagService: TagService,
    @Inject(ChapterService) private readonly chapterService: ChapterService,
    private readonly userService: UserService,
  ) {
    super(service);
  }
  @ResolveField(() => Author)
  async author(@Parent() comic: ComicDto) {
    if (comic.author.name) return comic.author;
    const author = await this.authorService.authorLoader.load(
      comic.author + '',
    );
    return author;
  }

  @ResolveField(() => User)
  async createdBy(@Parent() comic: ComicDto) {
    if (comic.createdBy.email) return comic.createdBy;
    const user = await this.userService.userDataloader.load(
      comic.createdBy + '',
    );
    return user;
  }
  @ResolveField(() => [Tag])
  async genres(@Parent() comic: ComicDto) {
    if (comic.genres && comic.genres[0].name) return comic.genres;
    const genrePromise: Promise<Tag>[] = [];
    for (const genre of comic.genres) {
      genrePromise.push(this.tagService.tagDataLoader.load(genre + ''));
    }
    const tags = await Promise.all(genrePromise);
    return tags;
  }
  @ResolveField(() => Tag)
  async category(@Parent() comic: ComicDto) {
    if (comic.category.name) return comic.category;
    if (!comic.category) return null;
    const tags = await this.tagService.tagDataLoader.load(comic.category + '');
    return tags;
  }
  @ResolveField(() => Chapter)
  async recentChapter(@Parent() comic: ComicDto) {
    return await this.chapterService.lastestChapterByComicIdDataLoader.load(
      comic._id + '',
    );
  }
  @ResolveField(() => Number)
  async chapterCount(@Parent() comic: ComicDto) {
    return await this.chapterService.countChapterByComicIdDataLoader.load(
      comic._id + '',
    );
  }
}
