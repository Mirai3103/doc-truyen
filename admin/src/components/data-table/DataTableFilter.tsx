/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Flex } from "@chakra-ui/react";
import React from "react";
import DebouncedInput from "../DebouncedInput";
import { useForm } from "react-hook-form";
import { NumberFilter } from "./NumberFilter";
import { DataTableFilterProps } from "./type";

export default function DataTableFilter<T>({
  column,
  table,
}: DataTableFilterProps<T>) {
  const columnType = column.columnDef.meta?.filterType;

  switch (columnType) {
    case "string":
      return <StringFilter column={column} table={table} />;
    case "number":
      return <NumberFilter column={column} table={table} />;
    case "date":
      return <DateFilter column={column} table={table} />;
    case "boolean":
      return <BooleanFilter column={column} table={table} />;
    case "array":
      return <ArrayFilter column={column} table={table} />;
    default:
      return null;
  }
}

function StringFilter<T>({ column, table }: DataTableFilterProps<T>) {
  return (
    <Flex>
      <DebouncedInput
        value={(column.getFilterValue() as string) || ""}
        placeholder="Tìm kiếm ..."
        onChange={(value) => {
          column.setFilterValue(value);
        }}
      />
    </Flex>
  );
}

function DateFilter<T>({ column, table }: DataTableFilterProps<T>) {
  // between
  return <div>DateFilter</div>;
}

function BooleanFilter<T>({ column, table }: DataTableFilterProps<T>) {
  // true, false
  return <div>BooleanFilter</div>;
}

function ArrayFilter<T>({ column, table }: DataTableFilterProps<T>) {
  // in
  const validOptions = column.columnDef.meta?.filterOptions?.validOptions;
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...validOptions?.reduce((acc, option) => {
        (acc as any)[option.value] = true;
        return acc;
      }, {}),
    },
  });
  if (!validOptions) {
    console.warn("ArrayFilter: validOptions is not defined");
    return null;
  }
  return (
    <Flex direction={"column"} gap={2}>
      {column.columnDef.meta?.filterOptions?.validOptions?.map((option) => (
        <Checkbox key={option.value} {...register(option.value as never)}>
          {option.label}
        </Checkbox>
      ))}
      <Button
        size={"sm"}
        mt={2}
        colorScheme="blue"
        onClick={handleSubmit((data: any) => {
          const keys = Object.keys(data);
          const selectedOptions = keys.filter((key) => data[key]);
          column.setFilterValue(selectedOptions);
        })}
      >
        Apply
      </Button>
    </Flex>
  );
}
