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
    "\n  query AuthorsTable(\n    $filter: AuthorFilter!\n    $sorting: [AuthorSort!]!\n    $paging: OffsetPaging!\n  ) {\n    authors(filter: $filter, sorting: $sorting, paging: $paging) {\n      nodes {\n        _id\n        description\n        name\n        totalComics\n      }\n      totalCount\n    }\n  }\n": types.AuthorsTableDocument,
    "\n  mutation CreateOneAuthor($input: CreateOneAuthorInput!) {\n    createOneAuthor(input: $input) {\n      _id\n    }\n  }\n": types.CreateOneAuthorDocument,
    "\n  mutation UpdateOneAuthor($input: UpdateOneAuthorInput!) {\n    updateOneAuthor(input: $input) {\n      _id\n      description\n      name\n    }\n  }\n": types.UpdateOneAuthorDocument,
    "\n  mutation DeleteOneAuthor($input: DeleteOneAuthorInput!) {\n    deleteOneAuthor(input: $input) {\n      _id\n    }\n  }\n": types.DeleteOneAuthorDocument,
    "\n  query TagsTable(\n    $filter: TagFilter!\n    $sorting: [TagSort!]!\n    $paging: OffsetPaging!\n  ) {\n    tags(filter: $filter, sorting: $sorting, paging: $paging) {\n      nodes {\n        _id\n        description\n        name\n        totalComics\n        type\n      }\n      totalCount\n    }\n  }\n": types.TagsTableDocument,
    "\n  mutation CreateOneTag($input: CreateOneTagInput!) {\n    createOneTag(input: $input) {\n      _id\n    }\n  }\n": types.CreateOneTagDocument,
    "\n  mutation UpdateOneTag($input: UpdateOneTagInput!) {\n    updateOneTag(input: $input) {\n      _id\n      description\n      name\n      type\n    }\n  }\n": types.UpdateOneTagDocument,
    "\n  mutation DeleteOneTag($input: DeleteOneTagInput!) {\n    deleteOneTag(input: $input) {\n      _id\n    }\n  }\n": types.DeleteOneTagDocument,
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
export function graphql(source: "\n  query AuthorsTable(\n    $filter: AuthorFilter!\n    $sorting: [AuthorSort!]!\n    $paging: OffsetPaging!\n  ) {\n    authors(filter: $filter, sorting: $sorting, paging: $paging) {\n      nodes {\n        _id\n        description\n        name\n        totalComics\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query AuthorsTable(\n    $filter: AuthorFilter!\n    $sorting: [AuthorSort!]!\n    $paging: OffsetPaging!\n  ) {\n    authors(filter: $filter, sorting: $sorting, paging: $paging) {\n      nodes {\n        _id\n        description\n        name\n        totalComics\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneAuthor($input: CreateOneAuthorInput!) {\n    createOneAuthor(input: $input) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneAuthor($input: CreateOneAuthorInput!) {\n    createOneAuthor(input: $input) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneAuthor($input: UpdateOneAuthorInput!) {\n    updateOneAuthor(input: $input) {\n      _id\n      description\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneAuthor($input: UpdateOneAuthorInput!) {\n    updateOneAuthor(input: $input) {\n      _id\n      description\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteOneAuthor($input: DeleteOneAuthorInput!) {\n    deleteOneAuthor(input: $input) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteOneAuthor($input: DeleteOneAuthorInput!) {\n    deleteOneAuthor(input: $input) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TagsTable(\n    $filter: TagFilter!\n    $sorting: [TagSort!]!\n    $paging: OffsetPaging!\n  ) {\n    tags(filter: $filter, sorting: $sorting, paging: $paging) {\n      nodes {\n        _id\n        description\n        name\n        totalComics\n        type\n      }\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query TagsTable(\n    $filter: TagFilter!\n    $sorting: [TagSort!]!\n    $paging: OffsetPaging!\n  ) {\n    tags(filter: $filter, sorting: $sorting, paging: $paging) {\n      nodes {\n        _id\n        description\n        name\n        totalComics\n        type\n      }\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOneTag($input: CreateOneTagInput!) {\n    createOneTag(input: $input) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOneTag($input: CreateOneTagInput!) {\n    createOneTag(input: $input) {\n      _id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOneTag($input: UpdateOneTagInput!) {\n    updateOneTag(input: $input) {\n      _id\n      description\n      name\n      type\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOneTag($input: UpdateOneTagInput!) {\n    updateOneTag(input: $input) {\n      _id\n      description\n      name\n      type\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteOneTag($input: DeleteOneTagInput!) {\n    deleteOneTag(input: $input) {\n      _id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteOneTag($input: DeleteOneTagInput!) {\n    deleteOneTag(input: $input) {\n      _id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;