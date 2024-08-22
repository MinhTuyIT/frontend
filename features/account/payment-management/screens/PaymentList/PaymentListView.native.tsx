import { ApolloQueryResult } from "@apollo/client";
import { ButtonIcon, HStack, VStack, View } from "@gluestack-ui/themed";
import { PlusIcon } from "assets/icons/PlusIcon";
import React from "react";
import { DimensionValue } from "react-native";

import PaymentItem from "../../components/PaymentItem";
import PaymentNoItem from "../../components/PaymentNoItem";

import { Button, Skeleton, Text } from "@/components/Elements";
import { AuthMeQuery, PaymentMethod } from "@/generated/graphql";

export interface IPaymentNativeProps {
  payments?: PaymentMethod[];
  browserMobileWidth?: DimensionValue;
  onOpen?: () => void;
  loading?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  onDelete?: () => void;
  createSetupIntent?: string;
  handleDisplayToast?: ({
    action,
    description,
  }: {
    action?: "success" | "error" | "warning" | "info" | "attention" | undefined;
    description: string;
  }) => void;
  fetchData?: () => void;
  loadingOpenModal?: boolean;
  userInfo?: AuthMeQuery;
  refetchUser?: () => Promise<ApolloQueryResult<AuthMeQuery>>;
}

const PaymentListView = ({
  payments,
  loading,
  onOpen,
  onDelete,
  loadingOpenModal,
}: IPaymentNativeProps) => {
  return (
    <View py="$8" px="$9" bg="$white">
      <VStack gap="$3" width="100%" mb="$30">
        <HStack alignItems="flex-end" px="$3" justifyContent="space-between">
          <Text color="$defaultContent" fontFamily="$bodyBold" lineHeight="$xl">
            Cards
          </Text>
          <HStack alignItems="center" gap="$2">
            <Text
              color="$defaultContent"
              fontFamily="$bodyBold"
              lineHeight="$xl"
              onPress={!loadingOpenModal ? onOpen : undefined}
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
              isDisabled={loadingOpenModal}
            >
              <ButtonIcon as={PlusIcon} maxWidth="$2.5" maxHeight="$2.5" />
            </Button>
          </HStack>
        </HStack>
        {loading || (payments?.length && payments.length > 0) ? (
          <VStack
            width="100%"
            gap="$3"
            bg="$bgSecondary"
            rounded="$lg"
            py="$2"
            maxHeight={410}
            px={loading ? "$2" : undefined}
          >
            {loading ? (
              [...Array(5)].map((d, i) => (
                <Skeleton height={58} loading={loading} key={i} />
              ))
            ) : (
              <PaymentItem payments={payments} onDelete={onDelete} />
            )}
          </VStack>
        ) : (
          <VStack mt="$25">
            <PaymentNoItem />
          </VStack>
        )}
      </VStack>
    </View>
  );
};

export default PaymentListView;
