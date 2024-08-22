import { FormControl } from "@gluestack-ui/themed";
import React from "react";
import { Controller } from "react-hook-form";

import { FormControlSelectProps } from "./FormControlSelectContainer";
import Select from "../Select";

const FormControlSelectView = ({
  control,
  name,
  defaultValue,
  isReadOnly,
  isRequired,
  isDisabled,
  isInvalid,
  testID,
  selectProps,
  size,
  labelProps,
  label,
  placeholder,
  error,
  ...props
}: FormControlSelectProps<any>) => (
  <Controller
    control={control}
    name={name}
    defaultValue={defaultValue}
    render={({ field: { onChange, value } }) => (
      <FormControl
        size={size}
        isRequired={isRequired}
        isReadOnly={isReadOnly}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        sx={{
          _labelAstrick: {
            color: "$error600",
          },
        }}
        {...props}
      >
        <Select
          onValueChange={onChange}
          selectedValue={value}
          testID={testID}
          labelProps={labelProps}
          label={label}
          placeholder={placeholder}
          error={error}
          {...selectProps}
        />
      </FormControl>
    )}
  />
);

export default FormControlSelectView;
