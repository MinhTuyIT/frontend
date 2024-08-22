import { Text } from "@/components/Elements";
import {
  CreatePaymentMethodMutation,
  PaymentMethod,
  StripeCardBrand,
} from "@/generated/graphql";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { getPaymentLogoURL } from "@/utils/getPaymentLogoURL";
import { FetchResult } from "@apollo/client";
import { HStack, Image } from "@gluestack-ui/themed";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import React from "react";

export interface IPaymentMethodSection {
  paymentMethods: PaymentMethod[];
  paymentMethodRef: React.MutableRefObject<{
    performAction: () => Promise<
      FetchResult<CreatePaymentMethodMutation> | undefined
    >;
  } | null>;
  onChangePaymentMethod: (e: StripePaymentElementChangeEvent) => void;
}

const PaymentMethodSectionContainer = ({
  paymentMethods,
}: IPaymentMethodSection) => {
  return (
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
  );
};

export default PaymentMethodSectionContainer;
