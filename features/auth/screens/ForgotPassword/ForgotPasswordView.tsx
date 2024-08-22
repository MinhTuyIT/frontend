import {
  ButtonIcon,
  Fab,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";
import PageFooter from "layout/PageFooter";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Platform } from "react-native";

import { testIDs } from "e2e/testIDs";
import mail from "../../../../assets/images/mail.png";
import RequestResetPasswordForm from "../../components/RequestResetPasswordForm";

export interface ForgotPasswordInput {
  email: string;
}

interface ForgotPasswordViewProps {
  control: Control<ForgotPasswordInput>;
  errors: FieldErrors<ForgotPasswordInput>;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  doSubmit: () => void;
  onCancel?: () => void;
  isEmailSent?: boolean;
  isSmall?: string;
  loading?: boolean;
}
const ForgotPasswordView: React.FC<ForgotPasswordViewProps> = ({
  control,
  errors,
  doSubmit,
  onCancel,
  isEmailSent,
  isSmall,
  loading,
}) => (
  <ScrollView contentContainerStyle={{ flex: 1 }}>
    <VStack
      backgroundColor="$white"
      borderRadius={10}
      alignItems="center"
      width="100%"
      height="100%"
      justifyContent="space-between"
      testID={testIDs.AUTH.EMAIL_SENT_SCREEN}
    >
      {Platform.OS !== "web" && isEmailSent && (
        <Fab
          size="md"
          placement="top left"
          left="$6"
          isHovered={false}
          isDisabled={false}
          isPressed={false}
          backgroundColor="$inherit"
          shadowOpacity={0}
          elevation={0}
        >
          <Link href="/">
            <HStack gap="$2" alignItems="center">
              <VStack
                backgroundColor="$bgButtonGray91"
                rounded={4}
                height="$6.5"
                width="$6.5"
                justifyContent="center"
                alignItems="center"
              >
                <ButtonIcon as={ArrowLeft} color="$black" width={20} />
              </VStack>
              <Text pt="$2">Home</Text>
            </HStack>
          </Link>
        </Fab>
      )}
      {!isEmailSent ? (
        <RequestResetPasswordForm
          control={control}
          doSubmit={doSubmit}
          modalWidth={isSmall ? 353 : 493}
          errors={errors}
          onCancel={onCancel}
          loading={loading}
        />
      ) : (
        <VStack
          alignItems="center"
          py={Platform.OS !== "web" ? "$9.5" : "$18"}
          px="$6"
        >
          <Image
            source={mail}
            width={70}
            height={70}
            alt="mail"
            mb={Platform.OS !== "web" ? "$3" : "$px"}
          />
          <Text
            textAlign="center"
            fontSize="$4xl"
            color="$defaultColor"
            fontFamily="$bodyBold"
            lineHeight={isSmall ? "$4xl" : "$2.5xl"}
          >
            Email Sent
          </Text>

          <Text
            textAlign="center"
            fontSize="$xl"
            p={isSmall ? "$2" : "$3"}
            maxWidth="$128"
            fontFamily="$body"
            color="$defaultContent"
            letterSpacing={0.7}
          >
            If your account is in our system you will receive an email to reset
            your password
          </Text>
        </VStack>
      )}
      <PageFooter />
    </VStack>
  </ScrollView>
);
export default ForgotPasswordView;
