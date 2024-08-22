import { Button, FormControlInput } from "@/components/Elements";
import { Box, HStack, Text } from "@gluestack-ui/themed";
import { testIDs } from "e2e/testIDs";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Platform } from "react-native";
export interface RequestResetPasswordInput {
  email: string;
}
export interface RequestResetPasswordViewProps {
  control: Control<RequestResetPasswordInput>;
  errors: FieldErrors<RequestResetPasswordInput>;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  doSubmit: () => void;
  modalWidth?: number;
  onCancel?: () => void;
  isSmall?: string;
  loading?: boolean;
}
const RequestResetPasswordView: React.FC<RequestResetPasswordViewProps> = ({
  control,
  errors,
  doSubmit,
  modalWidth,
  onCancel,
  isSmall,
  loading,
}) => (
  <Box width={modalWidth} p="$6">
    <Text
      color="$defaultContent"
      fontSize="$2xl"
      my={isSmall ? "$6" : "$10"}
      mt={isSmall ? "$10" : "$10"}
      fontFamily="$bodyBold"
      lineHeight="$3.5xl"
    >
      Password Reset
    </Text>
    <FormControlInput
      testID="emailInput"
      isRequired
      isInvalid={"email" in errors}
      control={control}
      errorMessage={errors.email?.message ?? ""}
      name="email"
      label="Email"
      placeholder="Enter your email"
      inputField={{
        autoFocus: true,
      }}
      onSubmitEditing={doSubmit}
    />
    <HStack
      gap={isSmall ? "$2" : "$3"}
      justifyContent="flex-end"
      flexDirection={isSmall ? "column-reverse" : "row"}
      my="$12"
    >
      <Button
        variant="outline"
        action="secondary"
        bgColor="$white"
        borderColor="$content"
        onPress={onCancel}
        label="Cancel"
        labelProps={{
          color: "$content",
          lineHeight: "$2xl",
          fontFamily: "$bodyBold",
          fontSize: "$md",
        }}
        w={isSmall ? "$full" : "$34"}
        h={Platform.OS !== "web" ? "$9.5" : "$12"}
      />
      <Button
        testID={testIDs.AUTH.SEND_RESET_LINK_BUTTON}
        variant="solid"
        action="primary"
        bgColor="$defaultColor"
        onPress={doSubmit}
        isLoading={loading}
        disabled={loading}
        label="Send Reset Link"
        labelProps={{
          lineHeight: "$2xl",
          fontFamily: "$bodyBold",
          fontSize: "$md",
        }}
        w={isSmall ? "$full" : "$48"}
        h={Platform.OS !== "web" ? "$9.5" : "$12"}
      />
    </HStack>
  </Box>
);
export default RequestResetPasswordView;
