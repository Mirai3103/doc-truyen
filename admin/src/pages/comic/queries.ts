import gql from "graphql-tag";

export const GET_CONTRIBUTED_COMICS_QUERY = gql`
  query GetComicsCreatedByUser($limit: Float, $page: Float) {
    getContributedComics(limit: $limit, page: $page) {
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
