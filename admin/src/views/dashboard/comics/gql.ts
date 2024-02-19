import { graphql } from "@/gql";

export const GET_COMICS_QUERY = graphql(/* GraphQL */ `
  query ComicsTable(
    $filter: ComicDtoFilter!
    $sorting: [ComicDtoSort!]!
    $paging: OffsetPaging!
  ) {
    comicDtos(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        name
        _id
        slug
        author {
          name
        }
        category {
          name
        }
        chapterCount
        createdBy {
          username
        }
        imageCoverUrl
        recentChapter {
          name
        }
      }
      totalCount
    }
  }
`);
