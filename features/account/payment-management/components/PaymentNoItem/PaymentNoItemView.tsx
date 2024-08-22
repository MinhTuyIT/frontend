import { VStack } from "@gluestack-ui/themed";
import NoPayout from "assets/images/no-payout.png";
import { Image } from "expo-image";
import React from "react";
import { DimensionValue } from "react-native";

import { Text } from "@/components/Elements";
interface Props {
  size?: {
    height: DimensionValue;
    width: DimensionValue;
  };
  isSmall?: boolean;
}

const PaymentNoItemView = ({ size, isSmall }: Props) => {
  return (
    <VStack flex={1} alignItems="center" justifyContent="center" mt="$8">
      <Image
        source={NoPayout}
        contentFit="contain"
        transition={300}
        style={size}
      />
      <Text
        color="$defaultColor"
        fontSize={isSmall ? "$3xl" : "$4xl"}
        fontFamily="$bodyBold"
        lineHeight={isSmall ? "$5xl" : "$6xl"}
        mt="$4"
      >
        No Payment Methods
      </Text>
      <Text
        fontSize={isSmall ? "$md" : "$xl"}
        lineHeight="$xl"
        textAlign="center"
        maxWidth={isSmall ? "$72" : undefined}
        color="$abaddonBlack"
      >
        No payment method found. Please add a payment method.
      </Text>
    </VStack>
  );
};

export default PaymentNoItemView;
