import { Column, Table } from "@tanstack/react-table";

export interface DataTableFilterProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: Column<any, unknown>;
  table: Table<T>;
}
export type FilterType = "string" | "number" | "date" | "boolean" | "array";

export type Op =
  | "eq"
  | "ne"
  | "lt"
  | "lte"
  | "gt"
  | "gte"
  | "iLike"
  | "like"
  | "notILike"
  | "in"
  | "notIn"
  | "is"
  | "isNot"
  | "like"
  | "notLike";
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint, @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends unknown, TValue> {
    filterType?: FilterType;
    filterOptions?: {
      validOptions?: Array<{
        value: string | number;
        label: string;
      }>;
      min?: number | Date;
      max?: number | Date;
    };
    op?: Op;
  }
}
