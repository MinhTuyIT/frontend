import { HStack, Image, VStack } from "@gluestack-ui/themed";
import { Dimensions } from "react-native";

import Row from "./components/Row";

import { Text } from "@/components/Elements";
const width = Dimensions.get("screen").width;
const WIDTH_LOGO = width / 2;
const WIDTH_IMAGE = width / 3;

const PageFooterView = () => {
  return (
    <>
      <VStack w="$full" bgColor="$primary500" justifyContent="space-between">
        <VStack mt="$7.5">
          <Image
            source={require("../../assets/images/logo-footer.png")}
            w={WIDTH_LOGO}
            h={WIDTH_LOGO / 8}
            alt="logo-footer"
            alignSelf="center"
          />
        </VStack>
        <VStack width={width} mt="$6">
          <Text ml="$5" opacity={0.5} color="$white" fontFamily="$bodyBold">
            CONTACT INFO
          </Text>
          <HStack>
            <VStack mr="$1" pl="$5">
              <Row label="973-747-6304" />
              <Row label="rickprobstein1@gmail.com" />
              <Row label="P.O. Box 1079 Clifton," />
              <Text alignSelf="flex-start" color="$white">
                NJ 07014
              </Text>
              <Row label="9 AM - 5 PM" />
            </VStack>
            <VStack ml="$5">
              <VStack>
                <Row label="Terms of Service" />
                <Row label="Privacy Policy" />
                <Row label="Submit your consignment" />
                <Row label="Auctions" />
              </VStack>
              <Image
                source={require("../../assets/images/img-footer.png")}
                w={WIDTH_IMAGE}
                h={WIDTH_IMAGE - 5}
                alt="img-footer"
                alignSelf="flex-end"
              />
            </VStack>
          </HStack>
        </VStack>
        <VStack
          position="absolute"
          zIndex={1}
          w="$full"
          bottom={WIDTH_IMAGE / 3}
        >
          <Text alignSelf="center" color="$white">
            © {new Date().getFullYear()} Probstein. All Rights Reserved.
          </Text>
        </VStack>
      </VStack>
    </>
  );
};

export default PageFooterView;
