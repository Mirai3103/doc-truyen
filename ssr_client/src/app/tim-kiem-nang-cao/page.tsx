import React from "react";
import { AdvanceSearchInput, Comic } from "@/gql/generated/graphql";
import { getClient } from "@/core/apollo/apolloRsc";
import { graphql } from "@/gql/generated";
import { GetAdvanceSearchQuery } from "./query";
import ResultShow from "./ResultShow";
import Filter from "./Filter";

interface Props {
    searchParams: AdvanceSearchInput;
}

export default async function Page({ searchParams }: Props) {
    const { data, loading, error } = await getClient().query({
        query: GetAdvanceSearchQuery,
        variables: {
            input: {
                ...searchParams,
                page: Number(searchParams.page) || 1,
                limit: Number(searchParams.limit) || 28,
            },
        },
    });

    return (
        <div className="flex flex-col ">
            <h1 className="text-3xl font-semibold">Tìm kiếm nâng cao</h1>
            <div className="my-unit-xl ">
                <Filter />
            </div>
            <ResultShow
                currentPage={searchParams.page || 1}
                limit={searchParams.limit || 28}
                totalPage={data?.advanceSearchComics.totalPages}
                initalItems={data.advanceSearchComics.data as Comic[]}
                initalSearchParams={searchParams}
            />
        </div>
    );
}
