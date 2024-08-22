/* eslint-disable react/display-name */
import {
  FormControl,
  FormControlLabelText,
  Input,
  InputField,
  useBreakpointValue,
} from "@gluestack-ui/themed";
import React, { ComponentProps, ReactNode, forwardRef } from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { TextInput } from "react-native";

import FormControlInputView from "./FormControlInputView";
interface RemoveThoseKeys {
  Icon: any;
  Slot: any;
  Input: any;
}

export type IFromControlProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    ComponentProps<typeof FormControl> & {
      isReadOnly?: boolean;
      isRequired?: boolean;
      isDisabled?: boolean;
      isInvalid?: boolean;
      numberField?: boolean;
      size?: "sm" | "md" | "lg";
      control?: Control<TFieldValues>;
      label?: string;
      placeholder?: string;
      errorMessage?: string;
      helperText?: string;
      testID?: string;
      defaultValue?: string;
      errors?: FieldErrors<TFieldValues>;
      onSubmitEditing?: () => void;
      labelProps?: ComponentProps<typeof FormControlLabelText>;
      leftIcon?: ReactNode;
      rightIcon?: ReactNode;
      customHelper?: ReactNode;
      onPressLeftIcon?: () => void;
      onPressRightIcon?: () => void;
      inputField?: ComponentProps<typeof InputField>;
      valueInputRef?: React.RefObject<TextInput>;
      input?: Omit<ComponentProps<typeof Input>, keyof RemoveThoseKeys>;
      isTrimText?: boolean;
      loading?: boolean;
    };

const FormControlInputContainer = forwardRef<TextInput, IFromControlProps<any>>(
  <TFieldValues extends FieldValues>(
    props: IFromControlProps<TFieldValues>,
    ref?: React.LegacyRef<any>
  ) => {
    const height = useBreakpointValue({ base: 38, md: 48 });
    const { input, ...rest } = props;
    return (
      <FormControlInputView
        input={{
          h: height,
          ...input,
        }}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default FormControlInputContainer;
