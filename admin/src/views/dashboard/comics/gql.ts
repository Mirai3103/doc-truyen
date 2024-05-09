import { graphql } from "@/gql";
import { ComicsTableQuery } from "@/gql/graphql";

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
export type ComicType = Omit<
  ComicsTableQuery["comicDtos"]["nodes"][number],
  "__typename"
>;
