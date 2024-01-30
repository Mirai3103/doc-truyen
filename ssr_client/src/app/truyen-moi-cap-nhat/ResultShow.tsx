"use client";
import ComicCard from "@/components/ComicCard";
import { Comic } from "@/gql/generated/graphql";
import React from "react";
import { GetRecentComicsQuery } from "./query";
import { useLazyQuery } from "@apollo/client";
import { Pagination, Spinner, usePagination } from "@nextui-org/react";
import useSearchQueryParams from "@/hooks/useSearchQueryParams";

interface Props {
    initalItems: Comic[];
    totalPage: number;
    currentPage: number;
    limit: number;
}

export default function ResultShow({ initalItems, totalPage, currentPage, limit }: Props) {
    const { setSearchQueryParams } = useSearchQueryParams();

    const { activePage, setPage } = usePagination({
        total: totalPage,
        initialPage: Number(currentPage),
    });
    const [fetch, { data, error, loading }] = useLazyQuery(GetRecentComicsQuery, {
        variables: {
            limit,
            page: currentPage,
        },
    });
    React.useEffect(() => {
        setSearchQueryParams({
            page: activePage,
        });
        fetch({
            variables: {
                limit,
                page: activePage,
            },
        });
    }, [activePage, currentPage]);
    const comics: Comic[] = (data?.getRecentComics.data as Comic[]) || initalItems;
    return (
        <>
            <div className="flex gap-x-4 mb-4">
                <div className="w-unit-sm  bg-primary-400"></div>
                <div className="flex-1 text-2xl font-semibold text-primary-400">Mới cập nhật</div>
            </div>
            <div className="grid grid-cols-2 sm:gap-x-2 xl:gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-2">
                {!loading && comics.map((item) => <ComicCard withTimeAgo comic={item!} key={item._id} />)}
                {loading && (
                    <div className="col-span-full py-unit-2xl flex justify-center items-center">
                        <Spinner size="lg" />
                    </div>
                )}
            </div>
            <div className=" mt-4 flex justify-center items-center">
                <Pagination variant="bordered" showControls total={totalPage} page={activePage} onChange={setPage} />
            </div>
        </>
    );
}
