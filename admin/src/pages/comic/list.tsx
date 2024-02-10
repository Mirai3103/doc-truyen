import { HttpError, useTable } from "@refinedev/core";
import { GetFields } from "@refinedev/nestjs-query";
import React from "react";
import { GET_CONTRIBUTED_COMICS_QUERY } from "./queries";
import {
  GetComicsCreatedByUserQuery,
  GetComicsCreatedByUserQueryVariables,
} from "../../graphql/types";

export default function ComicListPage() {
  const {
    tableQueryResult,
    filters,
    sorters,
    setCurrent,
    setPageSize,
    setFilters,
  } = useTable<
    GetFields<GetComicsCreatedByUserQuery>,
    HttpError,
    GetComicsCreatedByUserQueryVariables
  >({
    resource: "comic",
    pagination: {
      pageSize: 20,
    },
    meta: {
      gqlQuery: GET_CONTRIBUTED_COMICS_QUERY,
    },
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: "",
        },
      ],
    },
    sorters: {
      initial: [
        {
          field: "updatedAt",
          order: "desc",
        },
      ],
    },
  });
  return <div>list</div>;
}
