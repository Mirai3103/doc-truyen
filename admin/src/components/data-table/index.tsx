/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  TableProps,
  TableCaption,
  IconButton,
  Flex,
  Input,
  Box,
  MenuItem,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Header as ReactTableHeader,
  Table as ReactTable,
  flexRender,
} from "@tanstack/react-table";
import DataTableFilter from "./DataTableFilter";
import { FaFilter } from "react-icons/fa";

interface Props<T> extends TableProps {
  table: ReactTable<T>;
}

export function DataTable<T>({ table, ...rest }: Props<T>) {
  return (
    <Table {...rest}>
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <DataTableHeader key={header.id} table={table} header={header} />
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody>
        {table.getRowModel().rows.map((row) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
              const meta: any = cell.column.columnDef.meta;
              return (
                <Td key={cell.id} isNumeric={meta?.isNumeric}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
      <TableCaption>
        <Flex justifyContent={"space-between"}>
          <Flex alignItems={"center"} gap={2}>
            <Flex gap={2}>
              <IconButton
                aria-label="previous page"
                icon={<GrFormPrevious />}
                onClick={() => table.previousPage()}
              />
              <Input
                htmlSize={3}
                width="auto"
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value) {
                    const pageIndex = parseInt(value, 10);
                    if (!isNaN(pageIndex)) table.setPageIndex(pageIndex - 1);
                  }
                }}
              />
              <IconButton
                aria-label="next page"
                icon={<GrFormNext />}
                onClick={() => table.nextPage()}
              />
            </Flex>
            <Box>
              <span>Trang </span>
              <chakra.span fontWeight={"bold"}>
                {table.getState().pagination.pageIndex + 1} trên{" "}
              </chakra.span>
              <chakra.span fontWeight={"bold"}>
                {table.getPageCount()}{" "}
              </chakra.span>
            </Box>
          </Flex>
          <Flex alignItems={"center"} gap={4}>
            <chakra.div whiteSpace={"nowrap"}>Hiển thị: </chakra.div>
            <Select
              value={table.getState().pagination.pageSize + ""}
              size="sm"
              onChange={(e) => {
                const value = e.target.value;
                if (value) {
                  table.setPageSize(parseInt(value, 10));
                }
              }}
            >
              <option value="10">10 items</option>
              <option value="20">20 items</option>
              <option value="30">30 items</option>
              <option value="40">40 items</option>
              <option value="50">50 items</option>
            </Select>
          </Flex>
        </Flex>
      </TableCaption>
    </Table>
  );
}

interface DataTableHeaderProps<T> {
  table: ReactTable<T>;
  header: ReactTableHeader<T, unknown>;
}
function DataTableHeader<T>({ table, header }: DataTableHeaderProps<T>) {
  const meta: any = header.column.columnDef.meta;

  return (
    <Th key={header.id} isNumeric={meta?.isNumeric}>
      <chakra.span mr={2} onClick={header.column.getToggleSortingHandler()}>
        {flexRender(header.column.columnDef.header, header.getContext())}

        <chakra.span pl="4">
          {header.column.getIsSorted() ? (
            header.column.getIsSorted() === "desc" ? (
              <TriangleDownIcon aria-label="sorted descending" />
            ) : (
              <TriangleUpIcon aria-label="sorted ascending" />
            )
          ) : null}
        </chakra.span>
      </chakra.span>

      {header.column.getCanFilter() && (
        <Popover placement="auto">
          <PopoverTrigger>
            <IconButton size={"sm"} aria-label="filter" icon={<FaFilter />} />
          </PopoverTrigger>
          <PopoverContent p={3}>
            <chakra.div>
              {<DataTableFilter column={header.column} table={table} />}
            </chakra.div>
          </PopoverContent>
        </Popover>
      )}
    </Th>
  );
}
