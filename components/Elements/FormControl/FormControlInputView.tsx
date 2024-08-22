/* eslint-disable react/display-name */
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  InputSlot,
} from "@gluestack-ui/themed";
import CircleXIcon from "assets/icons/CircleXIcon";
import { LegacyRef, forwardRef } from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native";

import { IFromControlProps } from "./FormControlInputContainer";
import Skeleton from "../Skeleton";
const FormControlInputView = forwardRef<TextInput, IFromControlProps<any>>(
  (
    {
      label,
      isReadOnly,
      isRequired,
      isDisabled,
      isInvalid,
      testID,
      size = "md",
      onSubmitEditing,
      defaultValue = "",
      labelProps,
      errorMessage,
      helperText,
      inputField = {},
      input = {},
      isTrimText,
      loading = false,
      ...props
    }: IFromControlProps<any>,
    ref: LegacyRef<any>
  ) => (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={defaultValue}
      render={({ field: { onChange, onBlur, value } }) => (
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
          {label && (
            <Skeleton
              loading={loading}
              width={100}
              height={20}
              radius={4}
              mb="$2"
            >
              <FormControlLabel>
                <FormControlLabelText
                  fontFamily="$bodyBold"
                  fontSize={14}
                  height={26}
                  lineHeight={26}
                  {...labelProps}
                >
                  {label}
                </FormControlLabelText>
              </FormControlLabel>
            </Skeleton>
          )}
          <Skeleton loading={loading}>
            <Input
              variant="outline"
              testID={testID}
              size="md"
              bg={isDisabled ? "$bgDisabled" : "$bgSecondary"}
              rounded="$lg"
              shadowOpacity={0}
              borderColor={!!errorMessage ? "$error600" : "$defaultBorderColor"}
              $focus-borderColor={
                !!errorMessage ? "$error600" : "$defaultColor"
              }
              $focus-borderWidth={2}
              borderWidth={2}
              $invalid-borderColor={
                !!errorMessage ? "$error600" : "$defaultBorderColor"
              }
              {...input}
              opacity="$100"
            >
              {props.leftIcon && (
                <InputSlot pl="$3" onPress={props.onPressLeftIcon}>
                  {props.leftIcon}
                </InputSlot>
              )}
              <InputField
                ref={ref}
                placeholder={props.placeholder}
                value={isTrimText ? value?.trim() : value}
                onBlur={onBlur}
                onSubmitEditing={onSubmitEditing}
                autoCapitalize="none"
                autoComplete="one-time-code"
                autoCorrect={false}
                bg={isDisabled ? "$bgDisabled" : "$bgSecondary"}
                color={isDisabled ? "$textInputDisabled" : "$defaultContent"}
                opacity="$100"
                fontFamily="$body"
                {...inputField}
                onChangeText={v => {
                  onChange(props.numberField ? v?.replace(/[^0-9]/g, "") : v);
                }}
              />
              {props.rightIcon && (
                <InputSlot
                  pr="$3"
                  onPress={props.onPressRightIcon}
                  position="absolute"
                  right={0}
                  top={0}
                  bottom={0}
                >
                  {props.rightIcon}
                </InputSlot>
              )}
            </Input>
          </Skeleton>
          {(!!helperText || props.customHelper) && (
            <>
              {props.customHelper || (
                <FormControlHelper>
                  <FormControlHelperText fontFamily="$bodyBold">
                    {helperText}
                  </FormControlHelperText>
                </FormControlHelper>
              )}
            </>
          )}
          {!!errorMessage && (
            <Skeleton loading={loading} height={20}>
              <FormControlError display="flex" alignItems="flex-start">
                <HStack minWidth="$4" pt="$2">
                  <FormControlErrorIcon size="2xs" as={CircleXIcon} />
                </HStack>
                <FormControlErrorText
                  size="sm"
                  mt="$1"
                  color="$error600"
                  flex={1}
                >
                  {errorMessage}
                </FormControlErrorText>
              </FormControlError>
            </Skeleton>
          )}
        </FormControl>
      )}
    />
  )
);

export default FormControlInputView;
