import { graphql } from "@/gql/generated";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { getClient } from "@/core/apollo/apolloRsc";
import { Comic } from "@/gql/generated/graphql";
import { Spacer } from "@nextui-org/react";
import ResultShow from "./ResultShow";
import { GetRecentComicsQuery } from "./query";

export default async function RecentUpdatePage({ searchParams: { page = 1, limit = 28 } }) {
    const { data } = await getClient().query({
        query: GetRecentComicsQuery,
        variables: {
            limit: Number(limit),
            page: Number(page),
        },
    });
    return (
        <ResultShow
            totalPage={data.getRecentComics.totalPages}
            initalItems={(data.getRecentComics.data || []) as Comic[]}
            currentPage={page}
            limit={limit}
        />
    );
}
