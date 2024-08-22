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
// import { GooglePlacesAutocomplete } from "expo-google-places-autocomplete";
import React, { forwardRef, LegacyRef } from "react";
// import Autocomplete from "react-google-autocomplete";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { IFromControlProps } from "./InputAddressContainer";

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
      defaultValue = "",
      labelProps,
      errorMessage,
      helperText,
      onPlaceSelected,
      height: _,
      isFocus,
      setFocus,
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
      render={({ field: { onChange, onBlur, value } }) => {
        return (
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
            <GooglePlacesAutocomplete
              ref={ref}
              fetchDetails
              defaultValue={value}
              keyboardShouldPersistTaps="always"
              textInputProps={{
                onChangeText: onChange,
                value,
                onBlur: e => {
                  setFocus?.(false);
                  onBlur(e);
                },
                testID,
                defaultValue: value,
                autoFocus: true,
                onFocus: () => setFocus?.(true),
              }}
              placeholder=""
              onPress={(data, details = null) => onPlaceSelected?.(details)}
              query={{
                key: "AIzaSyDZ8izabNvL2xXyG444jSN_aq8fZbkMc6c",
                language: "en",
              }}
              styles={{
                container: {
                  width: "100%",
                },
                textInput: {
                  height: 38,
                  borderColor: isFocus ? "#005A54" : "#E7E7E7",
                  borderWidth: 2,
                  borderRadius: 9,
                  fontSize: 16,
                  backgroundColor: "#FBFBFB",
                },
                textInputContainer: {
                  backgroundColor: "#fff",
                  borderColor: "#E7E7E7",
                },
                description: {
                  fontSize: 16,
                },
                listView: {
                  backgroundColor: "#fff",
                  borderRadius: 9,
                  borderWidth: 2,
                  borderColor: "#ddd",
                },
                row: {
                  borderBottomColor: "#ddd",
                  borderRadius: 9,
                },
                separator: {
                  height: 1,
                  backgroundColor: "#ddd",
                },
                powered: {
                  height: 0,
                  width: 0,
                  overflow: "hidden",
                },
              }}
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
        );
      }}
    />
  )
);

export default FormControlInputView;
