import {
  Button,
  ButtonSpinner,
  ButtonText,
  HStack,
  Heading,
  VStack,
} from "@gluestack-ui/themed";
import { PaymentElement } from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import React from "react";

interface IPaymentWebModalViewProps {
  isOpen?: boolean;
  onClose?: () => void;
  onChange?: (e: StripePaymentElementChangeEvent) => void;
  isSmall?: boolean;
  loading?: boolean;
  isCompleted?: boolean;
  onConfirm: () => Promise<void>;
}

const PaymentWebModalView = ({
  onChange,
  isSmall,
  onClose,
  loading,
  isCompleted,
  onConfirm,
}: IPaymentWebModalViewProps) => (
  <VStack px="$2" mb="$4">
    <Heading size="xl">ADD CREDIT CARD</Heading>
    <PaymentElement
      onChange={onChange}
      options={{
        terms: {
          card: "never",
        },
        defaultValues: {
          billingDetails: {
            address: {
              country: "US",
            },
          },
        },
      }}
    />
    <HStack w="$full" justifyContent="flex-end">
      <HStack
        width="$full"
        gap="$3"
        flexDirection={isSmall ? "column-reverse" : "row"}
        justifyContent="flex-end"
        mt="$6"
        minHeight="$12"
      >
        <Button
          variant="solid"
          onPress={onClose}
          bg="$transparent"
          borderWidth={1}
          borderRadius={9}
          minWidth={120}
          $active-bg="$light200"
          borderColor="$content"
        >
          <ButtonText color="$content" fontFamily="$bodyBold">
            Cancel
          </ButtonText>
        </Button>
        <Button
          minWidth={120}
          borderRadius={9}
          $hover-bg="$primary300"
          $active-bg="$primary300"
          isDisabled={!isCompleted || loading}
          onPress={onConfirm}
        >
          {loading ? <ButtonSpinner /> : <ButtonText>Add Card</ButtonText>}
        </Button>
      </HStack>
    </HStack>
  </VStack>
);

export default PaymentWebModalView;
