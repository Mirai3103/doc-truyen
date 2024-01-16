"use client";
import React from "react";
import { graphql } from "@/gql/generated";
import { Comic } from "@/gql/generated/graphql";
import { useQuery } from "@apollo/client";
import { Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Input } from "@nextui-org/react";
import { toReadbleTime } from "../../../core/utils/index";
import { useRouter } from "next/navigation";
interface Props {
    comic: Comic;
}

const GetChaptersByIdQuery = graphql(/* GraphQL */ `
    query getAllChapters($comicId: String!) {
        getAllChapters(comicId: $comicId) {
            _id
            chapterNumber
            createdAt
            order
            name
        }
    }
`);
export default function Chapter({ comic }: Props) {
    const { data, loading, error } = useQuery(GetChaptersByIdQuery, {
        variables: {
            comicId: comic._id,
        },
    });
    const router = useRouter();
    return (
        <Table
            topContent={<TopContent />}
            className="mt-unit-xl"
            classNames={{
                wrapper: "max-h-[80vh]",
            }}
            color="default"
            selectionMode="single"
            aria-label="Example table with client async pagination"
        >
            <TableHeader>
                <TableColumn key="chapterNumber">Số chương</TableColumn>
                <TableColumn key="name">Tên chương</TableColumn>
                <TableColumn key="createdAt">Ngày đăng</TableColumn>
            </TableHeader>
            <TableBody items={data?.getAllChapters ?? []}>
                {(item) => (
                    <TableRow
                        onClick={() => {
                            router.push(`/truyen/${comic.slug}/chuong/${item?.order}`);
                        }}
                        className="cursor-pointer hover:text-primary-700"
                        key={item?.name}
                    >
                        <TableCell>{`Chương ${item?.chapterNumber}`}</TableCell>
                        <TableCell>{item?.name}</TableCell>
                        <TableCell>{toReadbleTime(item?.createdAt)}</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

function TopContent() {
    return (
        <div className="w-full flex justify-center">
            <Input
                size="sm"
                startContent={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                }
                isClearable
                className="w-full sm:max-w-[44%]"
                placeholder="Tìm kiếm chương"
            />
        </div>
    );
}
