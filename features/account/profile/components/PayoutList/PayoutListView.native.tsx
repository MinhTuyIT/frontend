import { AntDesign } from "@expo/vector-icons";
import { HStack, VStack, View } from "@gluestack-ui/themed";
import React from "react";

import { IPayoutProps } from "./PayoutListView.web";
import PayoutItem from "../PayoutItem";
import PayoutNoItem from "../PayoutNoItem";

import { Button, Skeleton, Text } from "@/components/Elements";

const PayoutListView = ({
  payouts,
  handleAddNew,
  handleEditPayoutMethod,
  handleDeletePayoutMethod,
  loading,
}: IPayoutProps) => (
  <View bg="$white">
    <VStack gap="$3" width="100%">
      <HStack
        alignItems="flex-end"
        px="$3"
        justifyContent="space-between"
        width="100%"
      >
        <Text fontSize="$sm" color="$textAccountTitle" fontFamily="$bodyBold">
          Payout Methods
        </Text>
        <HStack alignItems="center" gap="$2">
          <Text
            color="$defaultContent"
            fontFamily="$bodyBold"
            lineHeight="$xl"
            onPress={handleAddNew}
          >
            Add New
          </Text>
          <Button
            bg="$bgButtonGray91"
            size="sm"
            rounded="$sm"
            px="$1.5"
            maxHeight={26}
            py="$1.5"
            onPress={handleAddNew}
          >
            <AntDesign name="plus" size={12} />
          </Button>
        </HStack>
      </HStack>
      {loading || !!payouts?.length ? (
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
            <VStack
              width="100%"
              gap="$3"
              bg="$bgSecondary"
              rounded="$lg"
              py="$2"
            >
              <PayoutItem
                payouts={payouts}
                handleEditPayoutMethod={handleEditPayoutMethod}
                handleDeletePayoutMethod={handleDeletePayoutMethod}
              />
            </VStack>
          )}
        </VStack>
      ) : (
        <PayoutNoItem />
      )}
    </VStack>
  </View>
);

export default PayoutListView;
