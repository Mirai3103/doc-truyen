import { AdvanceSearchInput, useAdvanceSearchComicsLazyQuery } from "@/gql/generated/graphql";
import { TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { usePagination } from "@mantine/hooks";
import React from "react";
import { useParams } from "react-router-dom";

export default function SearchPage() {
    const { keyword } = useParams<{ keyword: string }>();
    const { values, setFieldValue } = useForm<AdvanceSearchInput>({
        initialValues: {
            keyword: keyword,
            page: 1,
            limit: 16,
        },
    });
    const [getData, { data, loading, error }] = useAdvanceSearchComicsLazyQuery();
    const { next, previous, active } = usePagination({ total: 100, page: 1 });
    return (
        <div>
            <Title p={"xl"} order={2}>
                Tìm kiếm nâng cao
            </Title>
            <div className="flex"></div>
        </div>
    );
}
