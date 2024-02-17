import { graphql } from "@/gql";
import { AuthorsTableQuery } from "@/gql/graphql";

export const GET_AUTHORS_QUERY = graphql(/* GraphQL */ `
  query AuthorsTable(
    $filter: AuthorFilter!
    $sorting: [AuthorSort!]!
    $paging: OffsetPaging!
  ) {
    authors(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        _id
        description
        name
        totalComics
      }
      totalCount
    }
  }
`);

export type AuthorType = Omit<
  AuthorsTableQuery["authors"]["nodes"][number],
  "__typename"
>;
export const CREATE_ONE_AUTHOR_MUTATION = graphql(/* GraphQL */ `
  mutation CreateOneAuthor($input: CreateOneAuthorInput!) {
    createOneAuthor(input: $input) {
      _id
    }
  }
`);

export const UPDATE_ONE_AUTHOR_MUTATION = graphql(/* GraphQL */ `
  mutation UpdateOneAuthor($input: UpdateOneAuthorInput!) {
    updateOneAuthor(input: $input) {
      _id
      description
      name
    }
  }
`);
export const DELETE_ONE_AUTHOR_MUTATION = graphql(/* GraphQL */ `
  mutation DeleteOneAuthor($input: DeleteOneAuthorInput!) {
    deleteOneAuthor(input: $input) {
      _id
    }
  }
`);
