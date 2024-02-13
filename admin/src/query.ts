import gql from "graphql-tag";

export const GET_AUTHORS_QUERY = gql`
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
      }
      totalCount
    }
  }
`;
