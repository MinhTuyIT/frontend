/* eslint-disable max-lines */
import { MaterialIcons } from "@expo/vector-icons";
import {
  Box,
  Divider,
  FormControl,
  HStack,
  Image,
  VStack,
  View,
} from "@gluestack-ui/themed";
import React, { memo } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { DimensionValue, Platform } from "react-native";

import { ProfileInput } from "../ProfileForm/ProfileFormView";

import { FormControlInput, Model, Text } from "@/components/Elements";
import PhoneNumberInput from "@/components/Elements/PhoneNumberInput";
import {
  CreatePaymentMethodMutation,
  PaymentMethod,
  StripeCardBrand,
} from "@/generated/graphql";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { getPaymentLogoURL } from "@/utils/getPaymentLogoURL";
import { FetchResult } from "@apollo/client";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { testIDs } from "e2e/testIDs";
import PaymentMethodSection from "../PaymentMethodSection";

//DOTO: will remove ant type when integrate API
export interface RegisterToBidProps {
  maxHeight?: DimensionValue;
  isSmall?: boolean;
  disabledSubmit?: boolean;
  control?: Control<any, any>;
  errors: FieldErrors<any>;
  errorColor?: string;
  onSubmit?: () => void;
  isOpen: boolean;
  onClose: () => void;
  isMobile?: boolean;
  loading?: boolean;
  paymentMethods: PaymentMethod[];
  defaultValue?: ProfileInput;
  paymentMethodRef: React.MutableRefObject<{
    performAction: () => Promise<
      FetchResult<CreatePaymentMethodMutation> | undefined
    >;
  } | null>;
  onChangePaymentMethod: (e: StripePaymentElementChangeEvent) => void;
  onNextStep?: () => void;
  isNextStep?: boolean;
}

const RegisterToBidView = ({
  isSmall,
  disabledSubmit,
  control,
  errors,
  errorColor,
  onSubmit,
  isOpen,
  onClose,
  isMobile,
  loading,
  paymentMethods,
  defaultValue,
  paymentMethodRef,
  onChangePaymentMethod,
}: RegisterToBidProps) => {
  return (
    <Model
      isOpen={isOpen}
      textBtnConfirm="Register To Bid"
      title="REGISTER TO BID"
      headingProps={{ fontFamily: "$bodyBold", color: "$textLight1000" }}
      headerProps={{
        px: "$7.5",
        pt: "$7.5",
        pb: "$2.5",
        justifyContent: isMobile ? "center" : "flex-start",
      }}
      bodyProps={{
        px: "$7.5",
        maxHeight: isMobile ? 500 : 600,
      }}
      textProps={{
        fontFamily: "$bodyBold",
        lineHeight: "$xl",
      }}
      onConfirm={onSubmit}
      buttonConfirmProps={{ isDisabled: disabledSubmit }}
      footerProps={{ px: "$7.5", pb: "$7.5" }}
      size="lg"
      onClose={onClose}
      contentProps={{ bg: "$white" }}
      confirmLoading={loading}
      avoidKeyboard
      testID="modalRegisterToBid"
    >
      <Box bg="$jungleGreenOpacity" px="$3.5" py="$3" mb="$6" rounded="$xl">
        <Text
          py="$1"
          fontFamily="$bodyBold"
          color="$textLight1000"
          fontSize="$sm"
        >
          Disclaimer
        </Text>
        <Text fontSize={13}>
          A valid credit card and phone number must be on file before you can
          place a bid. No charge will be made.
        </Text>
      </Box>
      <Text
        fontSize="$2xl"
        mt="$2"
        mb="$2.5"
        fontFamily="$bodyBold"
        color="$textLight1000"
        lineHeight="$2xl"
      >
        CREDIT CARD
      </Text>

      {paymentMethods.length === 0 && Platform.OS === "web" ? (
        <PaymentMethodSection
          paymentMethods={paymentMethods}
          paymentMethodRef={paymentMethodRef}
          onChangePaymentMethod={onChangePaymentMethod}
        />
      ) : (
        <HStack
          gap="$4"
          rounded="$xl"
          borderColor="$borderInput"
          borderWidth={1}
          py="$3"
          px="$3"
          flexDirection="row"
          justifyContent="space-between"
        >
          <HStack alignItems="center" gap="$2">
            <Image
              h="$5"
              w="$6"
              source={getPaymentLogoURL(
                paymentMethods[0]?.details.brand as StripeCardBrand
              )}
              resizeMode="contain"
            />
            <Text
              fontFamily="$bodyBold"
              fontSize="$sm"
              color="$defaultContent"
              lineHeight="$xl"
            >
              {capitalizeWords(paymentMethods[0]?.details?.brand)}
            </Text>
          </HStack>
          <Text fontSize="$md" color="$defaultContent" lineHeight="$xl">
            Ending in {paymentMethods[0]?.details?.last4}
          </Text>
        </HStack>
      )}
      <Divider my="$6" />
      <Text
        fontSize="$2xl"
        pb="$2.5"
        fontFamily="$bodyBold"
        color="$textLight1000"
        lineHeight="$2xl"
      >
        CONTACT INFORMATION
      </Text>
      <VStack gap="$4">
        <View
          display="flex"
          gap="$5"
          flexDirection={isSmall ? "column" : "row"}
        >
          <View flex={1}>
            <FormControlInput
              isRequired
              isInvalid={"firstName" in errors}
              control={control}
              name="firstName"
              inputField={{
                autoFocus: true,
              }}
              labelProps={{
                fontFamily: "$bodyBold",
                fontSize: "$sm",
                color: "$defaultContent",
              }}
              isDisabled={loading}
              label="First Name"
              errorMessage={(errors?.firstName?.message as string) ?? ""}
              testID={testIDs.REGISTER_TO_BID.FIRST_NAME}
            />
          </View>
          <View flex={1}>
            <FormControlInput
              isRequired
              isInvalid={"lastName" in errors}
              control={control}
              name="lastName"
              labelProps={{
                fontFamily: "$bodyBold",
                fontSize: "$sm",
                color: "$defaultContent",
              }}
              isDisabled={loading}
              label="Last Name"
              errorMessage={(errors?.lastName?.message as string) ?? ""}
              testID={testIDs.REGISTER_TO_BID.LAST_NAME}
            />
          </View>
        </View>
        <View>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                size="md"
                isRequired
                isInvalid={"phoneNumber" in errors}
                sx={{
                  _labelAstrick: {
                    color: "$error600",
                  },
                }}
              >
                <PhoneNumberInput
                  value={value}
                  onChange={onChange}
                  errorMessage={(errors?.phoneNumber?.message as string) ?? ""}
                  defaultValue={defaultValue?.phoneNumber}
                />
              </FormControl>
            )}
          />
        </View>
        {errors && Object.keys(errors).length > 0 && (
          <VStack
            px={Platform.OS === "web" ? "$22" : "$1"}
            py="$5"
            bg="$error60040"
            rounded="$lg"
            justifyContent="center"
            alignItems="center"
            gap="$2"
            mt="$2"
          >
            <MaterialIcons name="error" size={21} color={errorColor} />
            <Text fontFamily="$bodyBold" textAlign="center">
              There was an error validating your information
            </Text>
          </VStack>
        )}
      </VStack>
    </Model>
  );
};

export default memo(RegisterToBidView);
