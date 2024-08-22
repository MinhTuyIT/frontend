import { ButtonIcon, HStack, ScrollView, VStack } from "@gluestack-ui/themed";
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
  onOpen,
  loading,
  onDelete,
  onEdit,
}: IAddressProps) => {
  return (
    <ScrollView
      py="$8"
      px="$9"
      bg="$white"
      data-testid={testIDs.ACCOUNT.ADDRESS_VIEW}
    >
      <Text fontSize="$2xl" color="$textAccountTitle" fontFamily="$bodyBold">
        Addresses
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
          <Text color="$defaultContent" fontFamily="$bodyBold" h="$4.5">
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
              bg="$bgButtonGray91"
              size="sm"
              rounded="$sm"
              px="$1.5"
              maxHeight="$6.5"
              w="$6.5"
              py="$1.5"
              onPress={onOpen}
              testID={testIDs.ACCOUNT.ADD_NEW}
            >
              <ButtonIcon as={PlusIcon} maxWidth="$2.5" maxHeight="$2.5" />
            </Button>
          </HStack>
        </HStack>
        {loading || (addresses?.length && addresses?.length > 0) ? (
          <ScrollView
            p="$2"
            bg="$bgSecondary"
            rounded="$lg"
            width="100%"
            maxHeight={355}
          >
            <VStack width="100%" gap="$3">
              {loading
                ? [...Array(5)].map((d, i) => (
                    <Skeleton height={58} loading={loading} key={i} />
                  ))
                : addresses?.map(address => (
                    <AddressItem
                      key={address.id}
                      address={address}
                      addressId={address.id}
                      onDelete={onDelete}
                      onEdit={onEdit}
                    />
                  ))}
            </VStack>
          </ScrollView>
        ) : (
          <AddressNoItem />
        )}
      </VStack>
    </ScrollView>
  );
};

export default AddressView;
