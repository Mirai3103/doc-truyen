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
  pages: Array<Page>;
  previousChapter?: Maybe<Chapter>;
  updatedAt: Scalars['DateTime'];
};

export type Comic = {
  __typename?: 'Comic';
  _id: Scalars['String'];
  artist?: Maybe<Author>;
  author: Author;
  category?: Maybe<Tag>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  followCount: Scalars['Float'];
  genres: Array<Tag>;
  imageCoverUrl: Scalars['String'];
  imageThumbUrl: Scalars['String'];
  name: Scalars['String'];
  officeUrl: Scalars['String'];
  otherNames: Array<Scalars['String']>;
  recentChapter: Chapter;
  slug: Scalars['String'];
  status: Scalars['String'];
  team: Team;
  updatedAt: Scalars['DateTime'];
};

export type CreateAuthorDto = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateTagDto = {
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateTeamDto = {
  description?: InputMaybe<Scalars['String']>;
  imageBase64?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  officialUrl?: InputMaybe<Scalars['String']>;
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
  addUserToTeam: Scalars['Boolean'];
  createAuthor: Author;
  createTag: Tag;
  createTeam: Team;
  createUser: User;
  updateAuthor: Author;
  updateTag: Tag;
  updateTeam: Team;
  updateUser: User;
};


export type MutationAddUserToTeamArgs = {
  teamId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateAuthorArgs = {
  createAuthorInput: CreateAuthorDto;
};


export type MutationCreateTagArgs = {
  createTagInput: CreateTagDto;
};


export type MutationCreateTeamArgs = {
  createTeamInput: CreateTeamDto;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserDto;
};


export type MutationUpdateAuthorArgs = {
  id: Scalars['String'];
  updateAuthorInput: UpdateAuthorDto;
};


export type MutationUpdateTagArgs = {
  id: Scalars['String'];
  updateTagInput: UpdateTagDto;
};


export type MutationUpdateTeamArgs = {
  id: Scalars['String'];
  updateTeamInput: UpdateTeamDto;
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
  getChapterById: Chapter;
  getComicById: Comic;
  getComicBySlug: Comic;
  getRecentComics: Array<Comic>;
  getTopComics: Array<Comic>;
  getTrendingComics: Array<Comic>;
  tag: Tag;
  tags: Array<Tag>;
  team: Team;
  teams: Array<Team>;
  user: User;
};


export type QueryAuthorArgs = {
  id: Scalars['String'];
};


export type QueryGetAllChaptersArgs = {
  comicId: Scalars['String'];
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


export type QueryTeamArgs = {
  id: Scalars['String'];
};


export type QueryUserArgs = {
  findUserInput: FindUserDto;
};

export type Tag = {
  __typename?: 'Tag';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Team = {
  __typename?: 'Team';
  _id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  description: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  members: Array<User>;
  name: Scalars['String'];
  officialUrl: Scalars['String'];
  slug: Scalars['String'];
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

export type UpdateTagDto = {
  description?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateTeamDto = {
  createdBy?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  imageBase64?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  officialUrl?: InputMaybe<Scalars['String']>;
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
  avatarUrl: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  followedComics: Array<Comic>;
  role: Scalars['Float'];
  teams: Array<Team>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type GetAllChaptersQueryVariables = Exact<{
  comicId: Scalars['String'];
}>;


export type GetAllChaptersQuery = { __typename?: 'Query', getAllChapters: Array<{ __typename?: 'Chapter', _id: string, chapterNumber: string, createdAt: any, order: number, name?: string | null }> };

export type GetChapterByIdQueryVariables = Exact<{
  chapterId: Scalars['String'];
}>;


export type GetChapterByIdQuery = { __typename?: 'Query', getChapterById: { __typename?: 'Chapter', chapterNumber: string, order: number, name?: string | null, nextChapter?: { __typename?: 'Chapter', chapterNumber: string } | null, previousChapter?: { __typename?: 'Chapter', chapterNumber: string } | null, comic: { __typename?: 'Comic', name: string, slug: string, _id: string }, pages: Array<{ __typename?: 'Page', order: number, url: string }> } };

export type GetComicBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetComicBySlugQuery = { __typename?: 'Query', getComicBySlug: { __typename?: 'Comic', _id: string, createdAt: any, updatedAt: any, description: string, followCount: number, imageCoverUrl: string, imageThumbUrl: string, name: string, otherNames: Array<string>, status: string, artist?: { __typename?: 'Author', name: string, slug: string } | null, author: { __typename?: 'Author', name: string, slug: string }, category?: { __typename?: 'Tag', name: string, slug: string } | null, genres: Array<{ __typename?: 'Tag', name: string, slug: string }>, team: { __typename?: 'Team', description: string, imageUrl?: string | null, name: string, officialUrl: string, slug: string } } };

export type GetRecentComicsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetRecentComicsQuery = { __typename?: 'Query', getRecentComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopComicsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']>;
  page?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopComicsQuery = { __typename?: 'Query', getTopComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string } }> };

export type GetTrendingComicsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTrendingComicsQuery = { __typename?: 'Query', TopFollow: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }>, TopWeek: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }>, TopMonth: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }>, TopYear: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }>, Newest: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopFollowQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopFollowQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopWeekQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopWeekQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopMonthQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopMonthQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetTopYearQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetTopYearQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };

export type GetNewestQueryVariables = Exact<{
  page?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
}>;


export type GetNewestQuery = { __typename?: 'Query', getTrendingComics: Array<{ __typename?: 'Comic', _id: string, imageThumbUrl: string, imageCoverUrl: string, name: string, description: string, slug: string, recentChapter: { __typename?: 'Chapter', chapterNumber: string, name?: string | null, order: number, _id: string, createdAt: any, updatedAt: any }, category?: { __typename?: 'Tag', slug: string, name: string } | null, author: { __typename?: 'Author', name: string, slug: string } }> };


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
    createdAt
    updatedAt
    description
    followCount
    imageCoverUrl
    imageThumbUrl
    name
    team {
      description
      imageUrl
      name
      officialUrl
      slug
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