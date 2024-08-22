import { Box, ButtonIcon, HStack, Pressable } from "@gluestack-ui/themed";
import TrashIcon from "assets/icons/TrashIcon";
import { Image } from "expo-image";
import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";

import { PaymentItemProps } from "./PaymentItemView.web";

import { Text } from "@/components/Elements";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { getPaymentLogoURL } from "@/utils/getPaymentLogoURL";

const PaymentItemView = ({
  iconWhiteColor,
  payments,
  disabledAction,
  onDelete,
  widthImage,
  heightImage,
}: PaymentItemProps) => {
  return (
    <SwipeListView
      swipeRowStyle={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}
      nestedScrollEnabled
      data={payments?.map(payment => ({
        ...payment,
        key: payment.id,
      }))}
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
          <Box width="$25">
            <HStack alignItems="center" gap="$2">
              <Image
                style={{ width: widthImage, height: heightImage }}
                source={getPaymentLogoURL(data?.item?.details?.brand)}
                contentFit="contain"
                alt="Payment-logo"
              />
              <Text
                fontFamily="$bodyBold"
                fontSize="$sm"
                color="$defaultContent"
                lineHeight="$xl"
              >
                {capitalizeWords(data?.item?.details?.brand)}
              </Text>
            </HStack>
          </Box>
          <Text fontSize="$sm" color="$defaultContent" lineHeight="$xl">
            Ending in {data?.item?.details?.last4}
          </Text>
        </Pressable>
      )}
      renderHiddenItem={rowData => (
        <HStack
          justifyContent="flex-end"
          bg="$error600"
          minHeight="$18"
          rounded="$2xl"
          overflow="hidden"
        >
          <HStack alignContent="flex-end" justifyContent="flex-end">
            <Pressable
              width="$12"
              bg="$error600"
              borderBottomRightRadius="$lg"
              borderTopRightRadius="$lg"
              alignItems="center"
              justifyContent="center"
              id={rowData.item.key}
              onPress={() => onDelete?.(rowData.item)}
            >
              <ButtonIcon as={TrashIcon(iconWhiteColor)} w="$3.5" h="$3.5" />
            </Pressable>
          </HStack>
        </HStack>
      )}
      rightOpenValue={-50}
      disableRightSwipe
      disableLeftSwipe={disabledAction}
    />
  );
};

export default PaymentItemView;
