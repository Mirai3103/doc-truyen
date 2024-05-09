import {
  AuthorSortFields,
  AuthorsTableQuery,
  SortDirection,
  AuthorFilter,
  Author,
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
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { Box, ButtonGroup, Heading } from "@chakra-ui/react";
import React from "react";
import { parseFilter } from "@/utils/filter.utils";
import { gqlClient } from "@/utils/request";
import EditButton from "./EditButton";
import CreateButton from "./CreateButton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { AuthorType, GET_AUTHORS_QUERY } from "./gql";
import DeleteButton from "./DeleteButton";

const columnHelper = createColumnHelper<AuthorType>();

export default function AuthorPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const { data, refetch } = useQuery<
    AuthorsTableQuery,
    Error,
    AuthorsTableQuery
  >({
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
        table,
      ) as AuthorFilter;

      return gqlClient.request(GET_AUTHORS_QUERY, {
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

  const columns = React.useMemo(
    () => [
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
      columnHelper.accessor("totalComics", {
        id: "totalComics",
        header: "Số truyện",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        enableSorting: true,
        enableColumnFilter: true,
        meta: {
          filterType: "number",
          filterOptions: {
            min: 0,
            max: Number.MAX_SAFE_INTEGER,
          },
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
            <EditButton
              author={props.row.original as Author}
              colorScheme="green"
              leftIcon={<AiFillEdit />}
              aria-label="Edit"
              onEdited={refetch}
            />
            <DeleteButton
              author={props.row.original as Author}
              colorScheme="red"
              leftIcon={<BsFillTrashFill />}
              aria-label="Delete"
              onDeleted={refetch}
            />
          </ButtonGroup>
        ),
        header: "Hành động",
      }),
    ],
    [],
  );
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
    <Box>
      <CreateButton mb={4} colorScheme="blue" mt={4}>
        Thêm tác giả
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
          Danh sách tác giả
        </Heading>
        <DataTable size={"md"} table={table} />
      </Box>
    </Box>
  );
}
