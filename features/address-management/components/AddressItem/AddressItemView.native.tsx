import {
  ButtonIcon,
  HStack,
  Pressable,
  View,
  Icon,
} from "@gluestack-ui/themed";
import EditIcon from "assets/icons/EditIcon";
import { LocationDotIcon } from "assets/icons/LocationDotIcon";
import TrashIcon from "assets/icons/TrashIcon";
import { testIDs } from "e2e/testIDs";
import React from "react";
import { SwipeListView } from "react-native-swipe-list-view";

import { AddressItemProps } from "./AddressItemView.web";

import { Text } from "@/components/Elements";

const AddressItemView = ({
  iconWhiteColor,
  deleteIconRedColor,
  onEdit,
  addresses,
  onDelete,
}: AddressItemProps) => {
  return (
    <SwipeListView
      testID={testIDs.ACCOUNT.ADDRESS_ITEM}
      swipeRowStyle={{ marginBottom: 8, marginLeft: 8, marginRight: 8 }}
      nestedScrollEnabled
      data={addresses?.map(address => ({ ...address, key: address.id }))}
      renderItem={rowData => (
        <Pressable
          flexDirection="row"
          alignItems="center"
          bg="$white"
          justifyContent="space-between"
          px="$3"
          py="$2"
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
        >
          <View h="$full" pt="$2.5">
            <Icon as={LocationDotIcon(deleteIconRedColor)} />
          </View>
          <Text
            fontSize="$md"
            numberOfLines={2}
            color="$defaultContent"
            width="90%"
            lineHeight="$xl"
            minHeight="$10"
          >
            {rowData.item.address}
          </Text>
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
              onPress={() => onEdit?.(rowData.item.id)}
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
              onPress={() => onDelete?.(rowData.item.id, rowData.item.address)}
            >
              <ButtonIcon as={TrashIcon(iconWhiteColor)} w="$3.5" h="$3.5" />
            </Pressable>
          </HStack>
        </HStack>
      )}
      rightOpenValue={-80}
      disableRightSwipe
    />
  );
};

export default AddressItemView;
