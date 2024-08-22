import { useBreakpointValue } from "@gluestack-style/react";
import { HStack, Image, VStack } from "@gluestack-ui/themed";
import { memo } from "react";

import { StackView, Text } from "@/components/Elements";

const DEFAULT_HEIGHT = 400;
interface Scale {
  height: number;
  left: number;
  top: number;
  mt?: number;
}

const PageHeaderView = () => {
  const displayFull = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
    xl: "row",
  });
  const scale: Scale = useBreakpointValue({
    base: {
      left: 20,
      height: DEFAULT_HEIGHT,
      top: DEFAULT_HEIGHT - 35,
      titleSize: 10,
      contentSize: 10,
    },
    sm: {
      left: 75,
      height: DEFAULT_HEIGHT,
      top: DEFAULT_HEIGHT - 35,
    },
    md: {
      left: DEFAULT_HEIGHT * 0.25,
      height: DEFAULT_HEIGHT * 0.5,
      top: 20,
      mt: 10,
    },
    lg: {
      left: DEFAULT_HEIGHT,
      height: DEFAULT_HEIGHT,
      top: 95,
    },
    xl: {
      left: DEFAULT_HEIGHT * 1.5,
      height: DEFAULT_HEIGHT,
      top: 95,
    },
  });

  return (
    <StackView
      w="100%"
      flex={1}
      display={displayFull}
      justifyContent="space-between"
      minHeight={scale.height}
      bg="$content"
    >
      <HStack width={scale.height * 1.5} height={scale.height}>
        <Image
          source={require("../../assets/images/logo-header.png")}
          width={scale.height * 1.5}
          height={scale.height}
        />
        <HStack position="absolute" right={0} zIndex={1}>
          <Image
            source={require("../../assets/images/shadow-logo.png")}
            width={scale.height}
            height={scale.height}
            alt="shadow-logo"
          />
        </HStack>
      </HStack>
      <VStack
        maxWidth={750}
        position="absolute"
        left={scale.left}
        top={scale.top}
      >
        <VStack px="$5" zIndex={1}>
          <Text
            color="$white"
            fontWeight="bold"
            fontSize="$3xl"
            lineHeight={40}
            fontFamily="$bodyBold"
          >
            <VStack bg="$primary500" alignSelf="center" px="$2" mr="$2">
              <Text
                color="$white"
                fontWeight="bold"
                fontSize="$3xl"
                lineHeight={40}
                fontFamily="$bodyBold"
              >
                Probstein Auctions
              </Text>
            </VStack>
            is one of the largest sellers of sports collectibles and
            memorabilia.
          </Text>
          <Text color="$white" fontSize="$md" mt={scale.mt || "$5"}>
            Since 2005, we have been delivering top-notch service to our
            community. We offer the lowest consignment rates in the industry. We
            ship items quickly and list them promptly. We also handle non-sports
            items such as TCG cards, coins, stamps, and autographs.
          </Text>
          <Text
            color="$white"
            fontWeight="bold"
            fontSize="$md"
            mt={scale.mt ?? "$6"}
            fontFamily="$bodyBold"
          >
            Trust us to sell your items in a professional and efficient manner.
          </Text>
        </VStack>
      </VStack>
      <VStack
        flex={1}
        justifyContent="flex-end"
        alignItems="flex-end"
        height={scale.height}
      >
        <Image
          source={require("../../assets/images/img-header-web.png")}
          width={scale.height * 1.15}
          height={scale.height}
          alt="img-header-web"
        />
      </VStack>
    </StackView>
  );
};

export default memo(PageHeaderView);
