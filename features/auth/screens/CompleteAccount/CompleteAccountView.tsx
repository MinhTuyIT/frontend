import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  HStack,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import Constants from "expo-constants";
import { Link } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import completeAccountBackgroundImage from "../../../../assets/images/img-sign-in-background.png";
import googleLogo from "../../../../assets/images/logo-google.png";
import logo from "../../../../assets/images/logo.png";
import CompleteAccountForm from "./components/CompleteAccountForm";

const statusBarHeight = Constants.statusBarHeight;

export interface CompleteAccountFormInput {
  email: string;
  password: string;
}

interface CompleteAccountViewProps {
  control: Control<CompleteAccountFormInput>;
  errors: FieldErrors<CompleteAccountFormInput>;
  isDisabled: boolean;
  doSubmit: () => void;
  password: string;
  height?: number;
  width?: number;
  widthBp?: number;
  widthCompleteAccountModal?: number;
  margin?: number;
  white: string;
}

const isMobile = Platform.OS !== "web";

const CompleteAccountView: React.FC<CompleteAccountViewProps> = ({
  control,
  errors,
  doSubmit,
  password,
  height,
  width,
  widthBp,
  widthCompleteAccountModal,
  margin,
  white,
  isDisabled,
}) => (
  <VStack
    justifyContent="center"
    alignItems="center"
    width={width}
    height={(height ?? 0) + statusBarHeight}
    bg="$bgMobileEditAccount"
  >
    <ImageBackground
      source={completeAccountBackgroundImage}
      style={{
        flex: 1,
        justifyContent: "center",
        width,
        height: (height ?? 0) + statusBarHeight,
      }}
      alt="complete-account-background"
    >
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          height,
          margin,
          minWidth: widthBp,
        }}
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <VStack
            justifyContent="center"
            alignItems="center"
            width={width}
            minHeight={height}
            pb={statusBarHeight}
          >
            <VStack
              backgroundColor="$white"
              padding="$10"
              paddingHorizontal={Platform.OS === "web" ? "$10" : "$6"}
              borderRadius="$xl"
              width={widthCompleteAccountModal}
              alignItems="center"
            >
              <Image
                source={logo}
                height={22}
                width={177}
                alt="logo"
                style={{
                  resizeMode: "contain",
                }}
              />
              <VStack width="100%" mt="$3.5">
                <Text
                  color="$abaddonBlack"
                  fontSize={Platform.OS === "web" ? "$2xl" : "$xl"}
                  py={Platform.OS === "web" ? "$2.875" : "$1.875"}
                  letterSpacing={0}
                  fontFamily="$bodyBold"
                  mb={Platform.OS === "web" ? "$6" : 0}
                >
                  Complete Your Account
                </Text>
                <CompleteAccountForm
                  control={control}
                  errors={errors}
                  doSubmit={doSubmit}
                  password={password}
                  isDisabled={isDisabled}
                />
                <Text
                  my={14}
                  fontFamily="$bodyBold"
                  textAlign="center"
                  fontSize="$sm"
                  py="$0.5"
                >
                  OR
                </Text>
                <Button
                  variant="solid"
                  action="primary"
                  bgColor="$abaddonBlack"
                  borderRadius="$lg"
                  py={Platform.OS === "web" ? "$6" : 0}
                >
                  <Image
                    source={googleLogo}
                    width={24}
                    height={24}
                    mr="$2.5"
                    alt="google-logo"
                  />
                  <ButtonText
                    color="$white"
                    fontFamily="$bodyBold"
                    lineHeight={Platform.OS === "web" ? "$4xl" : "$3xl"}
                  >
                    Continue with Google
                  </ButtonText>
                </Button>
                <Button
                  variant="solid"
                  action="primary"
                  bgColor="$abaddonBlack"
                  mt="$4.5"
                  borderRadius="$lg"
                  py={Platform.OS === "web" ? "$6" : 0}
                >
                  <Box mr="$2.5">
                    <AntDesign name="apple1" size={20} color={white} />
                  </Box>
                  <ButtonText
                    color="$white"
                    fontFamily="$bodyBold"
                    lineHeight={Platform.OS === "web" ? "$4xl" : "$3xl"}
                  >
                    Continue with Apple
                  </ButtonText>
                </Button>
                <HStack
                  justifyContent={isMobile ? "center" : "flex-start"}
                  marginTop="$7.5"
                  gap="$4"
                >
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Text mr="$1" fontSize="$sm">
                      Already have an account?
                    </Text>
                    <Link href="/sign-in">
                      <Text
                        color="$primary500"
                        fontFamily="$bodyBold"
                        fontSize="$sm"
                      >
                        Sign in
                      </Text>
                    </Link>
                  </Box>
                </HStack>
                <HStack justifyContent="center" alignItems="center" mt="$5">
                  <Link href="/">
                    <HStack justifyContent="center" alignItems="center">
                      <ButtonIcon
                        as={ArrowLeft}
                        color="$primary500"
                        width={20}
                        mr="$0.5"
                      />
                      <Text
                        color="$primary500"
                        fontFamily="$bodyBold"
                        fontSize="$sm"
                        py="$3.375"
                      >
                        Back to Home
                      </Text>
                    </HStack>
                  </Link>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  </VStack>
);
export default CompleteAccountView;
