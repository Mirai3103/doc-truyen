/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IsNumber,
  Validate,
  ValidateIf,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { FaCheck } from "react-icons/fa";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { DataTableFilterProps } from "./type";
import { useForm } from "react-hook-form";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
@ValidatorConstraint({ name: "IsGreaterThan", async: false })
class IsGreaterThan implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    if (relatedValue === null || value === null) return true; // skip validation if one is null
    console.log(value, relatedValue);
    return (
      typeof value === "number" &&
      typeof relatedValue === "number" &&
      value > relatedValue
    );
  }
}

class NumberFormState {
  @IsNumber({}, { message: "Giá trị min phải là số" })
  @ValidateIf((o) => o.min !== null)
  min: number | null;
  @IsNumber({})
  @Validate(IsGreaterThan, ["min"], { message: "Giá trị max phải lớn hơn min" })
  max: number | null;
}
const resolver = classValidatorResolver(NumberFormState);
export function NumberFilter<T>({ column }: DataTableFilterProps<T>) {
  const min = (column.columnDef.meta?.filterOptions?.min as number) || 0;
  const max = (column.columnDef.meta?.filterOptions?.max as number) || 10;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<NumberFormState>({
    defaultValues: {
      min: null,
      max: null,
    },
    resolver,
  });
  console.log(watch());
  return (
    <Flex gap={2} direction={"column"}>
      <Flex gap={2}>
        <FormControl isInvalid={!!errors.min}>
          <FormLabel htmlFor="min">Từ</FormLabel>
          <Input
            type="number"
            {...register("min", {
              required: false,
              min: min,
              max: max,
              valueAsNumber: true,
            })}
          />
          <FormErrorMessage>{errors.min?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.max}>
          <FormLabel htmlFor="max">Đến</FormLabel>
          <Input
            type="number"
            {...register("max", {
              required: false,
              min: min,
              max: max,
              valueAsNumber: true,
            })}
          />
          <FormErrorMessage>{errors.max?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Button
        leftIcon={<FaCheck />}
        onClick={handleSubmit((data) =>
          column.setFilterValue([data.min, data.max])
        )}
      >
        Áp dụng
      </Button>
    </Flex>
  );
}
