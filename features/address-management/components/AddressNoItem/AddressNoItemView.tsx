import { VStack } from "@gluestack-ui/themed";
import NoAddress from "assets/images/no-address.png";
import { testIDs } from "e2e/testIDs";
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

const AddressNoItemView = ({ size, isSmall }: Props) => {
  return (
    <VStack
      flex={1}
      alignItems="center"
      justifyContent="center"
      my={isSmall ? "$25" : "$8"}
    >
      <Image
        source={NoAddress}
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
        testID={testIDs.ACCOUNT.ADDRESS_ITEM_EMPTY}
      >
        No Addresses
      </Text>
      <Text
        fontSize={isSmall ? "$md" : "$xl"}
        lineHeight="$xl"
        textAlign="center"
        color="$defaultContent"
      >
        No address provided. Please update your address.
      </Text>
    </VStack>
  );
};

export default AddressNoItemView;
