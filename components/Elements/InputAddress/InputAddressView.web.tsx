/* eslint-disable jsx-a11y/no-autofocus */
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
} from "@gluestack-ui/themed";
import CircleXIcon from "assets/icons/CircleXIcon";
import React, { LegacyRef, forwardRef } from "react";
import Autocomplete from "react-google-autocomplete";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native";

import { IFromControlProps } from "./InputAddressContainer";
import "./styles.css"; // Import your custom CSS file
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
      height,
      onPlaceSelected,
      ...props
    }: IFromControlProps<any> & {
      isFocus?: boolean;
      setFocus?: (isFocus: boolean) => void;
    },
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
          )}
          <Autocomplete
            apiKey="AIzaSyDZ8izabNvL2xXyG444jSN_aq8fZbkMc6c"
            className="custom-input"
            testID={testID}
            placeholder=""
            language="en"
            value={value}
            style={{ height }}
            ref={ref}
            autoFocus
            onBlur={onBlur}
            onSubmitEditing={onSubmitEditing}
            onChange={onChange}
            onPlaceSelected={onPlaceSelected}
          />
          {(!!helperText || props.customHelper) && (
            <FormControlHelper>
              {props.customHelper || (
                <FormControlHelperText fontFamily="$bodyBold">
                  {helperText}
                </FormControlHelperText>
              )}
            </FormControlHelper>
          )}
          {!!errorMessage && (
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
          )}
        </FormControl>
      )}
    />
  )
);

export default FormControlInputView;
