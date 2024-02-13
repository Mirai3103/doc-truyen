import { Input, InputProps } from "@chakra-ui/react";
import React from "react";

interface Props extends Omit<InputProps, "onChange"> {
  debounceTime?: number;
  onChange?: (value: string | number | readonly string[] | undefined) => void;
}

export default function DebouncedInput({
  debounceTime = 300,
  value: initialValue,
  onChange,
  ...rest
}: Props) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("timeout", value);
      onChange?.(value);
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [value]);
  return (
    <Input
      {...rest}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...rest}
    />
  );
}
