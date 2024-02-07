"use client";
import React from "react";
import {
  Button,
  Chip,
  Image,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  usePagination,
} from "@nextui-org/react";
import { graphql } from "@/gql/generated";
import { useLazyQuery, useQuery } from "@apollo/client";
import { toReadbleTime } from "@/core/utils";
import { useRecoilState } from "recoil";
import userStore from "@/store/userStore";
const GetMyHistoryQuery = graphql(/* GraphQL */ `
  query getAllHistories($limit: Float!, $page: Float!) {
    histories: getAllHistories(limit: $limit, page: $page) {
      chapter {
        chapterNumber
        name
        _id
        comic {
          name
          slug
          imageCoverUrl
        }
      }
      createdAt
    }
  }
`);

export default function HistoryView() {
  const { data, fetchMore, loading } = useQuery(GetMyHistoryQuery, {
    variables: {
      limit: 10,
      page: 1,
    },
  });

  const [activePage, setPage] = React.useState(1);
  const [isHasMore, setIsHasMore] = React.useState(true);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Button
            hidden={!isHasMore}
            disabled={loading}
            onClick={() => {
              fetchMore({
                variables: {
                  page: activePage + 1,
                },
              }).then((data) => {
                if (data.data.histories && data.data.histories.length === 0) {
                  setIsHasMore(false);
                }
              });
              setPage(activePage + 1);
            }}
          >
            Tải thêm
          </Button>
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
      isStriped
    >
      <TableHeader>
        <TableColumn key="name">Truyện</TableColumn>
        <TableColumn key="recentChapter.name">Chương mới nhất</TableColumn>
        <TableColumn key="recentChapter.updatedAt">Cập nhật lúc</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={loading}
        emptyContent="Không có truyện nào"
        items={data?.histories || []}
        loadingContent={<Spinner color="secondary" label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item.chapter?._id}>
            <TableCell className="font-semibold flex gap-x-2 lg:text-lg">
              <Image
                src={item.chapter?.comic.imageCoverUrl}
                alt={item.chapter?.comic.slug}
                classNames={{
                  wrapper: "shrink-0",
                }}
                className="rounded-md w-20 h-32"
              />
              <span className="lg:pt-unit-md grow">
                {item.chapter?.comic.name}
              </span>
            </TableCell>

            <TableCell className="align-top lg:pt-unit-md">
              {item.chapter?.name}
            </TableCell>
            <TableCell className="align-top lg:pt-unit-md">
              {toReadbleTime(item.createdAt)}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
