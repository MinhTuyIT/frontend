import {
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
import CircleXIcon from "assets/icons/CircleXIcon";
import React, { ComponentProps } from "react";
import { DimensionValue } from "react-native";

import Skeleton from "../Skeleton";
interface RemoveThoseKeys {
  Icon: any;
  Slot: any;
  Input: any;
}
export interface InputViewProps
  extends Omit<ComponentProps<typeof Input>, keyof RemoveThoseKeys> {
  errorMessage?: string | React.ReactNode;
  inputField: ComponentProps<typeof InputField>;
  labelProps?: ComponentProps<typeof FormControlLabelText>;
  label?: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isShowErrorMsg?: boolean;
  numberField?: boolean;
  breakpointHeight?: DimensionValue;
  loading?: boolean;
}

const InputView = ({
  inputField,
  errorMessage,
  label,
  labelProps,
  leftIcon,
  rightIcon,
  onPressLeftIcon,
  onPressRightIcon,
  isShowErrorMsg = true,
  numberField = false,
  breakpointHeight,
  loading,
  ...props
}: InputViewProps) => {
  return (
    <>
      {label && (
        <Skeleton loading={loading} width={100} height={20} radius={4} mb="$2">
          <FormControlLabel>
            <FormControlLabelText {...labelProps}>{label}</FormControlLabelText>
          </FormControlLabel>
        </Skeleton>
      )}
      <Skeleton loading={loading}>
        <Input
          variant="outline"
          size="md"
          bg={props.isDisabled ? "$bgDisabled" : "$bgSecondary"}
          color={props.isDisabled ? "$textInputDisabled" : "$defaultContent"}
          fontFamily="$body"
          rounded="$lg"
          shadowOpacity={0}
          borderColor={!!errorMessage ? "$error600" : "$defaultBorderColor"}
          $focus-borderColor={!!errorMessage ? "$error600" : "$defaultColor"}
          $focus-borderWidth={2}
          borderWidth={2}
          $invalid-borderColor={
            !!errorMessage ? "$error600" : "$defaultBorderColor"
          }
          h={breakpointHeight}
          {...props}
          opacity="$100"
        >
          {leftIcon && (
            <InputSlot pl="$3" onPress={onPressLeftIcon}>
              {leftIcon}
            </InputSlot>
          )}
          <InputField
            pr="$10"
            autoCapitalize="none"
            autoComplete="one-time-code"
            autoCorrect={false}
            bg={props.isDisabled ? "$bgDisabled" : "$bgSecondary"}
            color={props.isDisabled ? "$textInputDisabled" : "$defaultContent"}
            opacity="$100"
            fontFamily="$body"
            {...inputField}
            onChangeText={v => {
              inputField?.onChangeText?.(
                numberField ? v?.replace(/[^0-9]/g, "") : v
              );
            }}
          />
          {rightIcon && (
            <InputSlot
              pr="$3"
              onPress={onPressRightIcon}
              position="absolute"
              right={0}
              top={0}
              bottom={0}
            >
              {rightIcon}
            </InputSlot>
          )}
        </Input>
      </Skeleton>

      {!!errorMessage && isShowErrorMsg && (
        <Skeleton loading={loading} width={100} height={20} radius={4} mb="$2">
          <FormControlError display="flex" alignItems="flex-start">
            <HStack minWidth="$4" pt="$2">
              <FormControlErrorIcon size="2xs" as={CircleXIcon} />
            </HStack>
            <FormControlErrorText size="sm" mt="$1" color="$error600" flex={1}>
              {errorMessage}
            </FormControlErrorText>
          </FormControlError>
        </Skeleton>
      )}
    </>
  );
};

export default InputView;
