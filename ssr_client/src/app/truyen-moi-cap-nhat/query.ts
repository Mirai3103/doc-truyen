import { graphql } from "@/gql/generated";

export const GetRecentComicsQuery = graphql(/* GraphQL */ `
    query GetRecentComicsPaginatedQuery($limit: Float, $page: Float) {
        getRecentComics(limit: $limit, page: $page) {
            data {
                _id
                imageCoverUrl
                name
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
                    _id
                    name
                }
                author {
                    name
                    _id
                }
            }
            totalPages
        }
    }
`);
