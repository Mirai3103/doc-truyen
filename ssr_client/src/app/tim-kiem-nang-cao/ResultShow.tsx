"use client";
import ComicCard from "@/components/ComicCard";
import { AdvanceSearchInput, Comic } from "@/gql/generated/graphql";
import React from "react";
import { GetAdvanceSearchQuery } from "./query";
import { useLazyQuery } from "@apollo/client";
import { Pagination, usePagination } from "@nextui-org/react";
import useSearchQueryParams from "@/hooks/useSearchQueryParams";
import { useRecoilState } from "recoil";
import filterState from "./filter.state";

interface Props {
    initalItems: Comic[];
    totalPage: number;
    currentPage: number;
    limit: number;
    initalSearchParams: AdvanceSearchInput;
}

export default function ResultShow({ initalItems, totalPage, currentPage, limit, initalSearchParams }: Props) {
    const { setSearchQueryParams } = useSearchQueryParams();

    const { activePage, setPage } = usePagination({
        total: totalPage,
        initialPage: Number(currentPage),
    });
    const [fetch, { data, error, loading }] = useLazyQuery(GetAdvanceSearchQuery, {
        variables: {
            input: initalSearchParams,
        },
    });
    const [filter, setFilter] = useRecoilState(filterState);
    React.useEffect(() => {
        if (!filter.isFirstSet) {
            fetch({
                variables: {
                    input: { ...filter.params, page: 1 },
                },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);
    React.useEffect(() => {
        setSearchQueryParams({
            page: activePage,
        });
        fetch({
            variables: {
                input: { ...initalSearchParams, page: activePage },
            },
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePage, currentPage]);
    const comics: Comic[] = (data?.advanceSearchComics.data as Comic[]) || initalItems;
    return (
        <>
            <div className="flex gap-x-4 mb-4">
                <div className="w-unit-sm  bg-primary-400"></div>
                <div className="flex-1 text-2xl font-semibold text-primary-400">Kết quả tìm kiếm</div>
            </div>
            <div className="grid grid-cols-2 sm:gap-x-2 xl:gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-2">
                {comics.map((item) => (
                    <ComicCard withTimeAgo comic={item!} key={item._id} />
                ))}
            </div>
            <div className=" mt-4 flex justify-center items-center">
                <Pagination variant="bordered" showControls total={totalPage} page={activePage} onChange={setPage} />
            </div>
        </>
    );
}
