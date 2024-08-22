import { useBreakpointValue } from "@gluestack-style/react";
import { HStack, Image, VStack } from "@gluestack-ui/themed";

import Row from "./components/Row";

import { Text } from "@/components/Elements";
import { StackView } from "@/components/index";
import { WIDTH } from "@/config/constants";
const DEFAULT_HEIGHT = 318;

interface Scale {
  height: number;
  mr: number;
  mt: number;
}

const PageFooterView = () => {
  const displayType = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "column",
    lg: "column",
    xl: "row",
  });
  const displayFull = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
    xl: "row",
  });

  const scale: Scale = useBreakpointValue({
    base: {
      height: DEFAULT_HEIGHT,
      mr: 82,
      mt: 38,
    },
    sm: {
      height: DEFAULT_HEIGHT,
      mr: 20,
      mt: 38,
    },
    md: {
      height: DEFAULT_HEIGHT * 0.75,
      mr: 20,
      mt: 10,
    },
    lg: {
      height: DEFAULT_HEIGHT * 0.75,
      mr: 20,
      mt: 10,
    },
    xl: {
      height: DEFAULT_HEIGHT,
      mr: 82,
      mt: 38,
    },
  });

  return (
    <StackView
      display={displayFull}
      w="$full"
      minHeight={scale.height}
      bgColor="$primary500"
      justifyContent="space-between"
    >
      <StackView
        display={displayType}
        mt={scale.mt}
        ml={displayType === "column" && displayFull === "row" ? 80 : undefined}
        alignItems={displayFull === "row" ? "flex-start" : "center"}
      >
        <VStack
          minWidth={displayFull === "column" ? WIDTH : 300}
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            source={require("../../assets/images/logo-footer.png")}
            w={170}
            h={22}
            alt="logo-footer"
            alignSelf={displayFull === "column" ? "center" : "flex-end"}
          />
        </VStack>
        <VStack
          alignSelf={displayFull === "column" ? "center" : undefined}
          mt={displayFull === "column" ? "$6" : undefined}
          px="$3"
        >
          <Text fontWeight="bold" opacity={0.5} color="$white">
            CONTACT INFO
          </Text>
          <HStack gap={displayFull === "row" ? scale.mr : "$2"}>
            <VStack>
              <Row label="973-747-6304" />
              <Row label="rickprobstein1@gmail.com" />
              <Row label="P.O. Box 1079 Clifton," />
              <Text alignSelf="flex-start" color="$white">
                NJ 07014
              </Text>
              <Row label="9 AM - 5 PM" />
            </VStack>
            <VStack flex={1} ml={displayFull === "row" ? 0 : "$2"}>
              <VStack>
                <Row label="Terms of Service" />
                <Row label="Privacy Policy" />
                <Row label="Submit your consignment" />
                <Row label="Auctions" />
              </VStack>
            </VStack>
          </HStack>
        </VStack>
      </StackView>
      <VStack
        mr="$12"
        alignSelf={displayFull === "column" ? "center" : undefined}
      >
        <VStack w="$full" position="absolute" zIndex={1} bottom={35}>
          <Text alignSelf="flex-end" color="$white">
            © {new Date().getFullYear()} Probstein. All Rights Reserved.
          </Text>
        </VStack>
        <Image
          source={require("../../assets/images/img-footer-web.png")}
          w={scale.height * 1.32}
          h={scale.height}
          alt="img-footer-web"
          alignSelf="flex-end"
        />
      </VStack>
    </StackView>
  );
};

export default PageFooterView;
