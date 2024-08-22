import { ButtonIcon, HStack, VStack } from "@gluestack-ui/themed";
import TrashIcon from "assets/icons/TrashIcon";
import { Image } from "expo-image";
import React, { memo } from "react";
import { DimensionValue } from "react-native";

import { Button, Hoverable, Text } from "@/components/Elements";
import { PaymentMethod } from "@/generated/graphql";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { getPaymentLogoURL } from "@/utils/getPaymentLogoURL";

export interface PaymentItemProps {
  iconWhiteColor?: string;
  deleteIconRedColor?: string;
  payments?: PaymentMethod[];
  disabledAction?: boolean;
  payment?: PaymentMethod;
  onDelete?: (payment?: PaymentMethod) => void;
  heightImage?: DimensionValue;
  widthImage: DimensionValue;
}

const PaymentItemView = ({
  disabledAction,
  payment,
  onDelete,
  widthImage,
  heightImage,
}: PaymentItemProps) => {
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
        flexDirection="row"
      >
        <HStack alignItems="center" gap="$14" width="80%">
          <HStack alignItems="center" gap="$2" w="$20">
            <Image
              style={{ width: widthImage, height: heightImage }}
              source={getPaymentLogoURL(payment?.details?.brand)}
              contentFit="contain"
              alt="Payment-logo"
            />
            <Text
              fontFamily="$bodyBold"
              fontSize="$sm"
              color="$defaultContent"
              lineHeight="$xl"
            >
              {capitalizeWords(payment?.details?.brand)}
            </Text>
          </HStack>
          <Text
            fontSize="$md"
            numberOfLines={1}
            color="$defaultContent"
            flex={1}
          >
            Ending in {payment?.details?.last4}
          </Text>
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
              onPress={() => onDelete?.(payment)}
            >
              <ButtonIcon as={TrashIcon()} w="$3" h="$3" />
            </Button>
          </HStack>
        )}
      </VStack>
    </Hoverable>
  );
};

export default memo(PaymentItemView);
