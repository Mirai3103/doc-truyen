"use client";
import React from "react";
import {
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
import { useQuery } from "@apollo/client";
import { toReadbleTime } from "@/core/utils";

const GetMyBookmarksQuery = graphql(/* GraphQL */ `
  query GetMyBookmarks($limit: Float!, $page: Float!) {
    getFollowedComics(limit: $limit, page: $page) {
      data {
        _id
        category {
          _id
          name
        }
        imageCoverUrl
        name
        updatedAt
        recentChapter {
          _id
          chapterNumber
          updatedAt
          order
          name
          createdAt
        }
      }
      totalPages
    }
  }
`);

export default function BookmarkView() {
  const [limit, setLimit] = React.useState(5);
  const { data, loading, refetch, called } = useQuery(GetMyBookmarksQuery, {
    variables: {
      limit: limit,
      page: 1,
    },
  });
  const { activePage, total, setPage } = usePagination({
    total: data?.getFollowedComics.totalPages || 1,
  });

  React.useEffect(() => {
    refetch({
      page: activePage,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            onChange={setPage}
            isCompact
            showControls
            showShadow
            color="secondary"
            page={activePage}
            total={total}
          />
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
        items={data?.getFollowedComics.data || []}
        loadingContent={<Spinner color="secondary" label="Loading..." />}
      >
        {(item) => (
          <TableRow key={item._id}>
            <TableCell className="font-semibold flex gap-x-2 lg:text-lg">
              <Image
                src={item.imageCoverUrl}
                alt={item.name}
                classNames={{
                  wrapper: "shrink-0",
                }}
                className="rounded-md w-20 h-32"
              />
              <span className="lg:pt-unit-md grow">{item.name}</span>
            </TableCell>

            <TableCell className="align-top lg:pt-unit-md">{`Chương ${item.recentChapter?.chapterNumber} - ${item.recentChapter?.name}`}</TableCell>
            <TableCell className="align-top lg:pt-unit-md">
              {toReadbleTime(item.recentChapter?.createdAt)}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
