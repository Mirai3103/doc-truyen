import { graphql } from "@/gql/generated";

export const GetAdvanceSearchQuery = graphql(/* GraphQL */ `
    query AdvanceSearchComics($input: AdvanceSearchInput!) {
        advanceSearchComics(input: $input) {
            data {
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
