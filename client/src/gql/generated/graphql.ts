import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AdvanceSearchInput = {
  artistId?: InputMaybe<Scalars['String']>;
  authorId?: InputMaybe<Scalars['String']>;
  categoryId?: InputMaybe<Scalars['String']>;
  creatorId?: InputMaybe<Scalars['String']>;
  genreIds?: InputMaybe<Array<Scalars['String']>>;
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
  sortField?: InputMaybe<Scalars['String']>;
  sortType?: InputMaybe<Scalars['String']>;
};

export type Author = {
  __typename?: 'Author';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  totalComic: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type Chapter = {
  __typename?: 'Chapter';
  _id: Scalars['String'];
  chapterNumber: Scalars['String'];
  comic: Comic;
  createdAt: Scalars['DateTime'];
  monthViewCount: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  nextChapter?: Maybe<Chapter>;
  order: Scalars['Float'];
  pageCount: Scalars['Int'];
  pages: Array<Page>;
  previousChapter?: Maybe<Chapter>;
  todayViewCount: Scalars['Int'];
  totalViewCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  weekViewCount: Scalars['Int'];
  yearViewCount: Scalars['Int'];
};

export type ChapterOrder = {
  id: Scalars['String'];
  order: Scalars['Float'];
};

export type Comic = {
  __typename?: 'Comic';
  _id: Scalars['String'];
  artist?: Maybe<Author>;
  author: Author;
  category?: Maybe<Tag>;
  chapterCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description: Scalars['String'];
  followCount?: Maybe<Scalars['Int']>;
  genres: Array<Tag>;
  imageCoverUrl: Scalars['String'];
  imageThumbUrl: Scalars['String'];
  monthViewCount: Scalars['Int'];
  name: Scalars['String'];
  officeUrl?: Maybe<Scalars['String']>;
  otherNames: Array<Scalars['String']>;
  recentChapter?: Maybe<Chapter>;
  slug: Scalars['String'];
  status: Scalars['String'];
  todayViewCount: Scalars['Int'];
  totalViewCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  weekViewCount: Scalars['Int'];
  yearViewCount: Scalars['Int'];
};

export type CreateAuthorDto = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateChapterDto = {
  chapterNumber: Scalars['String'];
  comicId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  pages: Array<PageInput>;
};

export type CreateComicInput = {
  artistId?: InputMaybe<Scalars['String']>;
  authorId: Scalars['String'];
  categoryId: Scalars['String'];
  description?: Scalars['String'];
  genreIds: Array<Scalars['String']>;
  imageCoverUrl: Scalars['String'];
  imageThumbUrl: Scalars['String'];
  name: Scalars['String'];
  officeUrl?: InputMaybe<Scalars['String']>;
  otherNames?: InputMaybe<Array<Scalars['String']>>;
  status?: InputMaybe<Scalars['String']>;
};

export type CreateTagDto = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserDto = {
  avatarUrl?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  rawPassword: Scalars['String'];
  username: Scalars['String'];
};

export type FindUserDto = {
  _id?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAuthor: Author;
  createChapter: Chapter;
  createComic: Comic;
  createTag: Tag;
  createUser: User;
  deleteAuthor: Scalars['Boolean'];
  deleteComic: Scalars['Boolean'];
  removeAllHistories: Scalars['Boolean'];
  removeHistory: Scalars['Boolean'];
  totalUploadedComic: Scalars['Int'];
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
  id: Scalars['String'];
};


export type MutationDeleteComicArgs = {
  id: Scalars['String'];
};


export type MutationRemoveHistoryArgs = {
  chapterId: Scalars['String'];
};


export type MutationUpdateAuthorArgs = {
  id: Scalars['String'];
  updateAuthorInput: UpdateAuthorDto;
};


export type MutationUpdateChaptersOrderArgs = {
  input: UpdateChaptersOrderInput;
};


export type MutationUpdateComicArgs = {
  id: Scalars['String'];
  input: CreateComicInput;
};


export type MutationUpdateImportantInfoArgs = {
  input: UpdateImportantInfoDto;
};


export type MutationUpdateTagArgs = {
  id: Scalars['String'];
  updateTagInput: UpdateTagDto;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String'];
  updateUserInput: UpdateUserDto;
};

export type Page = {
  __typename?: 'Page';
  order: Scalars['Float'];
  url: Scalars['String'];
};

export type PageInput = {
  order: Scalars['Float'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  advanceSearchComics: Array<Comic>;
  author: Author;
  authors: Array<Author>;
  getAllChapters: Array<Chapter>;
  getAllComics: Array<Comic>;
  getAllHistories: Array<ReadingHistory>;
  getCategories: Array<Tag>;
  getChapterById: Chapter;
  getComicById: Comic;
  getComicBySlug: Comic;
  getComicCreatedByUser: Array<Comic>;
  getComicsByAuthorId: Array<Comic>;
  getComicsByTagId: Array<Comic>;
  getComicsByUserId: Array<Comic>;
  getContributedComics: Array<Comic>;
  getGenres: Array<Tag>;
  getLastedChapterByComicId: Chapter;
  getRecentComics: Array<Comic>;
  getTopComics: Array<Comic>;
  getTrendingComics: Array<Comic>;
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
  id: Scalars['String'];
};


export type QueryGetAllChaptersArgs = {
  comicId: Scalars['String'];
};


export type QueryGetAllHistoriesArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
  userId: Scalars['String'];
};


export type QueryGetChapterByIdArgs = {
  chapterId: Scalars['String'];
};


export type QueryGetComicByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetComicBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetComicCreatedByUserArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
  userId: Scalars['String'];
};


export type QueryGetComicsByAuthorIdArgs = {
  id: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};


export type QueryGetComicsByTagIdArgs = {
  id: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};


export type QueryGetComicsByUserIdArgs = {
  id: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};


export type QueryGetContributedComicsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
  userId: Scalars['String'];
};


export type QueryGetLastedChapterByComicIdArgs = {
  comicId: Scalars['String'];
};


export type QueryGetRecentComicsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};


export type QueryGetTopComicsArgs = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};


export type QueryGetTrendingComicsArgs = {
  input: TrendingSortInput;
};


export type QuerySearchAuthorArgs = {
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};


export type QueryTagArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  findUserInput: FindUserDto;
};


export type QueryUsersArgs = {
  keywords?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
};

export type QueryAuthorsDto = {
  __typename?: 'QueryAuthorsDTO';
  authors: Array<Author>;
  count: Scalars['Float'];
};

export type ReadingHistory = {
  __typename?: 'ReadingHistory';
  chapter?: Maybe<Chapter>;
  createdAt: Scalars['DateTime'];
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  totalComic: Scalars['Float'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TrendingSortInput = {
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
  type: Scalars['String'];
};

export type UpdateAuthorDto = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateChaptersOrderInput = {
  chapters: Array<ChapterOrder>;
};

export type UpdateImportantInfoDto = {
  email?: InputMaybe<Scalars['String']>;
  newPassword?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type UpdateTagDto = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserDto = {
  base64Avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String'];
  avatarUrl?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  displayName: Scalars['String'];
  email: Scalars['String'];
  followedComics: Array<Comic>;
  readingHistories: Array<ReadingHistory>;
  role: Scalars['Int'];
  totalUploadedComic: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserQueryDto = {
  __typename?: 'UserQueryDto';
  count: Scalars['Int'];
  users: Array<User>;
};

export type CreateAuthorMutationVariables = Exact<{
  createAuthorInput: CreateAuthorDto;
}>;


export type CreateAuthorMutation = { __typename?: 'Mutation', createAuthor: { __typename?: 'Author', _id: string } };

export type UpdateAuthorMutationVariables = Exact<{
  UpdateAuthorInput: UpdateAuthorDto;
  id: Scalars['String'];
}>;


export type UpdateAuthorMutation = { __typename?: 'Mutation', updateAuthor: { __typename?: 'Author', _id: string, name: string, description?: string | null } };

export type DeleteAuthorMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteAuthorMutation = { __typename?: 'Mutation', deleteAuthor: boolean };

export type CreateChapterMutationVariables = Exact<{
  input: CreateChapterDto;
}>;


export type CreateChapterMutation = { __typename?: 'Mutation', createChapter: { __typename?: 'Chapter', order: number } };

export type CreateComicMutationVariables = Exact<{
  input: CreateComicInput;
}>;


export type CreateComicMutation = { __typename?: 'Mutation', createComic: { __typename?: 'Comic', name: string } };

export type UpdateComicMutationVariables = Exact<{
  id: Scalars['String'];
  input: CreateComicInput;
}>;


export type UpdateComicMutation = { __typename?: 'Mutation', updateComic: { __typename?: 'Comic', name: string } };

export type UpdateChaptersOrderMutationVariables = Exact<{
  input: UpdateChaptersOrderInput;
}>;


export type UpdateChaptersOrderMutation = { __typename?: 'Mutation', data: Array<{ __typename?: 'Chapter', order: number }> };

export type DeleteComicMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteComicMutation = { __typename?: 'Mutation', deleteComic: boolean };

export type RemoveHistoryMutationVariables = Exact<{
  chapterId: Scalars['String'];
}>;


export type RemoveHistoryMutation = { __typename?: 'Mutation', removeHistory: boolean };

export type RemoveAllHistoryMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveAllHistoryMutation = { __typename?: 'Mutation', removeAllHistories: boolean };

export type CreateTagMutationVariables = Exact<{
  createTagInput: CreateTagDto;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', _id: string } };

export type UpdateTagMutationVariables = Exact<{
  UpdateTagInput: UpdateTagDto;
  id: Scalars['String'];
}>;


export type UpdateTagMutation = { __typename?: 'Mutation', updateTag: { __typename?: 'Tag', _id: string, name: string, description?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['String'];
  updateUserInput: UpdateUserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: string } };

export type UpdateImportantUserInfoMutationVariables = Exact<{
  updateUserInput: UpdateImportantInfoDto;
}>;


export type UpdateImportantUserInfoMutation = { __typename?: 'Mutation', updateImportantInfo: { __typename?: 'User', _id: string } };

export type SearchAuthorQueryVariables = Exact<{
  keyword?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type SearchAuthorQuery = { __typename?: 'Query', searchAuthor: { __typename?: 'QueryAuthorsDTO', count: number, authors: Array<{ __typename?: 'Author', _id: string, name: string, description?: string | null, createdAt: any }> } };

export type FindAllAuthorsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllAuthorsQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'Author', _id: string, name: string }> };

export type GetAllChaptersQueryVariables = Exact<{
  comicId: Scalars['String'];
}>;


export type GetAllChaptersQuery = { __typename?: 'Query', getAllChapters: Array<{ __typename?: 'Chapter', _id: string, chapterNumber: string, createdAt: any, order: number, name?: string | null }> };

export type GetAllChaptersAdminQueryVariables = Exact<{
  comicId: Scalars['String'];
}>;


export type GetAllChaptersAdminQuery = { __typename?: 'Query', chapters: Array<{ __typename?: 'Chapter', _id: string, chapterNumber: string, createdAt: any, order: number, name?: string | null, updatedAt: any, pageCount: number }> };

export type GetChapterByIdQueryVariables = Exact<{
  chapterId: Scalars['String'];
}>;


export type GetChapterByIdQuery = { __typename?: 'Query', getChapterById: { __typename?: 'Chapter', chapterNumber: string, order: number, name?: string | null, nextChapter?: { __typename?: 'Chapter', chapterNumber: string } | null, previousChapter?: { __typename?: 'Chapter', chapterNumber: string } | null, comic: { __typename?: 'Comic', name: string, slug: string, _id: string }, pages: Array<{ __typename?: 'Page', order: number, url: string }> } };

export type GetLastedChapterByComicIdQueryVariables = Exact<{
  comicId: Scalars['String'];
}>;


export type GetLastedChapterByComicIdQuery = { __typename?: 'Query', getLastedChapterByComicId: { __typename?: 'Chapter', _id: string, chapterNumber: string, createdAt: any, order: number, name?: string | null } };

export type GetGeneralInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGeneralInfoQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'Author', name: string, _id: string }>, genres: Array<{ __typename?: 'Tag', name: string, _id: string }>, categories: Array<{ __typename?: 'Tag', name: string, _id: string }> };

export type GetComicBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetComicBySlugQuery = { __typename?: 'Query', getComicBySlug: { __typename?: 'Comic', _id: string, createdAt: any, updatedAt: any, description: string, followCount?: number | null, totalViewCount: number, imageCoverUrl: string, imageThumbUrl: string, name: string, otherNames: Array<string>, status: string, artist?: { __typename?: 'Author', name: string, _id: string } | null, author: { __typename?: 'Author', name: string, _id: string }, category?: { __typename?: 'Tag', name: string, _id: string } | null, genres: Array<{ __typename?: 'Tag', name: string, _id: string }>, createdBy: { __typename?: 'User', _id: string, description?: string | null, avatarUrl?: string | null, displayName: string } } };

export type GetComicByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetComicByIdQuery = { __typename?: 'Query', comic: { __typename?: 'Comic', _id: string, name: string, otherNames: Array<string>, createdAt: any, updatedAt: any, description: string, imageCoverUrl: string, imageThumbUrl: string, status: string, slug: string, officeUrl?: string | null, author: { __typename?: 'Author', _id: string, name: string }, category?: { __typename?: 'Tag', _id: string, name: string } | null, artist?: { __typename?: 'Author', name: string, _id: string } | null, createdBy: { __typename?: 'User', _id: string }, genres: Array<{ __typename?: 'Tag', name: string, _id: string }> } };

export type GetComicsCreatedByUserQueryVariables = Exact<{
  userId: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetComicsCreatedByUserQuery = { __typename?: 'Query', comics: Array<{ __typename?: 'Comic', _id: string, slug: string, name: string, chapterCount: number, updatedAt: any, followCount?: number | null, totalViewCount: number, imageCoverUrl: string, status: string, author: { __typename?: 'Author', name: string }, category?: { __typename?: 'Tag', name: string } | null, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null } | null }> };

export type GetRecentComicsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetRecentComicsQuery = { __typename?: 'Query', getRecentComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }> };

export type GetTopComicsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopComicsQuery = { __typename?: 'Query', getTopComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string } }> };

export type GetAllHistoriesQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetAllHistoriesQuery = { __typename?: 'Query', histories: Array<{ __typename?: 'ReadingHistory', createdAt: any, chapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, _id: string, comic: { __typename?: 'Comic', name: string, slug: string, imageCoverUrl: string } } | null }> };

export type FindAllTagQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllTagQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', _id: string, name: string, type: string, description?: string | null }> };

export type GetTrendingComicsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTrendingComicsQuery = { __typename?: 'Query', TopFollow: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }>, TopWeek: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }>, TopMonth: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }>, TopYear: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }>, Newest: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }> };

export type GetTopFollowQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopFollowQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }> };

export type GetTopWeekQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopWeekQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }> };

export type GetTopMonthQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopMonthQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }> };

export type GetTopYearQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopYearQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }> };

export type GetNewestQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetNewestQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', _id: string, name: string } | null, author: { __typename?: 'Author', name: string, _id: string } }> };

export type FindAllUsersQueryVariables = Exact<{
  keywords: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type FindAllUsersQuery = { __typename?: 'Query', users: { __typename?: 'UserQueryDto', count: number, users: Array<{ __typename?: 'User', _id: string, avatarUrl?: string | null, email: string, displayName: string, role: number, username: string, createdAt: any, description?: string | null }> } };

export type GetUserByIdQueryVariables = Exact<{
  input: FindUserDto;
}>;


export type GetUserByIdQuery = { __typename?: 'Query', user: { __typename?: 'User', _id: string, avatarUrl?: string | null, createdAt: any, description?: string | null, displayName: string, email: string, role: number, username: string } };


export const CreateAuthorDocument = gql`
    mutation createAuthor($createAuthorInput: CreateAuthorDto!) {
  createAuthor(createAuthorInput: $createAuthorInput) {
    _id
  }
}
    `;
export type CreateAuthorMutationFn = Apollo.MutationFunction<CreateAuthorMutation, CreateAuthorMutationVariables>;

/**
 * __useCreateAuthorMutation__
 *
 * To run a mutation, you first call `useCreateAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAuthorMutation, { data, loading, error }] = useCreateAuthorMutation({
 *   variables: {
 *      createAuthorInput: // value for 'createAuthorInput'
 *   },
 * });
 */
export function useCreateAuthorMutation(baseOptions?: Apollo.MutationHookOptions<CreateAuthorMutation, CreateAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAuthorMutation, CreateAuthorMutationVariables>(CreateAuthorDocument, options);
      }
export type CreateAuthorMutationHookResult = ReturnType<typeof useCreateAuthorMutation>;
export type CreateAuthorMutationResult = Apollo.MutationResult<CreateAuthorMutation>;
export type CreateAuthorMutationOptions = Apollo.BaseMutationOptions<CreateAuthorMutation, CreateAuthorMutationVariables>;
export const UpdateAuthorDocument = gql`
    mutation UpdateAuthor($UpdateAuthorInput: UpdateAuthorDto!, $id: String!) {
  updateAuthor(updateAuthorInput: $UpdateAuthorInput, id: $id) {
    _id
    name
    description
  }
}
    `;
export type UpdateAuthorMutationFn = Apollo.MutationFunction<UpdateAuthorMutation, UpdateAuthorMutationVariables>;

/**
 * __useUpdateAuthorMutation__
 *
 * To run a mutation, you first call `useUpdateAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAuthorMutation, { data, loading, error }] = useUpdateAuthorMutation({
 *   variables: {
 *      UpdateAuthorInput: // value for 'UpdateAuthorInput'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateAuthorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAuthorMutation, UpdateAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAuthorMutation, UpdateAuthorMutationVariables>(UpdateAuthorDocument, options);
      }
export type UpdateAuthorMutationHookResult = ReturnType<typeof useUpdateAuthorMutation>;
export type UpdateAuthorMutationResult = Apollo.MutationResult<UpdateAuthorMutation>;
export type UpdateAuthorMutationOptions = Apollo.BaseMutationOptions<UpdateAuthorMutation, UpdateAuthorMutationVariables>;
export const DeleteAuthorDocument = gql`
    mutation deleteAuthor($id: String!) {
  deleteAuthor(id: $id)
}
    `;
export type DeleteAuthorMutationFn = Apollo.MutationFunction<DeleteAuthorMutation, DeleteAuthorMutationVariables>;

/**
 * __useDeleteAuthorMutation__
 *
 * To run a mutation, you first call `useDeleteAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAuthorMutation, { data, loading, error }] = useDeleteAuthorMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAuthorMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAuthorMutation, DeleteAuthorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAuthorMutation, DeleteAuthorMutationVariables>(DeleteAuthorDocument, options);
      }
export type DeleteAuthorMutationHookResult = ReturnType<typeof useDeleteAuthorMutation>;
export type DeleteAuthorMutationResult = Apollo.MutationResult<DeleteAuthorMutation>;
export type DeleteAuthorMutationOptions = Apollo.BaseMutationOptions<DeleteAuthorMutation, DeleteAuthorMutationVariables>;
export const CreateChapterDocument = gql`
    mutation createChapter($input: CreateChapterDto!) {
  createChapter(input: $input) {
    order
  }
}
    `;
export type CreateChapterMutationFn = Apollo.MutationFunction<CreateChapterMutation, CreateChapterMutationVariables>;

/**
 * __useCreateChapterMutation__
 *
 * To run a mutation, you first call `useCreateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChapterMutation, { data, loading, error }] = useCreateChapterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChapterMutation(baseOptions?: Apollo.MutationHookOptions<CreateChapterMutation, CreateChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChapterMutation, CreateChapterMutationVariables>(CreateChapterDocument, options);
      }
export type CreateChapterMutationHookResult = ReturnType<typeof useCreateChapterMutation>;
export type CreateChapterMutationResult = Apollo.MutationResult<CreateChapterMutation>;
export type CreateChapterMutationOptions = Apollo.BaseMutationOptions<CreateChapterMutation, CreateChapterMutationVariables>;
export const CreateComicDocument = gql`
    mutation createComic($input: CreateComicInput!) {
  createComic(input: $input) {
    name
  }
}
    `;
export type CreateComicMutationFn = Apollo.MutationFunction<CreateComicMutation, CreateComicMutationVariables>;

/**
 * __useCreateComicMutation__
 *
 * To run a mutation, you first call `useCreateComicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComicMutation, { data, loading, error }] = useCreateComicMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateComicMutation(baseOptions?: Apollo.MutationHookOptions<CreateComicMutation, CreateComicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateComicMutation, CreateComicMutationVariables>(CreateComicDocument, options);
      }
export type CreateComicMutationHookResult = ReturnType<typeof useCreateComicMutation>;
export type CreateComicMutationResult = Apollo.MutationResult<CreateComicMutation>;
export type CreateComicMutationOptions = Apollo.BaseMutationOptions<CreateComicMutation, CreateComicMutationVariables>;
export const UpdateComicDocument = gql`
    mutation updateComic($id: String!, $input: CreateComicInput!) {
  updateComic(id: $id, input: $input) {
    name
  }
}
    `;
export type UpdateComicMutationFn = Apollo.MutationFunction<UpdateComicMutation, UpdateComicMutationVariables>;

/**
 * __useUpdateComicMutation__
 *
 * To run a mutation, you first call `useUpdateComicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComicMutation, { data, loading, error }] = useUpdateComicMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateComicMutation(baseOptions?: Apollo.MutationHookOptions<UpdateComicMutation, UpdateComicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateComicMutation, UpdateComicMutationVariables>(UpdateComicDocument, options);
      }
export type UpdateComicMutationHookResult = ReturnType<typeof useUpdateComicMutation>;
export type UpdateComicMutationResult = Apollo.MutationResult<UpdateComicMutation>;
export type UpdateComicMutationOptions = Apollo.BaseMutationOptions<UpdateComicMutation, UpdateComicMutationVariables>;
export const UpdateChaptersOrderDocument = gql`
    mutation updateChaptersOrder($input: UpdateChaptersOrderInput!) {
  data: updateChaptersOrder(input: $input) {
    order
  }
}
    `;
export type UpdateChaptersOrderMutationFn = Apollo.MutationFunction<UpdateChaptersOrderMutation, UpdateChaptersOrderMutationVariables>;

/**
 * __useUpdateChaptersOrderMutation__
 *
 * To run a mutation, you first call `useUpdateChaptersOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChaptersOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChaptersOrderMutation, { data, loading, error }] = useUpdateChaptersOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateChaptersOrderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChaptersOrderMutation, UpdateChaptersOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChaptersOrderMutation, UpdateChaptersOrderMutationVariables>(UpdateChaptersOrderDocument, options);
      }
export type UpdateChaptersOrderMutationHookResult = ReturnType<typeof useUpdateChaptersOrderMutation>;
export type UpdateChaptersOrderMutationResult = Apollo.MutationResult<UpdateChaptersOrderMutation>;
export type UpdateChaptersOrderMutationOptions = Apollo.BaseMutationOptions<UpdateChaptersOrderMutation, UpdateChaptersOrderMutationVariables>;
export const DeleteComicDocument = gql`
    mutation deleteComic($id: String!) {
  deleteComic(id: $id)
}
    `;
export type DeleteComicMutationFn = Apollo.MutationFunction<DeleteComicMutation, DeleteComicMutationVariables>;

/**
 * __useDeleteComicMutation__
 *
 * To run a mutation, you first call `useDeleteComicMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComicMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComicMutation, { data, loading, error }] = useDeleteComicMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteComicMutation(baseOptions?: Apollo.MutationHookOptions<DeleteComicMutation, DeleteComicMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteComicMutation, DeleteComicMutationVariables>(DeleteComicDocument, options);
      }
export type DeleteComicMutationHookResult = ReturnType<typeof useDeleteComicMutation>;
export type DeleteComicMutationResult = Apollo.MutationResult<DeleteComicMutation>;
export type DeleteComicMutationOptions = Apollo.BaseMutationOptions<DeleteComicMutation, DeleteComicMutationVariables>;
export const RemoveHistoryDocument = gql`
    mutation removeHistory($chapterId: String!) {
  removeHistory(chapterId: $chapterId)
}
    `;
export type RemoveHistoryMutationFn = Apollo.MutationFunction<RemoveHistoryMutation, RemoveHistoryMutationVariables>;

/**
 * __useRemoveHistoryMutation__
 *
 * To run a mutation, you first call `useRemoveHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeHistoryMutation, { data, loading, error }] = useRemoveHistoryMutation({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useRemoveHistoryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveHistoryMutation, RemoveHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveHistoryMutation, RemoveHistoryMutationVariables>(RemoveHistoryDocument, options);
      }
export type RemoveHistoryMutationHookResult = ReturnType<typeof useRemoveHistoryMutation>;
export type RemoveHistoryMutationResult = Apollo.MutationResult<RemoveHistoryMutation>;
export type RemoveHistoryMutationOptions = Apollo.BaseMutationOptions<RemoveHistoryMutation, RemoveHistoryMutationVariables>;
export const RemoveAllHistoryDocument = gql`
    mutation removeAllHistory {
  removeAllHistories
}
    `;
export type RemoveAllHistoryMutationFn = Apollo.MutationFunction<RemoveAllHistoryMutation, RemoveAllHistoryMutationVariables>;

/**
 * __useRemoveAllHistoryMutation__
 *
 * To run a mutation, you first call `useRemoveAllHistoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAllHistoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAllHistoryMutation, { data, loading, error }] = useRemoveAllHistoryMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveAllHistoryMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAllHistoryMutation, RemoveAllHistoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAllHistoryMutation, RemoveAllHistoryMutationVariables>(RemoveAllHistoryDocument, options);
      }
export type RemoveAllHistoryMutationHookResult = ReturnType<typeof useRemoveAllHistoryMutation>;
export type RemoveAllHistoryMutationResult = Apollo.MutationResult<RemoveAllHistoryMutation>;
export type RemoveAllHistoryMutationOptions = Apollo.BaseMutationOptions<RemoveAllHistoryMutation, RemoveAllHistoryMutationVariables>;
export const CreateTagDocument = gql`
    mutation createTag($createTagInput: CreateTagDto!) {
  createTag(createTagInput: $createTagInput) {
    _id
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      createTagInput: // value for 'createTagInput'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const UpdateTagDocument = gql`
    mutation UpdateTag($UpdateTagInput: UpdateTagDto!, $id: String!) {
  updateTag(updateTagInput: $UpdateTagInput, id: $id) {
    _id
    name
    description
  }
}
    `;
export type UpdateTagMutationFn = Apollo.MutationFunction<UpdateTagMutation, UpdateTagMutationVariables>;

/**
 * __useUpdateTagMutation__
 *
 * To run a mutation, you first call `useUpdateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTagMutation, { data, loading, error }] = useUpdateTagMutation({
 *   variables: {
 *      UpdateTagInput: // value for 'UpdateTagInput'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateTagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTagMutation, UpdateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTagMutation, UpdateTagMutationVariables>(UpdateTagDocument, options);
      }
export type UpdateTagMutationHookResult = ReturnType<typeof useUpdateTagMutation>;
export type UpdateTagMutationResult = Apollo.MutationResult<UpdateTagMutation>;
export type UpdateTagMutationOptions = Apollo.BaseMutationOptions<UpdateTagMutation, UpdateTagMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($id: String!, $updateUserInput: UpdateUserDto!) {
  updateUser(id: $id, updateUserInput: $updateUserInput) {
    _id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateImportantUserInfoDocument = gql`
    mutation updateImportantUserInfo($updateUserInput: UpdateImportantInfoDTO!) {
  updateImportantInfo(input: $updateUserInput) {
    _id
  }
}
    `;
export type UpdateImportantUserInfoMutationFn = Apollo.MutationFunction<UpdateImportantUserInfoMutation, UpdateImportantUserInfoMutationVariables>;

/**
 * __useUpdateImportantUserInfoMutation__
 *
 * To run a mutation, you first call `useUpdateImportantUserInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateImportantUserInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateImportantUserInfoMutation, { data, loading, error }] = useUpdateImportantUserInfoMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateImportantUserInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateImportantUserInfoMutation, UpdateImportantUserInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateImportantUserInfoMutation, UpdateImportantUserInfoMutationVariables>(UpdateImportantUserInfoDocument, options);
      }
export type UpdateImportantUserInfoMutationHookResult = ReturnType<typeof useUpdateImportantUserInfoMutation>;
export type UpdateImportantUserInfoMutationResult = Apollo.MutationResult<UpdateImportantUserInfoMutation>;
export type UpdateImportantUserInfoMutationOptions = Apollo.BaseMutationOptions<UpdateImportantUserInfoMutation, UpdateImportantUserInfoMutationVariables>;
export const SearchAuthorDocument = gql`
    query searchAuthor($keyword: String, $limit: Float, $page: Float) {
  searchAuthor(keyword: $keyword, limit: $limit, page: $page) {
    authors {
      _id
      name
      description
      createdAt
    }
    count
  }
}
    `;

/**
 * __useSearchAuthorQuery__
 *
 * To run a query within a React component, call `useSearchAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAuthorQuery({
 *   variables: {
 *      keyword: // value for 'keyword'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useSearchAuthorQuery(baseOptions?: Apollo.QueryHookOptions<SearchAuthorQuery, SearchAuthorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAuthorQuery, SearchAuthorQueryVariables>(SearchAuthorDocument, options);
      }
export function useSearchAuthorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAuthorQuery, SearchAuthorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAuthorQuery, SearchAuthorQueryVariables>(SearchAuthorDocument, options);
        }
export type SearchAuthorQueryHookResult = ReturnType<typeof useSearchAuthorQuery>;
export type SearchAuthorLazyQueryHookResult = ReturnType<typeof useSearchAuthorLazyQuery>;
export type SearchAuthorQueryResult = Apollo.QueryResult<SearchAuthorQuery, SearchAuthorQueryVariables>;
export const FindAllAuthorsDocument = gql`
    query FindAllAuthors {
  authors {
    _id
    name
  }
}
    `;

/**
 * __useFindAllAuthorsQuery__
 *
 * To run a query within a React component, call `useFindAllAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllAuthorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllAuthorsQuery(baseOptions?: Apollo.QueryHookOptions<FindAllAuthorsQuery, FindAllAuthorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllAuthorsQuery, FindAllAuthorsQueryVariables>(FindAllAuthorsDocument, options);
      }
export function useFindAllAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllAuthorsQuery, FindAllAuthorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllAuthorsQuery, FindAllAuthorsQueryVariables>(FindAllAuthorsDocument, options);
        }
export type FindAllAuthorsQueryHookResult = ReturnType<typeof useFindAllAuthorsQuery>;
export type FindAllAuthorsLazyQueryHookResult = ReturnType<typeof useFindAllAuthorsLazyQuery>;
export type FindAllAuthorsQueryResult = Apollo.QueryResult<FindAllAuthorsQuery, FindAllAuthorsQueryVariables>;
export const GetAllChaptersDocument = gql`
    query getAllChapters($comicId: String!) {
  getAllChapters(comicId: $comicId) {
    _id
    chapterNumber
    createdAt
    order
    name
  }
}
    `;

/**
 * __useGetAllChaptersQuery__
 *
 * To run a query within a React component, call `useGetAllChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllChaptersQuery({
 *   variables: {
 *      comicId: // value for 'comicId'
 *   },
 * });
 */
export function useGetAllChaptersQuery(baseOptions: Apollo.QueryHookOptions<GetAllChaptersQuery, GetAllChaptersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllChaptersQuery, GetAllChaptersQueryVariables>(GetAllChaptersDocument, options);
      }
export function useGetAllChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllChaptersQuery, GetAllChaptersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllChaptersQuery, GetAllChaptersQueryVariables>(GetAllChaptersDocument, options);
        }
export type GetAllChaptersQueryHookResult = ReturnType<typeof useGetAllChaptersQuery>;
export type GetAllChaptersLazyQueryHookResult = ReturnType<typeof useGetAllChaptersLazyQuery>;
export type GetAllChaptersQueryResult = Apollo.QueryResult<GetAllChaptersQuery, GetAllChaptersQueryVariables>;
export const GetAllChaptersAdminDocument = gql`
    query getAllChaptersAdmin($comicId: String!) {
  chapters: getAllChapters(comicId: $comicId) {
    _id
    chapterNumber
    createdAt
    order
    name
    updatedAt
    pageCount
  }
}
    `;

/**
 * __useGetAllChaptersAdminQuery__
 *
 * To run a query within a React component, call `useGetAllChaptersAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllChaptersAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllChaptersAdminQuery({
 *   variables: {
 *      comicId: // value for 'comicId'
 *   },
 * });
 */
export function useGetAllChaptersAdminQuery(baseOptions: Apollo.QueryHookOptions<GetAllChaptersAdminQuery, GetAllChaptersAdminQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllChaptersAdminQuery, GetAllChaptersAdminQueryVariables>(GetAllChaptersAdminDocument, options);
      }
export function useGetAllChaptersAdminLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllChaptersAdminQuery, GetAllChaptersAdminQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllChaptersAdminQuery, GetAllChaptersAdminQueryVariables>(GetAllChaptersAdminDocument, options);
        }
export type GetAllChaptersAdminQueryHookResult = ReturnType<typeof useGetAllChaptersAdminQuery>;
export type GetAllChaptersAdminLazyQueryHookResult = ReturnType<typeof useGetAllChaptersAdminLazyQuery>;
export type GetAllChaptersAdminQueryResult = Apollo.QueryResult<GetAllChaptersAdminQuery, GetAllChaptersAdminQueryVariables>;
export const GetChapterByIdDocument = gql`
    query getChapterById($chapterId: String!) {
  getChapterById(chapterId: $chapterId) {
    chapterNumber
    nextChapter {
      chapterNumber
    }
    previousChapter {
      chapterNumber
    }
    order
    comic {
      name
      slug
      _id
    }
    pages {
      order
      url
    }
    name
  }
}
    `;

/**
 * __useGetChapterByIdQuery__
 *
 * To run a query within a React component, call `useGetChapterByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChapterByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChapterByIdQuery({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useGetChapterByIdQuery(baseOptions: Apollo.QueryHookOptions<GetChapterByIdQuery, GetChapterByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetChapterByIdQuery, GetChapterByIdQueryVariables>(GetChapterByIdDocument, options);
      }
export function useGetChapterByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChapterByIdQuery, GetChapterByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetChapterByIdQuery, GetChapterByIdQueryVariables>(GetChapterByIdDocument, options);
        }
export type GetChapterByIdQueryHookResult = ReturnType<typeof useGetChapterByIdQuery>;
export type GetChapterByIdLazyQueryHookResult = ReturnType<typeof useGetChapterByIdLazyQuery>;
export type GetChapterByIdQueryResult = Apollo.QueryResult<GetChapterByIdQuery, GetChapterByIdQueryVariables>;
export const GetLastedChapterByComicIdDocument = gql`
    query getLastedChapterByComicId($comicId: String!) {
  getLastedChapterByComicId(comicId: $comicId) {
    _id
    chapterNumber
    createdAt
    order
    name
  }
}
    `;

/**
 * __useGetLastedChapterByComicIdQuery__
 *
 * To run a query within a React component, call `useGetLastedChapterByComicIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLastedChapterByComicIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLastedChapterByComicIdQuery({
 *   variables: {
 *      comicId: // value for 'comicId'
 *   },
 * });
 */
export function useGetLastedChapterByComicIdQuery(baseOptions: Apollo.QueryHookOptions<GetLastedChapterByComicIdQuery, GetLastedChapterByComicIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLastedChapterByComicIdQuery, GetLastedChapterByComicIdQueryVariables>(GetLastedChapterByComicIdDocument, options);
      }
export function useGetLastedChapterByComicIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLastedChapterByComicIdQuery, GetLastedChapterByComicIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLastedChapterByComicIdQuery, GetLastedChapterByComicIdQueryVariables>(GetLastedChapterByComicIdDocument, options);
        }
export type GetLastedChapterByComicIdQueryHookResult = ReturnType<typeof useGetLastedChapterByComicIdQuery>;
export type GetLastedChapterByComicIdLazyQueryHookResult = ReturnType<typeof useGetLastedChapterByComicIdLazyQuery>;
export type GetLastedChapterByComicIdQueryResult = Apollo.QueryResult<GetLastedChapterByComicIdQuery, GetLastedChapterByComicIdQueryVariables>;
export const GetGeneralInfoDocument = gql`
    query GetGeneralInfo {
  authors {
    name
    _id
  }
  genres: getGenres {
    name
    _id
  }
  categories: getCategories {
    name
    _id
  }
}
    `;

/**
 * __useGetGeneralInfoQuery__
 *
 * To run a query within a React component, call `useGetGeneralInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGeneralInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGeneralInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGeneralInfoQuery(baseOptions?: Apollo.QueryHookOptions<GetGeneralInfoQuery, GetGeneralInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGeneralInfoQuery, GetGeneralInfoQueryVariables>(GetGeneralInfoDocument, options);
      }
export function useGetGeneralInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGeneralInfoQuery, GetGeneralInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGeneralInfoQuery, GetGeneralInfoQueryVariables>(GetGeneralInfoDocument, options);
        }
export type GetGeneralInfoQueryHookResult = ReturnType<typeof useGetGeneralInfoQuery>;
export type GetGeneralInfoLazyQueryHookResult = ReturnType<typeof useGetGeneralInfoLazyQuery>;
export type GetGeneralInfoQueryResult = Apollo.QueryResult<GetGeneralInfoQuery, GetGeneralInfoQueryVariables>;
export const GetComicBySlugDocument = gql`
    query getComicBySlug($slug: String!) {
  getComicBySlug(slug: $slug) {
    _id
    artist {
      name
      _id
    }
    author {
      name
      _id
    }
    category {
      name
      _id
    }
    genres {
      name
      _id
    }
    createdAt
    updatedAt
    description
    followCount
    totalViewCount
    imageCoverUrl
    imageThumbUrl
    name
    createdBy {
      _id
      description
      avatarUrl
      displayName
    }
    otherNames
    status
  }
}
    `;

/**
 * __useGetComicBySlugQuery__
 *
 * To run a query within a React component, call `useGetComicBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComicBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComicBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetComicBySlugQuery(baseOptions: Apollo.QueryHookOptions<GetComicBySlugQuery, GetComicBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComicBySlugQuery, GetComicBySlugQueryVariables>(GetComicBySlugDocument, options);
      }
export function useGetComicBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComicBySlugQuery, GetComicBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComicBySlugQuery, GetComicBySlugQueryVariables>(GetComicBySlugDocument, options);
        }
export type GetComicBySlugQueryHookResult = ReturnType<typeof useGetComicBySlugQuery>;
export type GetComicBySlugLazyQueryHookResult = ReturnType<typeof useGetComicBySlugLazyQuery>;
export type GetComicBySlugQueryResult = Apollo.QueryResult<GetComicBySlugQuery, GetComicBySlugQueryVariables>;
export const GetComicByIdDocument = gql`
    query getComicById($id: String!) {
  comic: getComicById(id: $id) {
    _id
    author {
      _id
      name
    }
    name
    otherNames
    category {
      _id
      name
    }
    artist {
      name
      _id
    }
    createdBy {
      _id
    }
    createdAt
    updatedAt
    description
    imageCoverUrl
    imageThumbUrl
    status
    slug
    officeUrl
    genres {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetComicByIdQuery__
 *
 * To run a query within a React component, call `useGetComicByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComicByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComicByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetComicByIdQuery(baseOptions: Apollo.QueryHookOptions<GetComicByIdQuery, GetComicByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComicByIdQuery, GetComicByIdQueryVariables>(GetComicByIdDocument, options);
      }
export function useGetComicByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComicByIdQuery, GetComicByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComicByIdQuery, GetComicByIdQueryVariables>(GetComicByIdDocument, options);
        }
export type GetComicByIdQueryHookResult = ReturnType<typeof useGetComicByIdQuery>;
export type GetComicByIdLazyQueryHookResult = ReturnType<typeof useGetComicByIdLazyQuery>;
export type GetComicByIdQueryResult = Apollo.QueryResult<GetComicByIdQuery, GetComicByIdQueryVariables>;
export const GetComicsCreatedByUserDocument = gql`
    query GetComicsCreatedByUser($userId: String!, $limit: Float, $page: Float) {
  comics: getContributedComics(userId: $userId, limit: $limit, page: $page) {
    _id
    slug
    name
    author {
      name
    }
    category {
      name
    }
    chapterCount
    updatedAt
    followCount
    totalViewCount
    imageCoverUrl
    name
    recentChapter {
      chapterNumber
      name
    }
    status
  }
}
    `;

/**
 * __useGetComicsCreatedByUserQuery__
 *
 * To run a query within a React component, call `useGetComicsCreatedByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComicsCreatedByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComicsCreatedByUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetComicsCreatedByUserQuery(baseOptions: Apollo.QueryHookOptions<GetComicsCreatedByUserQuery, GetComicsCreatedByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetComicsCreatedByUserQuery, GetComicsCreatedByUserQueryVariables>(GetComicsCreatedByUserDocument, options);
      }
export function useGetComicsCreatedByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetComicsCreatedByUserQuery, GetComicsCreatedByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetComicsCreatedByUserQuery, GetComicsCreatedByUserQueryVariables>(GetComicsCreatedByUserDocument, options);
        }
export type GetComicsCreatedByUserQueryHookResult = ReturnType<typeof useGetComicsCreatedByUserQuery>;
export type GetComicsCreatedByUserLazyQueryHookResult = ReturnType<typeof useGetComicsCreatedByUserLazyQuery>;
export type GetComicsCreatedByUserQueryResult = Apollo.QueryResult<GetComicsCreatedByUserQuery, GetComicsCreatedByUserQueryVariables>;
export const GetRecentComicsDocument = gql`
    query GetRecentComics($limit: Float, $page: Float) {
  getRecentComics(limit: $limit, page: $page) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetRecentComicsQuery__
 *
 * To run a query within a React component, call `useGetRecentComicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRecentComicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRecentComicsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetRecentComicsQuery(baseOptions?: Apollo.QueryHookOptions<GetRecentComicsQuery, GetRecentComicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRecentComicsQuery, GetRecentComicsQueryVariables>(GetRecentComicsDocument, options);
      }
export function useGetRecentComicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRecentComicsQuery, GetRecentComicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRecentComicsQuery, GetRecentComicsQueryVariables>(GetRecentComicsDocument, options);
        }
export type GetRecentComicsQueryHookResult = ReturnType<typeof useGetRecentComicsQuery>;
export type GetRecentComicsLazyQueryHookResult = ReturnType<typeof useGetRecentComicsLazyQuery>;
export type GetRecentComicsQueryResult = Apollo.QueryResult<GetRecentComicsQuery, GetRecentComicsQueryVariables>;
export const GetTopComicsDocument = gql`
    query GetTopComics($limit: Float, $page: Float) {
  getTopComics(limit: $limit, page: $page) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
    }
  }
}
    `;

/**
 * __useGetTopComicsQuery__
 *
 * To run a query within a React component, call `useGetTopComicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopComicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopComicsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetTopComicsQuery(baseOptions?: Apollo.QueryHookOptions<GetTopComicsQuery, GetTopComicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopComicsQuery, GetTopComicsQueryVariables>(GetTopComicsDocument, options);
      }
export function useGetTopComicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopComicsQuery, GetTopComicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopComicsQuery, GetTopComicsQueryVariables>(GetTopComicsDocument, options);
        }
export type GetTopComicsQueryHookResult = ReturnType<typeof useGetTopComicsQuery>;
export type GetTopComicsLazyQueryHookResult = ReturnType<typeof useGetTopComicsLazyQuery>;
export type GetTopComicsQueryResult = Apollo.QueryResult<GetTopComicsQuery, GetTopComicsQueryVariables>;
export const GetAllHistoriesDocument = gql`
    query getAllHistories($userId: String!) {
  histories: getAllHistories(userId: $userId) {
    chapter {
      chapterNumber
      name
      _id
      comic {
        name
        slug
        imageCoverUrl
      }
    }
    createdAt
  }
}
    `;

/**
 * __useGetAllHistoriesQuery__
 *
 * To run a query within a React component, call `useGetAllHistoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllHistoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllHistoriesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetAllHistoriesQuery(baseOptions: Apollo.QueryHookOptions<GetAllHistoriesQuery, GetAllHistoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllHistoriesQuery, GetAllHistoriesQueryVariables>(GetAllHistoriesDocument, options);
      }
export function useGetAllHistoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllHistoriesQuery, GetAllHistoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllHistoriesQuery, GetAllHistoriesQueryVariables>(GetAllHistoriesDocument, options);
        }
export type GetAllHistoriesQueryHookResult = ReturnType<typeof useGetAllHistoriesQuery>;
export type GetAllHistoriesLazyQueryHookResult = ReturnType<typeof useGetAllHistoriesLazyQuery>;
export type GetAllHistoriesQueryResult = Apollo.QueryResult<GetAllHistoriesQuery, GetAllHistoriesQueryVariables>;
export const FindAllTagDocument = gql`
    query findAllTag {
  tags {
    _id
    name
    type
    description
  }
}
    `;

/**
 * __useFindAllTagQuery__
 *
 * To run a query within a React component, call `useFindAllTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllTagQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllTagQuery(baseOptions?: Apollo.QueryHookOptions<FindAllTagQuery, FindAllTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllTagQuery, FindAllTagQueryVariables>(FindAllTagDocument, options);
      }
export function useFindAllTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllTagQuery, FindAllTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllTagQuery, FindAllTagQueryVariables>(FindAllTagDocument, options);
        }
export type FindAllTagQueryHookResult = ReturnType<typeof useFindAllTagQuery>;
export type FindAllTagLazyQueryHookResult = ReturnType<typeof useFindAllTagLazyQuery>;
export type FindAllTagQueryResult = Apollo.QueryResult<FindAllTagQuery, FindAllTagQueryVariables>;
export const GetTrendingComicsDocument = gql`
    query getTrendingComics($page: Float, $limit: Float) {
  TopFollow: getTrendingComics(
    input: {page: $page, limit: $limit, type: "totalViewCount"}
  ) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
  TopWeek: getTrendingComics(
    input: {page: $page, limit: $limit, type: "weekViewCount"}
  ) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
  TopMonth: getTrendingComics(
    input: {page: $page, limit: $limit, type: "monthViewCount"}
  ) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
  TopYear: getTrendingComics(
    input: {page: $page, limit: $limit, type: "yearViewCount"}
  ) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
  Newest: getTrendingComics(
    input: {page: $page, limit: $limit, type: "updatedAt"}
  ) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetTrendingComicsQuery__
 *
 * To run a query within a React component, call `useGetTrendingComicsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrendingComicsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrendingComicsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTrendingComicsQuery(baseOptions?: Apollo.QueryHookOptions<GetTrendingComicsQuery, GetTrendingComicsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrendingComicsQuery, GetTrendingComicsQueryVariables>(GetTrendingComicsDocument, options);
      }
export function useGetTrendingComicsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrendingComicsQuery, GetTrendingComicsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrendingComicsQuery, GetTrendingComicsQueryVariables>(GetTrendingComicsDocument, options);
        }
export type GetTrendingComicsQueryHookResult = ReturnType<typeof useGetTrendingComicsQuery>;
export type GetTrendingComicsLazyQueryHookResult = ReturnType<typeof useGetTrendingComicsLazyQuery>;
export type GetTrendingComicsQueryResult = Apollo.QueryResult<GetTrendingComicsQuery, GetTrendingComicsQueryVariables>;
export const GetTopFollowDocument = gql`
    query getTopFollow($page: Float, $limit: Float) {
  getTrendingComics(input: {page: $page, limit: $limit, type: "totalViewCount"}) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetTopFollowQuery__
 *
 * To run a query within a React component, call `useGetTopFollowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopFollowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopFollowQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTopFollowQuery(baseOptions?: Apollo.QueryHookOptions<GetTopFollowQuery, GetTopFollowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopFollowQuery, GetTopFollowQueryVariables>(GetTopFollowDocument, options);
      }
export function useGetTopFollowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopFollowQuery, GetTopFollowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopFollowQuery, GetTopFollowQueryVariables>(GetTopFollowDocument, options);
        }
export type GetTopFollowQueryHookResult = ReturnType<typeof useGetTopFollowQuery>;
export type GetTopFollowLazyQueryHookResult = ReturnType<typeof useGetTopFollowLazyQuery>;
export type GetTopFollowQueryResult = Apollo.QueryResult<GetTopFollowQuery, GetTopFollowQueryVariables>;
export const GetTopWeekDocument = gql`
    query getTopWeek($page: Float, $limit: Float) {
  getTrendingComics(input: {page: $page, limit: $limit, type: "weekViewCount"}) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetTopWeekQuery__
 *
 * To run a query within a React component, call `useGetTopWeekQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopWeekQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopWeekQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTopWeekQuery(baseOptions?: Apollo.QueryHookOptions<GetTopWeekQuery, GetTopWeekQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopWeekQuery, GetTopWeekQueryVariables>(GetTopWeekDocument, options);
      }
export function useGetTopWeekLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopWeekQuery, GetTopWeekQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopWeekQuery, GetTopWeekQueryVariables>(GetTopWeekDocument, options);
        }
export type GetTopWeekQueryHookResult = ReturnType<typeof useGetTopWeekQuery>;
export type GetTopWeekLazyQueryHookResult = ReturnType<typeof useGetTopWeekLazyQuery>;
export type GetTopWeekQueryResult = Apollo.QueryResult<GetTopWeekQuery, GetTopWeekQueryVariables>;
export const GetTopMonthDocument = gql`
    query getTopMonth($page: Float, $limit: Float) {
  getTrendingComics(input: {page: $page, limit: $limit, type: "monthViewCount"}) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetTopMonthQuery__
 *
 * To run a query within a React component, call `useGetTopMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopMonthQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTopMonthQuery(baseOptions?: Apollo.QueryHookOptions<GetTopMonthQuery, GetTopMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopMonthQuery, GetTopMonthQueryVariables>(GetTopMonthDocument, options);
      }
export function useGetTopMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopMonthQuery, GetTopMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopMonthQuery, GetTopMonthQueryVariables>(GetTopMonthDocument, options);
        }
export type GetTopMonthQueryHookResult = ReturnType<typeof useGetTopMonthQuery>;
export type GetTopMonthLazyQueryHookResult = ReturnType<typeof useGetTopMonthLazyQuery>;
export type GetTopMonthQueryResult = Apollo.QueryResult<GetTopMonthQuery, GetTopMonthQueryVariables>;
export const GetTopYearDocument = gql`
    query getTopYear($page: Float, $limit: Float) {
  getTrendingComics(input: {page: $page, limit: $limit, type: "yearViewCount"}) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetTopYearQuery__
 *
 * To run a query within a React component, call `useGetTopYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTopYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTopYearQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetTopYearQuery(baseOptions?: Apollo.QueryHookOptions<GetTopYearQuery, GetTopYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTopYearQuery, GetTopYearQueryVariables>(GetTopYearDocument, options);
      }
export function useGetTopYearLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTopYearQuery, GetTopYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTopYearQuery, GetTopYearQueryVariables>(GetTopYearDocument, options);
        }
export type GetTopYearQueryHookResult = ReturnType<typeof useGetTopYearQuery>;
export type GetTopYearLazyQueryHookResult = ReturnType<typeof useGetTopYearLazyQuery>;
export type GetTopYearQueryResult = Apollo.QueryResult<GetTopYearQuery, GetTopYearQueryVariables>;
export const GetNewestDocument = gql`
    query getNewest($page: Float, $limit: Float) {
  getTrendingComics(input: {page: $page, limit: $limit, type: "updatedAt"}) {
    _id
    imageThumbUrl
    imageCoverUrl
    name
    description
    slug
    recentChapter {
      chapterNumber
      name
      order
      _id
      createdAt
      updatedAt
    }
    category {
      _id
      name
    }
    author {
      name
      _id
    }
  }
}
    `;

/**
 * __useGetNewestQuery__
 *
 * To run a query within a React component, call `useGetNewestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNewestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNewestQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetNewestQuery(baseOptions?: Apollo.QueryHookOptions<GetNewestQuery, GetNewestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNewestQuery, GetNewestQueryVariables>(GetNewestDocument, options);
      }
export function useGetNewestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNewestQuery, GetNewestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNewestQuery, GetNewestQueryVariables>(GetNewestDocument, options);
        }
export type GetNewestQueryHookResult = ReturnType<typeof useGetNewestQuery>;
export type GetNewestLazyQueryHookResult = ReturnType<typeof useGetNewestLazyQuery>;
export type GetNewestQueryResult = Apollo.QueryResult<GetNewestQuery, GetNewestQueryVariables>;
export const FindAllUsersDocument = gql`
    query findAllUsers($keywords: String!, $limit: Float, $page: Float) {
  users(keywords: $keywords, limit: $limit, page: $page) {
    count
    users {
      _id
      avatarUrl
      email
      displayName
      role
      username
      createdAt
      description
    }
  }
}
    `;

/**
 * __useFindAllUsersQuery__
 *
 * To run a query within a React component, call `useFindAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllUsersQuery({
 *   variables: {
 *      keywords: // value for 'keywords'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useFindAllUsersQuery(baseOptions: Apollo.QueryHookOptions<FindAllUsersQuery, FindAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(FindAllUsersDocument, options);
      }
export function useFindAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllUsersQuery, FindAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllUsersQuery, FindAllUsersQueryVariables>(FindAllUsersDocument, options);
        }
export type FindAllUsersQueryHookResult = ReturnType<typeof useFindAllUsersQuery>;
export type FindAllUsersLazyQueryHookResult = ReturnType<typeof useFindAllUsersLazyQuery>;
export type FindAllUsersQueryResult = Apollo.QueryResult<FindAllUsersQuery, FindAllUsersQueryVariables>;
export const GetUserByIdDocument = gql`
    query getUserById($input: FindUserDto!) {
  user(findUserInput: $input) {
    _id
    avatarUrl
    createdAt
    description
    displayName
    email
    role
    username
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;