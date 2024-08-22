import { ButtonIcon, HStack, Icon, Text, VStack } from "@gluestack-ui/themed";
import EditIcon from "assets/icons/EditIcon";
import { LocationDotIcon } from "assets/icons/LocationDotIcon";
import TrashIcon from "assets/icons/TrashIcon";
import { testIDs } from "e2e/testIDs";
import React from "react";

import { Button, Hoverable } from "@/components/Elements";

export interface AddressItemProps {
  iconWhiteColor?: string;
  deleteIconRedColor?: string;
  onEdit?: (id?: string) => void;
  addressId?: string;
  address?: {
    address: string;
    id: string | undefined;
    zip: string | undefined;
  };
  addresses?:
    | {
        address: string;
        id: string | undefined;
        zip: string | undefined;
      }[]
    | null;
  onDelete?: (id?: string, address?: string) => void;
}

const AddressItemView = ({
  deleteIconRedColor,
  address,
  onDelete,
  addressId,
  onEdit,
}: AddressItemProps) => {
  return (
    <Hoverable bgHover="$trueGray50" rounded="$xl">
      <VStack
        alignItems="center"
        justifyContent="space-between"
        px="$6"
        pr="$2.5"
        py="$4"
        rounded="$xl"
        hardShadow="5"
        data-testid={testIDs.ACCOUNT.ADDRESS_ITEM}
        flexDirection="row"
        $focus-pointerEvents="box-only"
      >
        <HStack gap="$2" width="80%">
          <Text lineHeight="$lg">
            <Icon as={LocationDotIcon(deleteIconRedColor)} />
          </Text>
          <Text fontSize="$md" color="$defaultContent" lineHeight="$lg">
            {address?.address}
          </Text>
        </HStack>
        <HStack alignItems="center" gap="$3">
          <Button
            bg="$bgButtonGray91"
            size="sm"
            rounded="$sm"
            px="$1.5"
            maxHeight={26}
            py="$1.5"
            onPress={() => onEdit?.(addressId)}
          >
            <ButtonIcon as={EditIcon()} w="$3" h="$3" />
          </Button>
          <Button
            bg="$bgButtonGray91"
            size="sm"
            rounded="$sm"
            px="$1.5"
            maxHeight={26}
            py="$1.5"
            onPress={() => onDelete?.(addressId, address?.address)}
          >
            <ButtonIcon as={TrashIcon()} w="$3" h="$3" />
          </Button>
        </HStack>
      </VStack>
    </Hoverable>
  );
};

export default AddressItemView;
