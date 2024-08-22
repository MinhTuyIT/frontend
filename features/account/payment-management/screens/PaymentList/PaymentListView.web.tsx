import { ApolloQueryResult } from "@apollo/client";
import { ButtonIcon, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PlusIcon } from "assets/icons/PlusIcon";
import React from "react";
import { DimensionValue, Platform } from "react-native";

import PaymentItem from "../../components/PaymentItem";
import PaymentNoItem from "../../components/PaymentNoItem";

import { Button, Model, Skeleton, Text } from "@/components/Elements";
import { PaymentWebModal } from "@/features/account";
import { AuthMeQuery, PaymentMethod } from "@/generated/graphql";
export interface IPaymentProps {
  payments?: PaymentMethod[];
  browserMobileWidth?: DimensionValue;
  onOpen?: () => void;
  loading?: boolean;
  onDelete?: (payment?: PaymentMethod) => void;
  isOpen?: boolean;
  onClose: () => void;
  createSetupIntent?: string;
  handleDisplayToast?: ({
    action,
    description,
  }: {
    action?: "success" | "error" | "warning" | "info" | "attention" | undefined;
    description: string;
  }) => void;
  fetchData: () => void;
  onOpenModal: () => void;
  userInfo?: AuthMeQuery;
  refetchUser?: () => Promise<ApolloQueryResult<AuthMeQuery>>;
}

const stripePromise = loadStripe(
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const PaymentListView = ({
  payments,
  loading,
  onOpen,
  onDelete,
  isOpen,
  onClose,
  createSetupIntent,
  handleDisplayToast,
  fetchData,
  userInfo,
  refetchUser,
}: IPaymentProps) => {
  return (
    <ScrollView py="$8" px="$9" bg="$white">
      <Text fontSize="$2xl" color="$textAccountTitle" fontFamily="$bodyBold">
        Payment Methods
      </Text>
      <VStack
        gap="$3"
        pt="$3"
        width="100%"
        maxWidth="$237"
        mb={Platform.OS === "web" ? 0 : "$20"}
      >
        <HStack
          alignItems="flex-end"
          px={Platform.OS === "web" ? 0 : "$3"}
          justifyContent="space-between"
        >
          <Text
            color="$defaultContent"
            fontFamily="$bodyBold"
            h="$4.5"
            lineHeight="$xl"
          >
            Cards
          </Text>
          <HStack alignItems="center" gap="$2">
            <Text
              color="$defaultContent"
              fontFamily="$bodyBold"
              onPress={onOpen}
            >
              Add New
            </Text>
            <Button
              bg="$bgButtonGray91"
              size="sm"
              rounded="$sm"
              px="$1.5"
              maxHeight="$6.5"
              w="$6.5"
              py="$1.5"
              onPress={onOpen}
            >
              <ButtonIcon as={PlusIcon} maxWidth="$2.5" maxHeight="$2.5" />
            </Button>
            {createSetupIntent && (
              <Model
                isOpen={isOpen}
                footerProps={{
                  display: "none",
                }}
              >
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: createSetupIntent,
                    appearance: {
                      rules: {
                        ".Input": {
                          borderWidth: "2px",
                        },
                        ".Input:focus": {
                          boxShadow: "none",
                          borderWidth: "2px",
                          borderColor: "initial",
                        },
                        ".scan-card-button": {
                          display: "none",
                        },
                      },
                    },
                    locale: "en",
                  }}
                >
                  <PaymentWebModal
                    isOpen={isOpen}
                    onClose={onClose}
                    createSetupIntent={createSetupIntent}
                    handleDisplayToast={handleDisplayToast}
                    fetchData={fetchData}
                    refetchUser={refetchUser}
                    userInfo={userInfo}
                  />
                </Elements>
              </Model>
            )}
          </HStack>
        </HStack>
        {loading || (payments?.length && payments.length > 0) ? (
          <VStack width="100%" gap="$3" bg="$bgSecondary" rounded="$lg" p="$2">
            {loading
              ? [...Array(5)].map((d, i) => (
                  <Skeleton height={58} loading={loading} key={i} />
                ))
              : payments?.map(payment => {
                  return (
                    <PaymentItem
                      key={payment.id}
                      payment={payment}
                      onDelete={onDelete}
                    />
                  );
                })}
          </VStack>
        ) : (
          <PaymentNoItem />
        )}
      </VStack>
    </ScrollView>
  );
};

export default PaymentListView;
