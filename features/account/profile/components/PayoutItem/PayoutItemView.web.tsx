import { Box, ButtonIcon, HStack, Text, VStack } from "@gluestack-ui/themed";
import EditIcon from "assets/icons/EditIcon";
import TrashIcon from "assets/icons/TrashIcon";
import React, { memo } from "react";

import { Button, Hoverable } from "@/components/Elements";
import { PayoutMethod, PayoutType } from "@/generated/graphql";
import { formatPaymentMethod } from "@/utils/format";

export interface PayoutItemProps {
  iconWhiteColor?: string;
  deleteIconRedColor?: string;
  payouts?: PayoutMethod[];
  disabledAction?: boolean;
  payout?: PayoutMethod;
  handleEditPayoutMethod?: (id: string) => void;
  loading?: boolean;
  handleDeletePayoutMethod?: (payout: PayoutMethod) => void;
}

const PayoutItemView = ({
  disabledAction,
  payout,
  handleEditPayoutMethod,
  handleDeletePayoutMethod,
}: PayoutItemProps) => (
  <Hoverable bgHover="$trueGray50" rounded="$xl">
    <VStack
      alignItems="center"
      justifyContent="space-between"
      px="$2.5"
      py="$3.5"
      rounded="$xl"
      hardShadow="5"
      flexDirection="row"
      testID={payout?.id}
    >
      <HStack alignItems="center" gap="$4" width="80%">
        <Box width="20%" minWidth="$13">
          <Text fontFamily="$bodyBold">
            {formatPaymentMethod(payout?.type ?? "")}
          </Text>
        </Box>
        {payout?.type === PayoutType.Paypal ? (
          <Text
            width="100%"
            fontSize="$md"
            numberOfLines={1}
            isTruncated
            color="$defaultContent"
          >
            {payout.detail?.email}
          </Text>
        ) : (
          <>
            <Text
              width="30%"
              fontSize="$md"
              numberOfLines={1}
              isTruncated
              color="$defaultContent"
            >
              {payout?.detail?.bankName}
            </Text>
            <Text
              width="30%"
              fontSize="$md"
              numberOfLines={1}
              isTruncated
              color="$defaultContent"
            >
              {payout?.detail?.accountNumber}
            </Text>
          </>
        )}
      </HStack>
      {!disabledAction && (
        <HStack alignItems="center" gap="$3">
          <Button
            bg="$bgButtonGray91"
            size="sm"
            rounded="$sm"
            px="$1.5"
            maxHeight={26}
            py="$1.5"
            onPress={() => handleEditPayoutMethod?.(payout?.id ?? "")}
            testID={`${payout?.id}_EDIT_BUTTON`}
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
            onPress={() =>
              handleDeletePayoutMethod?.(payout ?? ({} as PayoutMethod))
            }
            testID={`${payout?.id}_DELETE_BUTTON`}
          >
            <ButtonIcon as={TrashIcon()} w="$3" h="$3" />
          </Button>
        </HStack>
      )}
    </VStack>
  </Hoverable>
);

export default memo(PayoutItemView);
