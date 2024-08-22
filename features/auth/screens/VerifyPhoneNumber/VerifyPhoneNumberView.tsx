import {
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Heading,
  Text,
} from "@gluestack-ui/themed";
import React, { Ref } from "react";

import ConfirmationCodeField, {
  ConfirmationCodeFieldRef,
} from "../../components/ConfirmationCodeField";

import { IconAlert } from "@/components/Elements";

interface VerifyPhoneNumberViewProps {
  isSubmitting?: boolean;
  submitDisabled?: boolean;
  errorMessage?: string;
  otpValue: string;
  otpLength: number;
  codeFieldRef?: Ref<ConfirmationCodeFieldRef>;

  onFinished: (value: string) => void;
  onSubmit: () => void;
  onChange?: (value: string) => void;
  onResendCode?: () => void;
}

const VerifyPhoneNumberView: React.FC<VerifyPhoneNumberViewProps> = ({
  isSubmitting = false,
  submitDisabled = false,
  errorMessage = "",
  otpValue = "",
  otpLength,
  codeFieldRef,
  onSubmit,
  onFinished,
  onChange,
  onResendCode,
}) => (
  <FormControl isInvalid={Boolean(errorMessage)}>
    <Box focusable>
      <Heading fontSize="$1.5xl" lineHeight="$2xl" color="$darkBlue600">
        Enter Verification Code
      </Heading>
    </Box>
    <Box mt="$7">
      <ConfirmationCodeField
        ref={codeFieldRef}
        value={otpValue}
        cellCount={otpLength}
        isInvalid={Boolean(errorMessage)}
        isSubmitting={isSubmitting}
        onFinished={onFinished}
        onChange={onChange}
      />
    </Box>
    <FormControlError
      mt="$4"
      accessibilityRole="alert"
      alignItems="flex-start"
      sx={{
        "@xs": {
          alignItems: "center",
        },
      }}
    >
      <FormControlErrorIcon
        as={IconAlert}
        size="2xs"
        color="$error700"
        mt="$0.5"
        sx={{
          "@xs": {
            mt: "$0",
          },
        }}
      />

      <FormControlErrorText
        size="xs"
        fontSize="$2xs"
        lineHeight="$2xs"
        sx={{
          "@md": {
            fontSize: "$xs",
            lineHeight: "$xs",
          },
        }}
      >
        {errorMessage}
      </FormControlErrorText>
    </FormControlError>

    {!errorMessage && (
      <Box mt="$4" focusable>
        <Text
          fontSize="$2xs"
          lineHeight="$2xs"
          color="$textLight900"
          size="xs"
          sx={{
            "@md": {
              fontSize: "$xs",
              lineHeight: "$xs",
            },
          }}
        >
          This code will expire in 10 minutes. Need a new code?
        </Text>
      </Box>
    )}
    <Button
      onPress={onResendCode}
      variant="link"
      action="secondary"
      size="xs"
      justifyContent="flex-start"
      alignSelf="flex-start"
      sx={{
        ":hover": {
          _text: {
            opacity: "$90",
          },
        },
      }}
    >
      <ButtonText
        fontWeight="$normal"
        color="$darkBlue600"
        opacity="$60"
        textDecorationLine="underline"
        fontSize="$xs"
      >
        Resend code
      </ButtonText>
    </Button>
    <Button
      onPress={onSubmit}
      isDisabled={submitDisabled}
      mt="$6"
      size="xl"
      rounded="$full"
    >
      {isSubmitting ? <ButtonSpinner /> : <ButtonText>Verify</ButtonText>}
    </Button>
  </FormControl>
);

export default VerifyPhoneNumberView;
