import { ButtonIcon, HStack, VStack, View } from "@gluestack-ui/themed";
import { PlusIcon } from "assets/icons/PlusIcon";
import { testIDs } from "e2e/testIDs";
import React from "react";
import { Platform } from "react-native";

import { IAddressProps } from "./AddressContainer";
import AddressItem from "../../components/AddressItem";
import AddressNoItem from "../../components/AddressNoItem";

import { Button, Skeleton, Text } from "@/components/Elements";

const AddressView = ({
  addresses,
  browserMobileWidth,
  loading,
  onOpen,
  onDelete,
  onEdit,
}: IAddressProps) => {
  return (
    <View
      py="$8"
      px="$9"
      bg="$white"
      mb="$10"
      testID={testIDs.ACCOUNT.ADDRESS_VIEW}
    >
      <VStack
        gap="$3"
        width={Platform.OS === "web" ? browserMobileWidth : "100%"}
        mb={Platform.OS === "web" ? 0 : "$20"}
      >
        <HStack
          alignItems="flex-end"
          px={Platform.OS === "web" ? 0 : "$3"}
          justifyContent="space-between"
        >
          <Text color="$defaultContent" fontFamily="$bodyBold">
            Current Address
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
              testID={testIDs.ACCOUNT.ADD_NEW}
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
          </HStack>
        </HStack>
        {loading || (addresses?.length && addresses?.length > 0) ? (
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
              <AddressItem
                addresses={addresses}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            )}
          </VStack>
        ) : (
          <AddressNoItem />
        )}
      </VStack>
    </View>
  );
};

export default AddressView;
