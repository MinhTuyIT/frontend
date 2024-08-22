import { Image, VStack } from "@gluestack-ui/themed";
import { memo } from "react";
import { Dimensions } from "react-native";

import { Text } from "@/components/Elements";

const width = Dimensions.get("screen").width;

const PageHeaderView = () => {
  return (
    <VStack bg="$content">
      <VStack width={width} height={width * 0.67}>
        <Image
          source={require("../../assets/images/logo-header.png")}
          width={width}
          height={width * 0.67}
          alt="log-header"
        />
        <Image
          source={require("../../assets/images/shadow-logo-native.png")}
          width={width}
          position="absolute"
          height={width * 0.33}
          bottom={0}
          alt="shadow-logo-native"
        />
      </VStack>
      <VStack height={400}>
        <VStack
          px="$5"
          position="absolute"
          alignSelf="center"
          top={-25}
          zIndex={1}
        >
          <VStack
            bg="$primary500"
            alignSelf="center"
            alignItems="center"
            mb="$2"
            pt="$2"
            px="$2"
          >
            <Text
              color="$white"
              textAlign="center"
              fontWeight="bold"
              fontSize="$3xl"
              lineHeight="$3xl"
              pb="-$2"
              fontFamily="$bodyBold"
            >
              Probstein Auctions
            </Text>
          </VStack>
          <Text
            color="$white"
            textAlign="center"
            fontWeight="bold"
            fontSize="$3xl"
            lineHeight={40}
            fontFamily="$bodyBold"
          >
            is one of the largest sellers of sports collectibles and
            memorabilia.
          </Text>
          <Text color="$white" textAlign="center" fontSize="$md" mt="$5">
            Since 2005, we have been delivering top-notch service to our
            community. We offer the lowest consignment rates in the industry. We
            ship items quickly and list them promptly. We also handle non-sports
            items such as TCG cards, coins, stamps, and autographs.
          </Text>
          <Text
            color="$white"
            textAlign="center"
            fontWeight="bold"
            fontSize="$md"
            mt="$6"
            fontFamily="$bodyBold"
          >
            Trust us to sell your items in a professional and efficient manner.
          </Text>
        </VStack>
        <VStack position="absolute" bottom={0} right={0}>
          <Image
            source={require("../../assets/images/img-header-native.png")}
            width={width * 0.75}
            height={width * 0.84}
            alt="img-header-native"
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default memo(PageHeaderView);
