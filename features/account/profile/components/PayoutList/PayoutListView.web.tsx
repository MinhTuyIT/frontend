import { Box, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
import { PlusIcon } from "lucide-react-native";
import React from "react";
import { Platform } from "react-native";

import PayoutItem from "../PayoutItem";
import PayoutNoItem from "../PayoutNoItem";

import { Button, Skeleton, Text } from "@/components/Elements";
import { PayoutMethod } from "@/generated/graphql";

export interface IPayoutProps {
  payouts?: PayoutMethod[];
  handleAddNew: () => void;
  handleEditPayoutMethod: (id: string) => void;
  handleDeletePayoutMethod: (payout: PayoutMethod) => void;
  loading?: boolean;
}

const PayoutListView = ({
  payouts,
  handleAddNew,
  handleEditPayoutMethod,
  handleDeletePayoutMethod,
  loading,
}: IPayoutProps) => (
  <ScrollView bg="$white" maxWidth="$237">
    <VStack
      gap="$3"
      pt="$3"
      width="100%"
      maxWidth="$237"
      mb={Platform.OS === "web" ? 0 : "$20"}
      overflow="hidden"
    >
      <HStack
        alignItems="flex-end"
        px={Platform.OS === "web" ? 0 : "$3"}
        justifyContent="space-between"
      >
        <Text fontSize="$sm" color="$textAccountTitle" fontFamily="$bodyBold">
          Payout Methods
        </Text>
        <HStack alignItems="center" gap="$2">
          <Text
            color="$defaultContent"
            fontFamily="$bodyBold"
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
            <PlusIcon size={12} />
          </Button>
        </HStack>
      </HStack>
      {loading || !!payouts?.length ? (
        <Box
          width="100%"
          gap="$3"
          bg={!!payouts?.length ? "$bgSecondary" : "$white"}
          rounded="$lg"
          p="$2"
          maxHeight="$84"
          overflowY={
            payouts?.length && payouts.length > 5 ? "scroll" : "hidden"
          }
        >
          {loading
            ? [...Array(5)].map((d, i) => (
                <Skeleton height={58} loading={loading} key={i} />
              ))
            : payouts?.map(payout => {
                return (
                  <PayoutItem
                    key={payout.id}
                    payouts={payouts}
                    payout={payout}
                    handleEditPayoutMethod={handleEditPayoutMethod}
                    handleDeletePayoutMethod={handleDeletePayoutMethod}
                  />
                );
              })}
        </Box>
      ) : (
        <PayoutNoItem />
      )}
    </VStack>
  </ScrollView>
);

export default PayoutListView;
