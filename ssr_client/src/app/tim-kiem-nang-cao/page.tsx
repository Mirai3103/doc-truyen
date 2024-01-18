import React from "react";
import { AdvanceSearchInput, Comic } from "@/gql/generated/graphql";
import { getClient } from "@/core/apollo/apolloRsc";
import { GetAdvanceSearchQuery, GetFilterOptionsQuery } from "./query";
import ResultShow from "./ResultShow";
import Filter from "./Filter";

interface Props {
    searchParams: AdvanceSearchInput;
}

export default async function Page({ searchParams }: Props) {
    async function getProps() {
        const p1 = getClient().query({
            query: GetAdvanceSearchQuery,
            variables: {
                input: {
                    ...searchParams,
                    page: Number(searchParams.page) || 1,
                    limit: Number(searchParams.limit) || 28,
                },
            },
        });
        const p2 = getClient().query({
            query: GetFilterOptionsQuery,
        });
        const [data1, data2] = await Promise.all([p1, p2]);
        return {
            data: data1.data,
            filterOptions: data2.data,
        };
    }

    const { data, filterOptions } = await getProps();

    return (
        <div className="flex flex-col ">
            <h1 className="text-3xl font-semibold">Tìm kiếm nâng cao</h1>
            <div className="my-unit-xl ">
                <Filter queryOptions={filterOptions} initialFilter={searchParams} />
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
