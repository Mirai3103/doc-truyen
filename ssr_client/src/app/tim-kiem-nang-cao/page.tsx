import React from "react";
import { AdvanceSearchInput } from "@/gql/generated/graphql";
import { getClient } from "@/core/apollo/apolloRsc";
import { graphql } from "@/gql/generated";
import { GetAdvanceSearchQuery } from "./query";

interface Props {
    searchParams: AdvanceSearchInput;
}

export default async function Page({ searchParams }: Props) {
    const { data, loading, error } = await getClient().query({
        query: GetAdvanceSearchQuery,
        variables: {
            input: searchParams,
        },
    });

    return <div></div>;
}
