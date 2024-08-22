import { useBreakpointValue } from "@gluestack-style/react";
import { HStack, Image, Pressable, Text } from "@gluestack-ui/themed";
import React, { memo } from "react";
import { Dimensions, Platform } from "react-native";
interface AuctionItemProps {
  auction?: any;
  onPressAuction?: (auction: any) => void;
}

const isMobile = Platform.OS !== "web";
const MARGIN = isMobile ? 8 : 10;
const WIDTH_AUCTION = isMobile
  ? (Dimensions.get("window").width - MARGIN * 6) / 2
  : 300;

const auctionTemp = {
  time: 10,
  bid: 934,
  bids: 3,
  title: "2019 Bowman Chrome Green Refractor Joshua Mears RC Rookie AUTO /99",
  uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
};

const AuctionItem = ({ auction, onPressAuction }: AuctionItemProps) => {
  const formWidth = useBreakpointValue({
    base: "100%",
    sm: 420,
    md: 440,
    lg: 520,
    xl: 550,
  });
  return (
    <Pressable onPress={onPressAuction} w={WIDTH_AUCTION} m={MARGIN}>
      <HStack
        bg="#00204A"
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        justifyContent="space-between"
        px="$2"
        py="$1.5"
      >
        <HStack>
          <Text fontSize="$sm" fontWeight="600" color="$white">
            {auctionTemp.time}
          </Text>
          <Text fontSize="$sm"> Days</Text>
        </HStack>
        <HStack>
          <Text fontSize="$sm">Bid </Text>
          <Text fontSize="$sm" fontWeight="600" color="$white">
            {auctionTemp.bid}
          </Text>
        </HStack>
        <HStack>
          <Text fontSize="$sm">Bids </Text>
          <Text fontSize="$sm" fontWeight="600" color="$white">
            {auctionTemp.bids}
          </Text>
        </HStack>
      </HStack>
      <Image
        size="md"
        h={200}
        accessible
        width={WIDTH_AUCTION}
        borderBottomLeftRadius={8}
        borderBottomRightRadius={8}
        alt="Alternate text that will be read be screen readers"
        accessibilityLabel={auctionTemp.title}
        source={{
          uri: auctionTemp.uri,
        }}
      />
      <HStack
        rounded={15}
        h={30}
        borderWidth={1}
        borderColor="$primary500"
        mt="$4"
        px="$3.5"
        alignItems="center"
        flexGrow={1}
        alignSelf="flex-start"
        mb="$1.5"
      >
        <Text color="$primary500">{"Grade: "}</Text>
        <Text color="$primary500">PSA 10</Text>
      </HStack>
      <Text numberOfLines={2}>{auctionTemp.title}</Text>
    </Pressable>
  );
};

export default memo(AuctionItem);
