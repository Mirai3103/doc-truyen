import {
  ComicDtoFilter,
  ComicDtoSortFields,
  ComicsTableQuery,
  SortDirection,
} from "@/gql/graphql";
import { gqlClient } from "@/utils/request";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { ComicType, GET_COMICS_QUERY } from "./gql";
import { Box, Heading } from "@chakra-ui/react";
import CreateButton from "../categories/CreateButton";
import { DataTable } from "@/components/data-table";
const columnHelper = createColumnHelper<ComicType>();
const columns = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Tên truyện",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("category.name", {
    id: "category.name",
    header: "Thể loại",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("author.name", {
    id: "author.name",
    header: "Tác giả",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("recentChapter.name", {
    id: "recentChapter.name",
    header: "Chương mới",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
];
export default function ComicsPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { data, refetch } = useQuery<ComicsTableQuery, Error, ComicsTableQuery>(
    {
      queryKey: ["comics", sorting, pagination, columnFilters],

      queryFn: ({ queryKey }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, sorting, pagination, columnFilters] = queryKey as [
          string,
          SortingState,
          PaginationState,
          ColumnFiltersState,
        ];

        const filter: ComicDtoFilter = {};

        return gqlClient.request(GET_COMICS_QUERY, {
          filter: filter,
          paging: {
            limit: pagination.pageSize,
            offset: pagination.pageIndex * pagination.pageSize,
          },
          sorting: {
            direction: sorting[0]?.desc
              ? SortDirection.Desc
              : SortDirection.Asc,
            field: (sorting[0]?.id ||
              ComicDtoSortFields.UpdatedAt) as ComicDtoSortFields,
          },
        });
      },
      placeholderData: keepPreviousData,
    }
  );
  const table = useReactTable({
    columns,
    data: data?.comicDtos.nodes || [],
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(
      (data?.comicDtos.totalCount || 0) / pagination.pageSize
    ),
    state: {
      sorting,
      pagination,
      columnFilters,
    },
    debugTable: true,
  });

  return (
    <Box>
      <CreateButton mb={4} colorScheme="blue" mt={4}>
        Thêm truyện
      </CreateButton>
      <Box
        overflowX={"auto"}
        p={5}
        rounded={"30px"}
        bg={"white"}
        _dark={{
          bg: "gray.800",
        }}
      >
        <Heading size={"lg"} mb={5} as={"h1"}>
          Danh sách truyện
        </Heading>
        <DataTable size={"md"} table={table} />
      </Box>
    </Box>
  );
}
