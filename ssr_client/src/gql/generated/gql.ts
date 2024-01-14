/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query SearchByKeyword($keyword: String!, $limit: Float) {\n        data: advanceSearchComics(input: { keyword: $keyword, limit: $limit }) {\n            _id\n            imageThumbUrl\n            imageCoverUrl\n            name\n            slug\n            author {\n                name\n                _id\n            }\n        }\n    }\n": types.SearchByKeywordDocument,
    "\n    query GetTopComics($limit: Float, $page: Float) {\n        getTopComics(limit: $limit, page: $page) {\n            _id\n            imageCoverUrl\n            name\n            slug\n            recentChapter {\n                chapterNumber\n                name\n                order\n                _id\n                createdAt\n                updatedAt\n            }\n            category {\n                _id\n                name\n            }\n            author {\n                name\n            }\n        }\n    }\n": types.GetTopComicsDocument,
    "\n    query GetRecentComics($limit: Float, $page: Float) {\n        getRecentComics(limit: $limit, page: $page) {\n            _id\n            imageCoverUrl\n            name\n            slug\n            recentChapter {\n                chapterNumber\n                name\n                order\n                _id\n                createdAt\n                updatedAt\n            }\n            category {\n                _id\n                name\n            }\n            author {\n                name\n                _id\n            }\n        }\n    }\n": types.GetRecentComicsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query SearchByKeyword($keyword: String!, $limit: Float) {\n        data: advanceSearchComics(input: { keyword: $keyword, limit: $limit }) {\n            _id\n            imageThumbUrl\n            imageCoverUrl\n            name\n            slug\n            author {\n                name\n                _id\n            }\n        }\n    }\n"): (typeof documents)["\n    query SearchByKeyword($keyword: String!, $limit: Float) {\n        data: advanceSearchComics(input: { keyword: $keyword, limit: $limit }) {\n            _id\n            imageThumbUrl\n            imageCoverUrl\n            name\n            slug\n            author {\n                name\n                _id\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetTopComics($limit: Float, $page: Float) {\n        getTopComics(limit: $limit, page: $page) {\n            _id\n            imageCoverUrl\n            name\n            slug\n            recentChapter {\n                chapterNumber\n                name\n                order\n                _id\n                createdAt\n                updatedAt\n            }\n            category {\n                _id\n                name\n            }\n            author {\n                name\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetTopComics($limit: Float, $page: Float) {\n        getTopComics(limit: $limit, page: $page) {\n            _id\n            imageCoverUrl\n            name\n            slug\n            recentChapter {\n                chapterNumber\n                name\n                order\n                _id\n                createdAt\n                updatedAt\n            }\n            category {\n                _id\n                name\n            }\n            author {\n                name\n            }\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GetRecentComics($limit: Float, $page: Float) {\n        getRecentComics(limit: $limit, page: $page) {\n            _id\n            imageCoverUrl\n            name\n            slug\n            recentChapter {\n                chapterNumber\n                name\n                order\n                _id\n                createdAt\n                updatedAt\n            }\n            category {\n                _id\n                name\n            }\n            author {\n                name\n                _id\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetRecentComics($limit: Float, $page: Float) {\n        getRecentComics(limit: $limit, page: $page) {\n            _id\n            imageCoverUrl\n            name\n            slug\n            recentChapter {\n                chapterNumber\n                name\n                order\n                _id\n                createdAt\n                updatedAt\n            }\n            category {\n                _id\n                name\n            }\n            author {\n                name\n                _id\n            }\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;