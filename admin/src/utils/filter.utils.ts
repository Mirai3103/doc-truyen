/* eslint-disable @typescript-eslint/no-explicit-any */
import { Op } from "@/components/data-table/DataTableFilter";
import { ColumnFiltersState, Table } from "@tanstack/react-table";

export function parseFilter<T>(
  columnFilterState: ColumnFiltersState,
  table: Table<T>
) {
  const result: Record<string, any> = {};
  let op: Op;
  columnFilterState.forEach((columnFilter: any) => {
    const column = table.getColumn(columnFilter.id);
    if (!column) return;

    const type = column.columnDef.meta?.filterType;
    const value = columnFilter.value;

    switch (type) {
      case "string":
        op = column.columnDef.meta?.op || "iLike";
        result[column.id] = { [op]: value };
        break;
      case "number":
      case "date":
        // eslint-disable-next-line no-case-declarations
        const [min, max] = value;
        result[column.id] = { gte: min, lte: max };
        break;
      case "boolean":
        result[column.id] = { eq: value };
        break;
      case "array":
        result[column.id] = { in: value };
        break;
    }
  });

  return result;
}
