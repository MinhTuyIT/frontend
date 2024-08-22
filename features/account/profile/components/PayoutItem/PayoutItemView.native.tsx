import {
  Box,
  ButtonIcon,
  HStack,
  Pressable,
  VStack,
} from "@gluestack-ui/themed";
import EditIcon from "assets/icons/EditIcon";
import TrashIcon from "assets/icons/TrashIcon";
import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";

import { PayoutItemProps } from "./PayoutItemView.web";

import { Text } from "@/components/Elements";
import { PayoutMethod, PayoutType } from "@/generated/graphql";
import { formatPaymentMethod } from "@/utils/format";

const PayoutItemView = ({
  iconWhiteColor,
  payouts,
  disabledAction,
  handleEditPayoutMethod,
  handleDeletePayoutMethod,
}: PayoutItemProps) => (
  <VStack maxHeight="$100">
    <SwipeListView
      swipeRowStyle={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}
      data={payouts?.map(payout => ({
        key: payout.id,
        accountNumber: payout.detail?.accountNumber,
        bankName: payout.detail?.bankName,
        type: payout.type,
        email: payout.detail?.email,
      }))}
      nestedScrollEnabled
      renderItem={data => (
        <Pressable
          alignItems="center"
          bg="$white"
          justifyContent="space-between"
          px="$3.5"
          py="$3.5"
          minHeight="$18"
          rounded="$xl"
          shadowColor="$shadow"
          shadowOffset={{
            width: 0,
            height: 1,
          }}
          shadowOpacity="$10"
          elevation="$1"
          shadowRadius="$1"
          $hover-bg="$trueGray50"
          flexDirection="row"
        >
          <Box width="20%" minWidth="$13">
            <Text
              fontFamily="$bodyBold"
              fontSize="$sm"
              color="$defaultContent"
              lineHeight="$xl"
            >
              {formatPaymentMethod(data.item.type ?? "")}
            </Text>
          </Box>

          {data.item?.type === PayoutType.Paypal ? (
            <Text
              fontSize="$sm"
              color="$defaultContent"
              lineHeight="$xl"
              width="80%"
              isTruncated
            >
              {data.item.email}
            </Text>
          ) : (
            <>
              <Text
                fontSize="$sm"
                color="$defaultContent"
                lineHeight="$xl"
                width="40%"
                isTruncated
              >
                {data.item.bankName}
              </Text>
              <Text
                fontSize="$sm"
                color="$defaultContent"
                lineHeight="$xl"
                isTruncated
                width="40%"
              >
                {data.item?.accountNumber}
              </Text>
            </>
          )}
        </Pressable>
      )}
      renderHiddenItem={rowData => (
        <HStack
          justifyContent="flex-end"
          bg="$bgMobileEditAccount"
          minHeight="$18"
          rounded="$2xl"
          overflow="hidden"
        >
          <HStack alignContent="flex-end" justifyContent="flex-end">
            <Pressable
              width="$10"
              bg="$bgMobileEditAccount"
              alignItems="center"
              justifyContent="center"
              id={rowData.item.key}
              onPress={() => {
                handleEditPayoutMethod?.(rowData.item.key);
              }}
            >
              <ButtonIcon as={EditIcon(iconWhiteColor)} w="$3.5" h="$3.5" />
            </Pressable>
            <Pressable
              width="$10"
              bg="$error600"
              borderBottomRightRadius="$lg"
              borderTopRightRadius="$lg"
              alignItems="center"
              justifyContent="center"
              id={rowData.item.key}
              onPress={() => {
                handleDeletePayoutMethod?.({
                  id: rowData.item.key,
                  detail: {
                    accountNumber: rowData.item.accountNumber,
                    email: rowData.item.email,
                    bankName: rowData.item.bankName,
                  },
                  type: rowData.item.type,
                } as PayoutMethod);
              }}
            >
              <ButtonIcon as={TrashIcon(iconWhiteColor)} w="$3.5" h="$3.5" />
            </Pressable>
          </HStack>
        </HStack>
      )}
      rightOpenValue={-80}
      disableRightSwipe
      disableLeftSwipe={disabledAction}
    />
  </VStack>
);

export default PayoutItemView;
