import { graphql } from "@/gql/generated";

export const SearchAuthorQuery = graphql(/* GraphQL */ `
    query SearchAuthor($keyword: String!) {
        searchAuthor(keyword: $keyword, page: 1, limit: 10) {
            authors {
                _id
                name
            }
        }
    }
`);

export const GetFilterOptionsQuery = graphql(/* GraphQL */ `
    query GetFilterOptionsQuery {
        statuses: getAllComicStatus {
            name
            id
        }
        sortOptions: getSortOptions {
            name
            value {
                direction
                field
            }
        }
        categories: getCategories {
            _id
            name
        }
        tags: getGenres {
            _id
            name
        }
    }
`);

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
