export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
};

export type AdvanceSearchInput = {
  authorIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  categoryIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  creatorId?: InputMaybe<Scalars["String"]["input"]>;
  genreIds?: InputMaybe<Array<Scalars["String"]["input"]>>;
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
  sortField?: InputMaybe<Scalars["String"]["input"]>;
  sortType?: InputMaybe<Scalars["String"]["input"]>;
};

export type Author = {
  _id: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  totalComic: Scalars["Float"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type Chapter = {
  _id: Scalars["String"]["output"];
  chapterNumber: Scalars["String"]["output"];
  comic: Comic;
  createdAt: Scalars["DateTime"]["output"];
  monthViewCount: Scalars["Int"]["output"];
  name?: Maybe<Scalars["String"]["output"]>;
  nextChapter?: Maybe<Chapter>;
  order: Scalars["Float"]["output"];
  pageCount: Scalars["Int"]["output"];
  pages: Array<Page>;
  previousChapter?: Maybe<Chapter>;
  todayViewCount: Scalars["Int"]["output"];
  totalViewCount: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  weekViewCount: Scalars["Int"]["output"];
  yearViewCount: Scalars["Int"]["output"];
};

export type ChapterOrder = {
  id: Scalars["String"]["input"];
  order: Scalars["Float"]["input"];
};

export type Comic = {
  _id: Scalars["String"]["output"];
  artist?: Maybe<Author>;
  author: Author;
  category?: Maybe<Tag>;
  chapterCount: Scalars["Int"]["output"];
  contributors: Array<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  createdBy: User;
  description: Scalars["String"]["output"];
  followCount?: Maybe<Scalars["Int"]["output"]>;
  genres: Array<Tag>;
  imageCoverUrl: Scalars["String"]["output"];
  imageThumbUrl: Scalars["String"]["output"];
  monthViewCount: Scalars["Int"]["output"];
  name: Scalars["String"]["output"];
  officeUrl?: Maybe<Scalars["String"]["output"]>;
  otherNames: Array<Scalars["String"]["output"]>;
  recentChapter?: Maybe<Chapter>;
  slug: Scalars["String"]["output"];
  status: Scalars["String"]["output"];
  todayViewCount: Scalars["Int"]["output"];
  totalViewCount: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  weekViewCount: Scalars["Int"]["output"];
  yearViewCount: Scalars["Int"]["output"];
};

export type ComicPage = {
  data: Array<Comic>;
  totalPages: Scalars["Int"]["output"];
};

export type ComicStatus = {
  id: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
};

export type CreateAuthorDto = {
  description: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateChapterDto = {
  chapterNumber: Scalars["String"]["input"];
  comicId: Scalars["String"]["input"];
  name?: InputMaybe<Scalars["String"]["input"]>;
  pages: Array<PageInput>;
};

export type CreateComicInput = {
  artistId?: InputMaybe<Scalars["String"]["input"]>;
  authorId: Scalars["String"]["input"];
  categoryId: Scalars["String"]["input"];
  description?: Scalars["String"]["input"];
  genreIds: Array<Scalars["String"]["input"]>;
  imageCoverUrl: Scalars["String"]["input"];
  imageThumbUrl: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  officeUrl?: InputMaybe<Scalars["String"]["input"]>;
  otherNames?: InputMaybe<Array<Scalars["String"]["input"]>>;
  status?: InputMaybe<Scalars["String"]["input"]>;
};

export type CreateTagDto = {
  description: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type CreateUserDto = {
  avatarUrl?: InputMaybe<Scalars["String"]["input"]>;
  displayName?: InputMaybe<Scalars["String"]["input"]>;
  email: Scalars["String"]["input"];
  rawPassword: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type FindUserDto = {
  _id?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type Mutation = {
  createAuthor: Author;
  createChapter: Chapter;
  createComic: Comic;
  createTag: Tag;
  createUser: User;
  deleteAuthor: Scalars["Boolean"]["output"];
  deleteComic: Scalars["Boolean"]["output"];
  removeAllHistories: Scalars["Boolean"]["output"];
  removeHistory: Scalars["Boolean"]["output"];
  toggleFollowComic: Scalars["Boolean"]["output"];
  totalUploadedComic: Scalars["Int"]["output"];
  updateAuthor: Author;
  updateChaptersOrder: Array<Chapter>;
  updateComic: Comic;
  updateImportantInfo: User;
  updateTag: Tag;
  updateUser: User;
};

export type MutationCreateAuthorArgs = {
  createAuthorInput: CreateAuthorDto;
};

export type MutationCreateChapterArgs = {
  input: CreateChapterDto;
};

export type MutationCreateComicArgs = {
  input: CreateComicInput;
};

export type MutationCreateTagArgs = {
  createTagInput: CreateTagDto;
};

export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};

export type MutationDeleteAuthorArgs = {
  id: Scalars["String"]["input"];
};

export type MutationDeleteComicArgs = {
  id: Scalars["String"]["input"];
};

export type MutationRemoveHistoryArgs = {
  chapterId: Scalars["String"]["input"];
};

export type MutationToggleFollowComicArgs = {
  comicId: Scalars["String"]["input"];
};

export type MutationUpdateAuthorArgs = {
  id: Scalars["String"]["input"];
  updateAuthorInput: UpdateAuthorDto;
};

export type MutationUpdateChaptersOrderArgs = {
  input: UpdateChaptersOrderInput;
};

export type MutationUpdateComicArgs = {
  id: Scalars["String"]["input"];
  input: CreateComicInput;
};

export type MutationUpdateImportantInfoArgs = {
  input: UpdateImportantInfoDto;
};

export type MutationUpdateTagArgs = {
  id: Scalars["String"]["input"];
  updateTagInput: UpdateTagDto;
};

export type MutationUpdateUserArgs = {
  id: Scalars["String"]["input"];
  updateUserInput: UpdateUserDto;
};

export type Page = {
  order: Scalars["Float"]["output"];
  url: Scalars["String"]["output"];
};

export type PageInput = {
  order: Scalars["Float"]["input"];
  url: Scalars["String"]["input"];
};

export type Query = {
  advanceSearchComics: ComicPage;
  author: Author;
  authors: Array<Author>;
  getAllChapters: Array<Chapter>;
  getAllComicStatus: Array<ComicStatus>;
  getAllComics: Array<Comic>;
  getAllHistories: Array<ReadingHistory>;
  getCategories: Array<Tag>;
  getChapterById: Chapter;
  getChaptersByComicSlug: Array<Chapter>;
  getComicById: Comic;
  getComicBySlug: Comic;
  getComicCreatedByUser: Array<Comic>;
  getComicsByAuthorId: ComicPage;
  getComicsByTagId: ComicPage;
  getComicsByUserId: ComicPage;
  getContributedComics: Array<Comic>;
  getFollowedComics: ComicPage;
  getGenres: Array<Tag>;
  getLastedChapterByComicId: Chapter;
  getRecentComics: ComicPage;
  getSortOptions: Array<SortOption>;
  getTopComics: ComicPage;
  getTrendingComics: Array<Comic>;
  isInFollowedComics: Scalars["Boolean"]["output"];
  searchAuthor: QueryAuthorsDto;
  tag: Tag;
  tags: Array<Tag>;
  user: User;
  users: UserQueryDto;
};

export type QueryAdvanceSearchComicsArgs = {
  input: AdvanceSearchInput;
};

export type QueryAuthorArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetAllChaptersArgs = {
  comicId: Scalars["String"]["input"];
};

export type QueryGetAllHistoriesArgs = {
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetChapterByIdArgs = {
  chapterId: Scalars["String"]["input"];
};

export type QueryGetChaptersByComicSlugArgs = {
  slug: Scalars["String"]["input"];
};

export type QueryGetComicByIdArgs = {
  id: Scalars["String"]["input"];
};

export type QueryGetComicBySlugArgs = {
  slug: Scalars["String"]["input"];
};

export type QueryGetComicCreatedByUserArgs = {
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
  userId: Scalars["String"]["input"];
};

export type QueryGetComicsByAuthorIdArgs = {
  id: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetComicsByTagIdArgs = {
  id: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetComicsByUserIdArgs = {
  id: Scalars["String"]["input"];
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetContributedComicsArgs = {
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetFollowedComicsArgs = {
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetLastedChapterByComicIdArgs = {
  comicId: Scalars["String"]["input"];
};

export type QueryGetRecentComicsArgs = {
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetTopComicsArgs = {
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryGetTrendingComicsArgs = {
  input: TrendingSortInput;
};

export type QueryIsInFollowedComicsArgs = {
  comicId: Scalars["String"]["input"];
};

export type QuerySearchAuthorArgs = {
  keyword?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryTagArgs = {
  id: Scalars["String"]["input"];
};

export type QueryUserArgs = {
  findUserInput: FindUserDto;
};

export type QueryUsersArgs = {
  keywords?: InputMaybe<Scalars["String"]["input"]>;
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
};

export type QueryAuthorsDto = {
  authors: Array<Author>;
  count: Scalars["Float"]["output"];
};

export type ReadingHistory = {
  chapter?: Maybe<Chapter>;
  createdAt: Scalars["DateTime"]["output"];
};

export type SortOption = {
  name: Scalars["String"]["output"];
  value: SortType;
};

export type SortType = {
  direction: Scalars["String"]["output"];
  field: Scalars["String"]["output"];
};

export type Tag = {
  _id: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  name: Scalars["String"]["output"];
  totalComic: Scalars["Float"]["output"];
  type: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type TrendingSortInput = {
  limit?: InputMaybe<Scalars["Float"]["input"]>;
  page?: InputMaybe<Scalars["Float"]["input"]>;
  type: Scalars["String"]["input"];
};

export type UpdateAuthorDto = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateChaptersOrderInput = {
  chapters: Array<ChapterOrder>;
};

export type UpdateImportantInfoDto = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  newPassword?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
};

export type UpdateTagDto = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UpdateUserDto = {
  base64Avatar?: InputMaybe<Scalars["String"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  displayName?: InputMaybe<Scalars["String"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  role?: InputMaybe<Scalars["Int"]["input"]>;
  username?: InputMaybe<Scalars["String"]["input"]>;
};

export type User = {
  _id: Scalars["String"]["output"];
  avatarUrl?: Maybe<Scalars["String"]["output"]>;
  createdAt: Scalars["DateTime"]["output"];
  description?: Maybe<Scalars["String"]["output"]>;
  displayName: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  followedComics: Array<Comic>;
  readingHistories: Array<ReadingHistory>;
  role: Scalars["Int"]["output"];
  totalUploadedComic: Scalars["Int"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type UserQueryDto = {
  count: Scalars["Int"]["output"];
  users: Array<User>;
};
