import { Box, Input, Text, styled } from "@gluestack-ui/themed";
import React, { ComponentProps, forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

interface ConfirmationCodeFieldViewProps
  extends Partial<ComponentProps<typeof CodeField>> {
  cellCount: number;
  isInvalid?: boolean;
}

type ConfirmationCodeFieldViewRef = TextInput;

type StyledTextInputWithRef = React.ComponentProps<typeof Input> & {
  ref?: React.Ref<TextInput> | undefined;
};

// Disabling the outline on Safari browser will not work if only using TextInput or Input.
const StyledTextInput = styled(
  TextInput,
  {}
) as React.ComponentType<StyledTextInputWithRef>;

const HiddenInput = forwardRef<TextInput, TextInputProps>((props, ref) => (
  <StyledTextInput
    ref={ref}
    {...props}
    sx={{
      borderWidth: 0,
      _web: {
        outline: "transparent",
      },
    }}
  />
));

HiddenInput.displayName = "HiddenInput";

const ConfirmationCodeFieldView = forwardRef<
  ConfirmationCodeFieldViewRef,
  ConfirmationCodeFieldViewProps
>(({ isInvalid = false, ...restProps }, ref) => (
  <Box>
    <CodeField
      ref={ref}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoComplete="sms-otp"
      InputComponent={HiddenInput}
      {...restProps}
      accessibilityLabel="verification code"
      renderCell={({ index, symbol, isFocused }) => (
        <Text
          accessibilityLabel={`code cell ${index + 1}`}
          ml={index === 0 ? "$0" : "$1"}
          mr={index === restProps.cellCount - 1 ? "$0" : "$1"}
          w="$full"
          height="$12"
          lineHeight="$4xl"
          fontSize="$2xl"
          textAlign="center"
          borderRadius="$xl"
          color="$textLight900"
          borderColor={
            isFocused
              ? "$primary500"
              : isInvalid
              ? "$error700"
              : Boolean(symbol)
              ? "$primary500"
              : "$darkBlue600"
          }
          borderWidth="$1"
          key={index}
          sx={{
            _web: {
              transition: "all 0.2s ease",
            },
            "@xs": {
              ml: index === 0 ? "$0" : "$2",
              mr: index === restProps.cellCount - 1 ? "$0" : "$2",
            },
            "@md": {
              height: "$14",
              lineHeight: "$5xl",
            },
          }}
        >
          {symbol || (isFocused ? <Cursor /> : " ")}
        </Text>
      )}
    />
  </Box>
));

ConfirmationCodeFieldView.displayName = "ConfirmationCodeFieldView";

export default ConfirmationCodeFieldView;
