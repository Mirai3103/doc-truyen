import { graphql } from "@/gql";
import { TagsTableQuery } from "@/gql/graphql";

export const GET_TAGS_QUERY = graphql(/* GraphQL */ `
  query TagsTable(
    $filter: TagFilter!
    $sorting: [TagSort!]!
    $paging: OffsetPaging!
  ) {
    tags(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        _id
        description
        name
        totalComics
        type
      }
      totalCount
    }
  }
`);

export type TagType = Omit<
  TagsTableQuery["tags"]["nodes"][number],
  "__typename"
>;
export const CREATE_ONE_TAG_MUTATION = graphql(/* GraphQL */ `
  mutation CreateOneTag($input: CreateOneTagInput!) {
    createOneTag(input: $input) {
      _id
    }
  }
`);

export const UPDATE_ONE_TAG_MUTATION = graphql(/* GraphQL */ `
  mutation UpdateOneTag($input: UpdateOneTagInput!) {
    updateOneTag(input: $input) {
      _id
      description
      name
      type
    }
  }
`);
export const DELETE_ONE_TAG_MUTATION = graphql(/* GraphQL */ `
  mutation DeleteOneTag($input: DeleteOneTagInput!) {
    deleteOneTag(input: $input) {
      _id
    }
  }
`);
