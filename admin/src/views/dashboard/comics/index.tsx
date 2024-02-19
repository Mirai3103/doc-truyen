import {
  ComicDtoFilter,
  ComicDtoSortFields,
  ComicsTableQuery,
  SortDirection,
} from "@/gql/graphql";
import { parseFilter } from "@/utils/filter.utils";
import { gqlClient } from "@/utils/request";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import React from "react";
import { GET_COMICS_QUERY } from "./gql";

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
  console.log(data);
  return <div>index</div>;
}
