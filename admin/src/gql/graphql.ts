/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type AdvanceSearchInput = {
  authorIds?: InputMaybe<Array<Scalars['String']['input']>>;
  categoryIds?: InputMaybe<Array<Scalars['String']['input']>>;
  creatorId?: InputMaybe<Scalars['String']['input']>;
  genreIds?: InputMaybe<Array<Scalars['String']['input']>>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  sortField?: InputMaybe<Scalars['String']['input']>;
  sortType?: InputMaybe<Scalars['String']['input']>;
};

export type Author = {
  __typename?: 'Author';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  totalComics: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AuthorConnection = {
  __typename?: 'AuthorConnection';
  /** Array of nodes. */
  nodes: Array<Author>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type AuthorCreatedAtFilterComparison = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

export type AuthorDeleteFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<AuthorDeleteFilter>>;
  createdAt?: InputMaybe<AuthorCreatedAtFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<AuthorDeleteFilter>>;
  totalComics?: InputMaybe<NumberFieldComparison>;
  updatedAt?: InputMaybe<AuthorUpdatedAtFilterComparison>;
};

export type AuthorDeleteResponse = {
  __typename?: 'AuthorDeleteResponse';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  totalComics?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AuthorFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<AuthorFilter>>;
  createdAt?: InputMaybe<AuthorCreatedAtFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<AuthorFilter>>;
  totalComics?: InputMaybe<NumberFieldComparison>;
  updatedAt?: InputMaybe<AuthorUpdatedAtFilterComparison>;
};

export type AuthorSort = {
  direction: SortDirection;
  field: AuthorSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum AuthorSortFields {
  Id = '_id',
  CreatedAt = 'createdAt',
  Name = 'name',
  TotalComics = 'totalComics',
  UpdatedAt = 'updatedAt'
}

export type AuthorUpdateFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<AuthorUpdateFilter>>;
  createdAt?: InputMaybe<AuthorCreatedAtFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<AuthorUpdateFilter>>;
  totalComics?: InputMaybe<NumberFieldComparison>;
  updatedAt?: InputMaybe<AuthorUpdatedAtFilterComparison>;
};

export type AuthorUpdatedAtFilterComparison = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Chapter = {
  __typename?: 'Chapter';
  _id: Scalars['ID']['output'];
  chapterNumber: Scalars['String']['output'];
  comic: Comic;
  createdAt: Scalars['DateTime']['output'];
  monthViewCount: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
  nextChapter?: Maybe<Chapter>;
  order: Scalars['Float']['output'];
  pageCount: Scalars['Int']['output'];
  pages: Array<Page>;
  previousChapter?: Maybe<Chapter>;
  todayViewCount: Scalars['Int']['output'];
  totalViewCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  weekViewCount: Scalars['Int']['output'];
  yearViewCount: Scalars['Int']['output'];
};

export type ChapterOrder = {
  id: Scalars['String']['input'];
  order: Scalars['Float']['input'];
};

export type Comic = {
  __typename?: 'Comic';
  _id: Scalars['ID']['output'];
  artist?: Maybe<Author>;
  author: Author;
  category?: Maybe<Tag>;
  chapterCount: Scalars['Int']['output'];
  contributors: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  description: Scalars['String']['output'];
  followCount?: Maybe<Scalars['Int']['output']>;
  genres: Array<Tag>;
  imageCoverUrl: Scalars['String']['output'];
  imageThumbUrl: Scalars['String']['output'];
  monthViewCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  officeUrl?: Maybe<Scalars['String']['output']>;
  otherNames: Array<Scalars['String']['output']>;
  recentChapter?: Maybe<Chapter>;
  slug: Scalars['String']['output'];
  status: Scalars['String']['output'];
  todayViewCount: Scalars['Int']['output'];
  totalViewCount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  weekViewCount: Scalars['Int']['output'];
  yearViewCount: Scalars['Int']['output'];
};

export type ComicDto = {
  __typename?: 'ComicDto';
  _id: Scalars['ID']['output'];
  author: Author;
  category: Tag;
  chapterCount: Scalars['Int']['output'];
  contributors: Array<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  createdBy: User;
  description: Scalars['String']['output'];
  followCount: Scalars['Float']['output'];
  genres: Tag;
  imageCoverUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  otherNames: Array<Scalars['String']['output']>;
  recentChapter: Chapter;
  slug: Scalars['String']['output'];
  status: Scalars['String']['output'];
  totalViewCount: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type ComicDtoChapterCountFilterComparison = {
  between?: InputMaybe<ComicDtoChapterCountFilterComparisonBetween>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export type ComicDtoChapterCountFilterComparisonBetween = {
  lower: Scalars['Float']['input'];
  upper: Scalars['Float']['input'];
};

export type ComicDtoConnection = {
  __typename?: 'ComicDtoConnection';
  /** Array of nodes. */
  nodes: Array<ComicDto>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type ComicDtoContributorsFilterComparison = {
  in?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
  notIn?: InputMaybe<Array<Array<Scalars['String']['input']>>>;
};

export type ComicDtoCreatedAtFilterComparison = {
  between?: InputMaybe<ComicDtoCreatedAtFilterComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ComicDtoCreatedAtFilterComparisonBetween = {
  lower: Scalars['DateTime']['input'];
  upper: Scalars['DateTime']['input'];
};

export type ComicDtoFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<ComicDtoFilter>>;
  chapterCount?: InputMaybe<ComicDtoChapterCountFilterComparison>;
  contributors?: InputMaybe<ComicDtoContributorsFilterComparison>;
  createdAt?: InputMaybe<ComicDtoCreatedAtFilterComparison>;
  followCount?: InputMaybe<ComicDtoFollowCountFilterComparison>;
  name?: InputMaybe<ComicDtoNameFilterComparison>;
  or?: InputMaybe<Array<ComicDtoFilter>>;
  slug?: InputMaybe<ComicDtoSlugFilterComparison>;
  status?: InputMaybe<ComicDtoStatusFilterComparison>;
  totalViewCount?: InputMaybe<ComicDtoTotalViewCountFilterComparison>;
  updatedAt?: InputMaybe<ComicDtoUpdatedAtFilterComparison>;
};

export type ComicDtoFollowCountFilterComparison = {
  between?: InputMaybe<ComicDtoFollowCountFilterComparisonBetween>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export type ComicDtoFollowCountFilterComparisonBetween = {
  lower: Scalars['Float']['input'];
  upper: Scalars['Float']['input'];
};

export type ComicDtoNameFilterComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ComicDtoSlugFilterComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type ComicDtoSort = {
  direction: SortDirection;
  field: ComicDtoSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum ComicDtoSortFields {
  Id = '_id',
  ChapterCount = 'chapterCount',
  Contributors = 'contributors',
  CreatedAt = 'createdAt',
  FollowCount = 'followCount',
  Name = 'name',
  Slug = 'slug',
  Status = 'status',
  TotalViewCount = 'totalViewCount',
  UpdatedAt = 'updatedAt'
}

export type ComicDtoStatusFilterComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ComicDtoTotalViewCountFilterComparison = {
  between?: InputMaybe<ComicDtoTotalViewCountFilterComparisonBetween>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
};

export type ComicDtoTotalViewCountFilterComparisonBetween = {
  lower: Scalars['Float']['input'];
  upper: Scalars['Float']['input'];
};

export type ComicDtoUpdatedAtFilterComparison = {
  between?: InputMaybe<ComicDtoUpdatedAtFilterComparisonBetween>;
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

export type ComicDtoUpdatedAtFilterComparisonBetween = {
  lower: Scalars['DateTime']['input'];
  upper: Scalars['DateTime']['input'];
};

export type ComicPage = {
  __typename?: 'ComicPage';
  data: Array<Comic>;
  totalPages: Scalars['Int']['output'];
};

export type ComicStatus = {
  __typename?: 'ComicStatus';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CreateAuthorDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateChapterDto = {
  chapterNumber: Scalars['String']['input'];
  comicId: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  pages: Array<PageInput>;
};

export type CreateComicInput = {
  artistId?: InputMaybe<Scalars['String']['input']>;
  authorId: Scalars['String']['input'];
  categoryId: Scalars['String']['input'];
  description?: Scalars['String']['input'];
  genreIds: Array<Scalars['String']['input']>;
  imageCoverUrl: Scalars['String']['input'];
  imageThumbUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
  officeUrl?: InputMaybe<Scalars['String']['input']>;
  otherNames?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type CreateManyAuthorsInput = {
  /** Array of records to create */
  authors: Array<CreateAuthorDto>;
};

export type CreateManyTagsInput = {
  /** Array of records to create */
  tags: Array<CreateTagDto>;
};

export type CreateOneAuthorInput = {
  /** The record to create */
  author: CreateAuthorDto;
};

export type CreateOneTagInput = {
  /** The record to create */
  tag: CreateTagDto;
};

export type CreateTagDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  type?: Scalars['String']['input'];
};

export type CreateUserDto = {
  avatarUrl?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  rawPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type DeleteManyAuthorsInput = {
  /** Filter to find records to delete */
  filter: AuthorDeleteFilter;
};

export type DeleteManyResponse = {
  __typename?: 'DeleteManyResponse';
  /** The number of records deleted. */
  deletedCount: Scalars['Int']['output'];
};

export type DeleteManyTagsInput = {
  /** Filter to find records to delete */
  filter: TagDeleteFilter;
};

export type DeleteOneAuthorInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type DeleteOneTagInput = {
  /** The id of the record to delete. */
  id: Scalars['ID']['input'];
};

export type FindUserDto = {
  _id?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type IdFilterComparison = {
  eq?: InputMaybe<Scalars['ID']['input']>;
  gt?: InputMaybe<Scalars['ID']['input']>;
  gte?: InputMaybe<Scalars['ID']['input']>;
  iLike?: InputMaybe<Scalars['ID']['input']>;
  in?: InputMaybe<Array<Scalars['ID']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['ID']['input']>;
  lt?: InputMaybe<Scalars['ID']['input']>;
  lte?: InputMaybe<Scalars['ID']['input']>;
  neq?: InputMaybe<Scalars['ID']['input']>;
  notILike?: InputMaybe<Scalars['ID']['input']>;
  notIn?: InputMaybe<Array<Scalars['ID']['input']>>;
  notLike?: InputMaybe<Scalars['ID']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor: Author;
  createChapter: Chapter;
  createComic: Comic;
  createManyAuthors: Array<Author>;
  createManyTags: Array<Tag>;
  createOneAuthor: Author;
  createOneTag: Tag;
  createTag: Tag;
  createUser: User;
  deleteAuthor: Scalars['Boolean']['output'];
  deleteComic: Scalars['Boolean']['output'];
  deleteManyAuthors: DeleteManyResponse;
  deleteManyTags: DeleteManyResponse;
  deleteOneAuthor: AuthorDeleteResponse;
  deleteOneTag: TagDeleteResponse;
  removeAllHistories: Scalars['Boolean']['output'];
  removeHistory: Scalars['Boolean']['output'];
  toggleFollowComic: Scalars['Boolean']['output'];
  totalUploadedComic: Scalars['Int']['output'];
  updateAuthor: Author;
  updateChaptersOrder: Array<Chapter>;
  updateComic: Comic;
  updateImportantInfo: User;
  updateManyAuthors: UpdateManyResponse;
  updateManyTags: UpdateManyResponse;
  updateOneAuthor: Author;
  updateOneTag: Tag;
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


export type MutationCreateManyAuthorsArgs = {
  input: CreateManyAuthorsInput;
};


export type MutationCreateManyTagsArgs = {
  input: CreateManyTagsInput;
};


export type MutationCreateOneAuthorArgs = {
  input: CreateOneAuthorInput;
};


export type MutationCreateOneTagArgs = {
  input: CreateOneTagInput;
};


export type MutationCreateTagArgs = {
  createTagInput: CreateTagDto;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};


export type MutationDeleteAuthorArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteComicArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteManyAuthorsArgs = {
  input: DeleteManyAuthorsInput;
};


export type MutationDeleteManyTagsArgs = {
  input: DeleteManyTagsInput;
};


export type MutationDeleteOneAuthorArgs = {
  input: DeleteOneAuthorInput;
};


export type MutationDeleteOneTagArgs = {
  input: DeleteOneTagInput;
};


export type MutationRemoveHistoryArgs = {
  chapterId: Scalars['String']['input'];
};


export type MutationToggleFollowComicArgs = {
  comicId: Scalars['String']['input'];
};


export type MutationUpdateAuthorArgs = {
  id: Scalars['String']['input'];
  updateAuthorInput: UpdateAuthorDto;
};


export type MutationUpdateChaptersOrderArgs = {
  input: UpdateChaptersOrderInput;
};


export type MutationUpdateComicArgs = {
  id: Scalars['String']['input'];
  input: CreateComicInput;
};


export type MutationUpdateImportantInfoArgs = {
  input: UpdateImportantInfoDto;
};


export type MutationUpdateManyAuthorsArgs = {
  input: UpdateManyAuthorsInput;
};


export type MutationUpdateManyTagsArgs = {
  input: UpdateManyTagsInput;
};


export type MutationUpdateOneAuthorArgs = {
  input: UpdateOneAuthorInput;
};


export type MutationUpdateOneTagArgs = {
  input: UpdateOneTagInput;
};


export type MutationUpdateTagArgs = {
  id: Scalars['String']['input'];
  updateTagInput: UpdateTagDto;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserDto;
};

export type NumberFieldComparison = {
  between?: InputMaybe<NumberFieldComparisonBetween>;
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  neq?: InputMaybe<Scalars['Float']['input']>;
  notBetween?: InputMaybe<NumberFieldComparisonBetween>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type NumberFieldComparisonBetween = {
  lower: Scalars['Float']['input'];
  upper: Scalars['Float']['input'];
};

export type OffsetPageInfo = {
  __typename?: 'OffsetPageInfo';
  /** true if paging forward and there are more records. */
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  /** true if paging backwards and there are more records. */
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
};

export type OffsetPaging = {
  /** Limit the number of records returned */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Offset to start returning records from */
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Page = {
  __typename?: 'Page';
  order: Scalars['Float']['output'];
  url: Scalars['String']['output'];
};

export type PageInput = {
  order: Scalars['Float']['input'];
  url: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  advanceSearchComics: ComicPage;
  author: Author;
  authors: AuthorConnection;
  comicDto: ComicDto;
  comicDtos: ComicDtoConnection;
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
  isInFollowedComics: Scalars['Boolean']['output'];
  searchAuthor: QueryAuthorsDto;
  tag: Tag;
  tags: TagConnection;
  user: User;
  users: UserQueryDto;
};


export type QueryAdvanceSearchComicsArgs = {
  input: AdvanceSearchInput;
};


export type QueryAuthorArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAuthorsArgs = {
  filter?: AuthorFilter;
  paging?: OffsetPaging;
  sorting?: Array<AuthorSort>;
};


export type QueryComicDtoArgs = {
  id: Scalars['ID']['input'];
};


export type QueryComicDtosArgs = {
  filter?: ComicDtoFilter;
  paging?: OffsetPaging;
  sorting?: Array<ComicDtoSort>;
};


export type QueryGetAllChaptersArgs = {
  comicId: Scalars['String']['input'];
};


export type QueryGetAllHistoriesArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetChapterByIdArgs = {
  chapterId: Scalars['String']['input'];
};


export type QueryGetChaptersByComicSlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetComicByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetComicBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryGetComicCreatedByUserArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  userId: Scalars['String']['input'];
};


export type QueryGetComicsByAuthorIdArgs = {
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetComicsByTagIdArgs = {
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetComicsByUserIdArgs = {
  id: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetContributedComicsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetFollowedComicsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetLastedChapterByComicIdArgs = {
  comicId: Scalars['String']['input'];
};


export type QueryGetRecentComicsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetTopComicsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryGetTrendingComicsArgs = {
  input: TrendingSortInput;
};


export type QueryIsInFollowedComicsArgs = {
  comicId: Scalars['String']['input'];
};


export type QuerySearchAuthorArgs = {
  keyword?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryTagArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTagsArgs = {
  filter?: TagFilter;
  paging?: OffsetPaging;
  sorting?: Array<TagSort>;
};


export type QueryUserArgs = {
  findUserInput: FindUserDto;
};


export type QueryUsersArgs = {
  keywords?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
};

export type QueryAuthorsDto = {
  __typename?: 'QueryAuthorsDTO';
  authors: Array<Author>;
  count: Scalars['Float']['output'];
};

export type ReadingHistory = {
  __typename?: 'ReadingHistory';
  chapter?: Maybe<Chapter>;
  createdAt: Scalars['DateTime']['output'];
};

/** Sort Directions */
export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** Sort Nulls Options */
export enum SortNulls {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type SortOption = {
  __typename?: 'SortOption';
  name: Scalars['String']['output'];
  value: SortType;
};

export type SortType = {
  __typename?: 'SortType';
  direction: Scalars['String']['output'];
  field: Scalars['String']['output'];
};

export type StringFieldComparison = {
  eq?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  iLike?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  is?: InputMaybe<Scalars['Boolean']['input']>;
  isNot?: InputMaybe<Scalars['Boolean']['input']>;
  like?: InputMaybe<Scalars['String']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  notILike?: InputMaybe<Scalars['String']['input']>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  notLike?: InputMaybe<Scalars['String']['input']>;
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  totalComics: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TagConnection = {
  __typename?: 'TagConnection';
  /** Array of nodes. */
  nodes: Array<Tag>;
  /** Paging information */
  pageInfo: OffsetPageInfo;
  /** Fetch total count of records */
  totalCount: Scalars['Int']['output'];
};

export type TagCreatedAtFilterComparison = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TagDeleteFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<TagDeleteFilter>>;
  createdAt?: InputMaybe<TagCreatedAtFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TagDeleteFilter>>;
  totalComics?: InputMaybe<NumberFieldComparison>;
  type?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<TagUpdatedAtFilterComparison>;
};

export type TagDeleteResponse = {
  __typename?: 'TagDeleteResponse';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  totalComics?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type TagFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<TagFilter>>;
  createdAt?: InputMaybe<TagCreatedAtFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TagFilter>>;
  totalComics?: InputMaybe<NumberFieldComparison>;
  type?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<TagUpdatedAtFilterComparison>;
};

export type TagSort = {
  direction: SortDirection;
  field: TagSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum TagSortFields {
  Id = '_id',
  CreatedAt = 'createdAt',
  Name = 'name',
  TotalComics = 'totalComics',
  Type = 'type',
  UpdatedAt = 'updatedAt'
}

export type TagUpdateFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<TagUpdateFilter>>;
  createdAt?: InputMaybe<TagCreatedAtFilterComparison>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<TagUpdateFilter>>;
  totalComics?: InputMaybe<NumberFieldComparison>;
  type?: InputMaybe<StringFieldComparison>;
  updatedAt?: InputMaybe<TagUpdatedAtFilterComparison>;
};

export type TagUpdatedAtFilterComparison = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
};

export type TrendingSortInput = {
  limit?: InputMaybe<Scalars['Float']['input']>;
  page?: InputMaybe<Scalars['Float']['input']>;
  type: Scalars['String']['input'];
};

export type UpdateAuthorDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChaptersOrderInput = {
  chapters: Array<ChapterOrder>;
};

export type UpdateImportantInfoDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
};

export type UpdateManyAuthorsInput = {
  /** Filter used to find fields to update */
  filter: AuthorUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateAuthorDto;
};

export type UpdateManyResponse = {
  __typename?: 'UpdateManyResponse';
  /** The number of records updated. */
  updatedCount: Scalars['Int']['output'];
};

export type UpdateManyTagsInput = {
  /** Filter used to find fields to update */
  filter: TagUpdateFilter;
  /** The update to apply to all records found using the filter */
  update: UpdateTagDto;
};

export type UpdateOneAuthorInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateAuthorDto;
};

export type UpdateOneTagInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateTagDto;
};

export type UpdateTagDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};

export type UpdateUserDto = {
  base64Avatar?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['Int']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  avatarUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  followedComics: Array<Comic>;
  readingHistories: Array<ReadingHistory>;
  role: Scalars['Int']['output'];
  totalUploadedComic: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserQueryDto = {
  __typename?: 'UserQueryDto';
  count: Scalars['Int']['output'];
  users: Array<User>;
};

export type AuthorsTableQueryVariables = Exact<{
  filter: AuthorFilter;
  sorting: Array<AuthorSort> | AuthorSort;
  paging: OffsetPaging;
}>;


export type AuthorsTableQuery = { __typename?: 'Query', authors: { __typename?: 'AuthorConnection', totalCount: number, nodes: Array<{ __typename?: 'Author', _id: string, description?: string | null, name: string, totalComics: number }> } };

export type CreateOneAuthorMutationVariables = Exact<{
  input: CreateOneAuthorInput;
}>;


export type CreateOneAuthorMutation = { __typename?: 'Mutation', createOneAuthor: { __typename?: 'Author', _id: string } };

export type UpdateOneAuthorMutationVariables = Exact<{
  input: UpdateOneAuthorInput;
}>;


export type UpdateOneAuthorMutation = { __typename?: 'Mutation', updateOneAuthor: { __typename?: 'Author', _id: string, description?: string | null, name: string } };

export type DeleteOneAuthorMutationVariables = Exact<{
  input: DeleteOneAuthorInput;
}>;


export type DeleteOneAuthorMutation = { __typename?: 'Mutation', deleteOneAuthor: { __typename?: 'AuthorDeleteResponse', _id?: string | null } };

export type TagsTableQueryVariables = Exact<{
  filter: TagFilter;
  sorting: Array<TagSort> | TagSort;
  paging: OffsetPaging;
}>;


export type TagsTableQuery = { __typename?: 'Query', tags: { __typename?: 'TagConnection', totalCount: number, nodes: Array<{ __typename?: 'Tag', _id: string, description?: string | null, name: string, totalComics: number, type: string }> } };

export type CreateOneTagMutationVariables = Exact<{
  input: CreateOneTagInput;
}>;


export type CreateOneTagMutation = { __typename?: 'Mutation', createOneTag: { __typename?: 'Tag', _id: string } };

export type UpdateOneTagMutationVariables = Exact<{
  input: UpdateOneTagInput;
}>;


export type UpdateOneTagMutation = { __typename?: 'Mutation', updateOneTag: { __typename?: 'Tag', _id: string, description?: string | null, name: string, type: string } };

export type DeleteOneTagMutationVariables = Exact<{
  input: DeleteOneTagInput;
}>;


export type DeleteOneTagMutation = { __typename?: 'Mutation', deleteOneTag: { __typename?: 'TagDeleteResponse', _id?: string | null } };

export type ComicsTableQueryVariables = Exact<{
  filter: ComicDtoFilter;
  sorting: Array<ComicDtoSort> | ComicDtoSort;
  paging: OffsetPaging;
}>;


export type ComicsTableQuery = { __typename?: 'Query', comicDtos: { __typename?: 'ComicDtoConnection', totalCount: number, nodes: Array<{ __typename?: 'ComicDto', name: string, _id: string, slug: string, chapterCount: number, imageCoverUrl: string, author: { __typename?: 'Author', name: string }, category: { __typename?: 'Tag', name: string }, createdBy: { __typename?: 'User', username: string }, recentChapter: { __typename?: 'Chapter', name?: string | null } }> } };


export const AuthorsTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthorsTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorSort"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paging"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaging"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"paging"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paging"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalComics"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<AuthorsTableQuery, AuthorsTableQueryVariables>;
export const CreateOneAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOneAuthorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateOneAuthorMutation, CreateOneAuthorMutationVariables>;
export const UpdateOneAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOneAuthorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateOneAuthorMutation, UpdateOneAuthorMutationVariables>;
export const DeleteOneAuthorDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneAuthor"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteOneAuthorInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneAuthor"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteOneAuthorMutation, DeleteOneAuthorMutationVariables>;
export const TagsTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TagsTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TagSort"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paging"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaging"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"paging"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paging"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"totalComics"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<TagsTableQuery, TagsTableQueryVariables>;
export const CreateOneTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOneTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateOneTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOneTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<CreateOneTagMutation, CreateOneTagMutationVariables>;
export const UpdateOneTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOneTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateOneTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOneTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<UpdateOneTagMutation, UpdateOneTagMutationVariables>;
export const DeleteOneTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteOneTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteOneTagInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteOneTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}}]}}]}}]} as unknown as DocumentNode<DeleteOneTagMutation, DeleteOneTagMutationVariables>;
export const ComicsTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ComicsTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ComicDtoFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ComicDtoSort"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paging"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaging"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comicDtos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"paging"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paging"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"chapterCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}}]}},{"kind":"Field","name":{"kind":"Name","value":"imageCoverUrl"}},{"kind":"Field","name":{"kind":"Name","value":"recentChapter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<ComicsTableQuery, ComicsTableQueryVariables>;