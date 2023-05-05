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
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Author = {
  __typename?: 'Author';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Chapter = {
  __typename?: 'Chapter';
  _id: Scalars['String'];
  chapterNumber: Scalars['String'];
  comic: Comic;
  createdAt: Scalars['DateTime'];
  name?: Maybe<Scalars['String']>;
  nextChapter?: Maybe<Chapter>;
  order: Scalars['Float'];
  pageCount: Scalars['Int'];
  pages: Array<Page>;
  previousChapter?: Maybe<Chapter>;
  updatedAt: Scalars['DateTime'];
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
  followCount: Scalars['Float'];
  genres: Array<Tag>;
  imageCoverUrl: Scalars['String'];
  imageThumbUrl: Scalars['String'];
  name: Scalars['String'];
  officeUrl?: Maybe<Scalars['String']>;
  otherNames: Array<Scalars['String']>;
  recentChapter?: Maybe<Chapter>;
  slug: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateAuthorDto = {
  description: Scalars['String'];
  name: Scalars['String'];
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
  createComic: Comic;
  createTag: Tag;
  createUser: User;
  updateAuthor: Author;
  updateChaptersOrder: Array<Chapter>;
  updateComic: Comic;
  updateTag: Tag;
  updateUser: User;
};


export type MutationCreateAuthorArgs = {
  createAuthorInput: CreateAuthorDto;
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

export type Query = {
  __typename?: 'Query';
  author: Author;
  authors: Array<Author>;
  getAllChapters: Array<Chapter>;
  getAllComics: Array<Comic>;
  getAllHistories: Array<ReadingHistory>;
  getCategories: Array<Tag>;
  getChapterById: Chapter;
  getComicById: Comic;
  getComicBySlug: Comic;
  getComicsCreatedByUser: Array<Comic>;
  getGenres: Array<Tag>;
  getLastedChapterByComicId: Chapter;
  getRecentComics: Array<Comic>;
  getTopComics: Array<Comic>;
  getTrendingComics: Array<Comic>;
  tag: Tag;
  tags: Array<Tag>;
  user: User;
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


export type QueryGetComicsCreatedByUserArgs = {
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


export type QueryTagArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  findUserInput: FindUserDto;
};

export type ReadingHistory = {
  __typename?: 'ReadingHistory';
  chapter: Chapter;
  comic: Comic;
  createdAt: Scalars['DateTime'];
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
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

export type UpdateTagDto = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserDto = {
  base64Avatar?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
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
  role: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

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


export type GetGeneralInfoQuery = { __typename?: 'Query', authors: Array<{ __typename?: 'Author', name: string, slug: string, _id: string }>, genres: Array<{ __typename?: 'Tag', name: string, slug: string, _id: string }>, categories: Array<{ __typename?: 'Tag', name: string, slug: string, _id: string }> };

export type GetComicBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetComicBySlugQuery = { __typename?: 'Query', getComicBySlug: { __typename?: 'Comic', _id: string, createdAt: any, updatedAt: any, description: string, followCount: number, imageCoverUrl: string, imageThumbUrl: string, name: string, otherNames: Array<string>, status: string, artist?: { __typename?: 'Author', name: string, slug: string } | null, author: { __typename?: 'Author', name: string, slug: string }, category?: { __typename?: 'Tag', name: string, slug: string } | null, genres: Array<{ __typename?: 'Tag', name: string, slug: string }>, createdBy: { __typename?: 'User', _id: string, description?: string | null, avatarUrl?: string | null, displayName: string } } };

export type GetComicByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetComicByIdQuery = { __typename?: 'Query', comic: { __typename?: 'Comic', _id: string, name: string, otherNames: Array<string>, createdAt: any, updatedAt: any, description: string, imageCoverUrl: string, imageThumbUrl: string, status: string, slug: string, officeUrl?: string | null, author: { __typename?: 'Author', _id: string, name: string }, category?: { __typename?: 'Tag', _id: string, name: string } | null, artist?: { __typename?: 'Author', name: string, _id: string } | null, createdBy: { __typename?: 'User', _id: string }, genres: Array<{ __typename?: 'Tag', name: string, _id: string }> } };

export type GetComicsCreatedByUserQueryVariables = Exact<{
  userId: Scalars['String'];
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetComicsCreatedByUserQuery = { __typename?: 'Query', comics: Array<{ __typename?: 'Comic', _id: string, slug: string, name: string, chapterCount: number, updatedAt: any, followCount: number, imageCoverUrl: string, status: string, author: { __typename?: 'Author', name: string }, category?: { __typename?: 'Tag', name: string } | null, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null } | null }> };

export type GetRecentComicsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetRecentComicsQuery = { __typename?: 'Query', getRecentComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopComicsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopComicsQuery = { __typename?: 'Query', getTopComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string } }> };

export type GetTrendingComicsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTrendingComicsQuery = { __typename?: 'Query', TopFollow: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }>, TopWeek: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }>, TopMonth: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }>, TopYear: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }>, Newest: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopFollowQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopFollowQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopWeekQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopWeekQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopMonthQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopMonthQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopYearQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopYearQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetNewestQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetNewestQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter?: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any } | null, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };


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
    slug
    _id
  }
  genres: getGenres {
    name
    slug
    _id
  }
  categories: getCategories {
    name
    slug
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
      slug
    }
    author {
      name
      slug
    }
    category {
      name
      slug
    }
    genres {
      name
      slug
    }
    artist {
      name
    }
    createdAt
    updatedAt
    description
    followCount
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
  comics: getComicsCreatedByUser(userId: $userId, limit: $limit, page: $page) {
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
      slug
      name
    }
    author {
      name
      slug
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
      slug
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
export const GetTrendingComicsDocument = gql`
    query getTrendingComics($page: Float, $limit: Float) {
  TopFollow: getTrendingComics(
    input: {page: $page, limit: $limit, type: "followCount"}
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
      slug
      name
    }
    author {
      name
      slug
    }
  }
  TopWeek: getTrendingComics(input: {page: $page, limit: $limit, type: "topWeek"}) {
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
      slug
      name
    }
    author {
      name
      slug
    }
  }
  TopMonth: getTrendingComics(
    input: {page: $page, limit: $limit, type: "topMonth"}
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
      slug
      name
    }
    author {
      name
      slug
    }
  }
  TopYear: getTrendingComics(input: {page: $page, limit: $limit, type: "topYear"}) {
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
      slug
      name
    }
    author {
      name
      slug
    }
  }
  Newest: getTrendingComics(input: {page: $page, limit: $limit, type: "newest"}) {
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
      slug
      name
    }
    author {
      name
      slug
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
  getTrendingComics(input: {page: $page, limit: $limit, type: "followCount"}) {
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
      slug
      name
    }
    author {
      name
      slug
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
  getTrendingComics(input: {page: $page, limit: $limit, type: "topWeek"}) {
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
      slug
      name
    }
    author {
      name
      slug
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
  getTrendingComics(input: {page: $page, limit: $limit, type: "topMonth"}) {
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
      slug
      name
    }
    author {
      name
      slug
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
  getTrendingComics(input: {page: $page, limit: $limit, type: "topYear"}) {
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
      slug
      name
    }
    author {
      name
      slug
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
  getTrendingComics(input: {page: $page, limit: $limit, type: "newest"}) {
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
      slug
      name
    }
    author {
      name
      slug
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