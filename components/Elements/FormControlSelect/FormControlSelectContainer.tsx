import { FormControl, FormControlLabelText } from "@gluestack-ui/themed";
import React, { ComponentProps } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import FormControlSelectView from "./FormControlSelectView";
import { SelectProps } from "../Select/SelectContainer";

export type FormControlSelectProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    ComponentProps<typeof FormControl> & {
      isReadOnly?: boolean;
      isRequired?: boolean;
      isDisabled?: boolean;
      isInvalid?: boolean;
      size?: "sm" | "md" | "lg";
      control?: Control<TFieldValues>;
      label?: string;
      placeholder?: string;
      testID?: string;
      defaultValue?: string;
      errors?: FieldErrors<TFieldValues>;
      selectProps?: SelectProps;
      error?: string;
      labelProps?: ComponentProps<typeof FormControlLabelText>;
    };

const FormControlSelectContainer = (props: FormControlSelectProps<any>) => {
  return <FormControlSelectView {...props} />;
};

export default FormControlSelectContainer;
