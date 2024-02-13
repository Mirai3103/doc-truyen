import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import request from "graphql-request";
import { graphql } from "@/gql";
import {
  AuthorSortFields,
  AuthorsTableQuery,
  SortDirection,
  AuthorFilter,
} from "@/gql/graphql";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "@/components/data-table";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Box, ButtonGroup, Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { parseFilter } from "@/utils/filter.utils";
export const Route = createLazyFileRoute("" as never)({
  component: AuthorPage,
});

const GET_AUTHORS_QUERY = graphql(/* GraphQL */ `
  query AuthorsTable(
    $filter: AuthorFilter!
    $sorting: [AuthorSort!]!
    $paging: OffsetPaging!
  ) {
    authors(filter: $filter, sorting: $sorting, paging: $paging) {
      nodes {
        _id
        description
        name
      }
      totalCount
    }
  }
`);
type AuthorType = Omit<
  AuthorsTableQuery["authors"]["nodes"][number],
  "__typename"
>;

const columnHelper = createColumnHelper<AuthorType>();
const columns = [
  columnHelper.accessor("_id", {
    id: "_id",
    header: "ID",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    enableSorting: false,
    meta: {
      filterType: "string",
      op: "eq",
    },
    enableColumnFilter: true,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Tên tác giả",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      filterType: "string",
    },
  }),
  columnHelper.accessor("description", {
    id: "description",
    header: "Mô tả",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => (
      <ButtonGroup variant="solid" size="sm" spacing={3}>
        <IconButton
          colorScheme="blue"
          icon={<BsBoxArrowUpRight />}
          aria-label="Up"
          as={Link}
          to={`/authors/${props.row.original._id}`}
        />
        <IconButton
          colorScheme="green"
          icon={<AiFillEdit />}
          aria-label="Edit"
          as={Link}
          to={`/authors/${props.row.original._id}/edit`}
        />
        <IconButton
          colorScheme="red"
          variant="outline"
          icon={<BsFillTrashFill />}
          aria-label="Delete"
        />
      </ButtonGroup>
    ),
    header: "Hành động",
  }),
];
function AuthorPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const { data } = useQuery<AuthorsTableQuery, Error, AuthorsTableQuery>({
    queryKey: ["authors", sorting, pagination, columnFilters],

    queryFn: ({ queryKey }) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, sorting, pagination, columnFilters] = queryKey as [
        string,
        SortingState,
        PaginationState,
        ColumnFiltersState,
      ];

      const filter: AuthorFilter = parseFilter(
        columnFilters,
        table
      ) as AuthorFilter;

      return request("http://localhost:8080/graphql", GET_AUTHORS_QUERY, {
        filter: filter,
        paging: {
          limit: pagination.pageSize,
          offset: pagination.pageIndex * pagination.pageSize,
        },
        sorting: {
          direction: sorting[0]?.desc ? SortDirection.Desc : SortDirection.Asc,
          field: (sorting[0]?.id || AuthorSortFields.Name) as AuthorSortFields,
        },
      });
    },
    placeholderData: keepPreviousData,
  });
  const table = useReactTable({
    columns,
    data: data?.authors.nodes || [],
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil((data?.authors.totalCount || 0) / pagination.pageSize),
    state: {
      sorting,
      pagination,
      columnFilters,
    },
    debugTable: true,
  });

  return (
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
        Danh sách tác giả
      </Heading>
      <DataTable size={"md"} table={table} />
    </Box>
  );
}
