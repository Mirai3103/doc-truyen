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
  totalComic: Scalars['Float']['output'];
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

export type AuthorDeleteFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<AuthorDeleteFilter>>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<AuthorDeleteFilter>>;
};

export type AuthorDeleteResponse = {
  __typename?: 'AuthorDeleteResponse';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  totalComic?: Maybe<Scalars['Float']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AuthorFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<AuthorFilter>>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<AuthorFilter>>;
};

export type AuthorSort = {
  direction: SortDirection;
  field: AuthorSortFields;
  nulls?: InputMaybe<SortNulls>;
};

export enum AuthorSortFields {
  Id = '_id',
  Name = 'name'
}

export type AuthorUpdateFilter = {
  _id?: InputMaybe<IdFilterComparison>;
  and?: InputMaybe<Array<AuthorUpdateFilter>>;
  name?: InputMaybe<StringFieldComparison>;
  or?: InputMaybe<Array<AuthorUpdateFilter>>;
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

export type CreateOneAuthorInput = {
  /** The record to create */
  author: CreateAuthorDto;
};

export type CreateTagDto = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
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

export type DeleteOneAuthorInput = {
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
  createOneAuthor: Author;
  createTag: Tag;
  createUser: User;
  deleteAuthor: Scalars['Boolean']['output'];
  deleteComic: Scalars['Boolean']['output'];
  deleteManyAuthors: DeleteManyResponse;
  deleteOneAuthor: AuthorDeleteResponse;
  removeAllHistories: Scalars['Boolean']['output'];
  removeHistory: Scalars['Boolean']['output'];
  toggleFollowComic: Scalars['Boolean']['output'];
  totalUploadedComic: Scalars['Int']['output'];
  updateAuthor: Author;
  updateChaptersOrder: Array<Chapter>;
  updateComic: Comic;
  updateImportantInfo: User;
  updateManyAuthors: UpdateManyResponse;
  updateOneAuthor: Author;
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


export type MutationCreateOneAuthorArgs = {
  input: CreateOneAuthorInput;
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


export type MutationDeleteOneAuthorArgs = {
  input: DeleteOneAuthorInput;
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


export type MutationUpdateOneAuthorArgs = {
  input: UpdateOneAuthorInput;
};


export type MutationUpdateTagArgs = {
  id: Scalars['String']['input'];
  updateTagInput: UpdateTagDto;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  updateUserInput: UpdateUserDto;
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
  tags: Array<Tag>;
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
  id: Scalars['String']['input'];
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
  totalComic: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
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

export type UpdateOneAuthorInput = {
  /** The id of the record to update */
  id: Scalars['ID']['input'];
  /** The update to apply. */
  update: UpdateAuthorDto;
};

export type UpdateTagDto = {
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
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


export type AuthorsTableQuery = { __typename?: 'Query', authors: { __typename?: 'AuthorConnection', totalCount: number, nodes: Array<{ __typename?: 'Author', _id: string, description?: string | null, name: string }> } };


export const AuthorsTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthorsTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorFilter"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthorSort"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paging"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"OffsetPaging"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authors"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sorting"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sorting"}}},{"kind":"Argument","name":{"kind":"Name","value":"paging"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paging"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<AuthorsTableQuery, AuthorsTableQueryVariables>;