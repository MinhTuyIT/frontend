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

import SignUpForm from "./components/SignUpForm";
import signUpBackgroundImage from "../../../../assets/images/img-sign-in-background.png";
import googleLogo from "../../../../assets/images/logo-google.png";
import logo from "../../../../assets/images/logo.png";

const statusBarHeight = Constants.statusBarHeight;

export interface SignUpFormInput {
  email: string;
  password: string;
}

interface SignUpViewProps {
  control: Control<SignUpFormInput>;
  errors: FieldErrors<SignUpFormInput>;
  isDisabled: boolean;
  doSubmit: () => void;
  password: string;
  height?: number;
  width?: number;
  widthBp?: number;
  widthSignUpModal?: number;
  margin?: number;
  white: string;
}

const isMobile = Platform.OS !== "web";

const SignUpView: React.FC<SignUpViewProps> = ({
  control,
  errors,
  doSubmit,
  password,
  height,
  width,
  widthBp,
  widthSignUpModal,
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
      source={signUpBackgroundImage}
      style={{
        flex: 1,
        justifyContent: "center",
        width,
        height: (height ?? 0) + statusBarHeight,
      }}
      alt="sigup-background"
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
              width={widthSignUpModal}
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
              <VStack width="100%" mt={14}>
                <Text
                  color="$abaddonBlack"
                  fontSize={Platform.OS === "web" ? 24 : 20}
                  h={Platform.OS === "web" ? 45 : 37}
                  letterSpacing={0}
                  fontFamily="$bodyBold"
                  lineHeight={Platform.OS === "web" ? "$3.5xl" : "$2.5xl"}
                  mb={Platform.OS === "web" ? "$6" : 0}
                >
                  Sign Up
                </Text>
                <SignUpForm
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
                  h={26}
                >
                  OR
                </Text>
                <Button
                  variant="solid"
                  action="primary"
                  bgColor="$abaddonBlack"
                  borderRadius={9}
                  h={Platform.OS === "web" ? 48 : 38}
                >
                  <Image
                    source={googleLogo}
                    width={24}
                    height={24}
                    mr={10}
                    alt="google-logo"
                  />
                  <ButtonText
                    color="$white"
                    fontFamily="$bodyBold"
                    height={30}
                    lineHeight={30}
                  >
                    Continue with Google
                  </ButtonText>
                </Button>
                <Button
                  variant="solid"
                  action="primary"
                  bgColor="$abaddonBlack"
                  mt={18}
                  borderRadius={9}
                  h={Platform.OS === "web" ? 48 : 38}
                >
                  <Box mr={10}>
                    <AntDesign name="apple1" size={20} color={white} />
                  </Box>
                  <ButtonText
                    color="$white"
                    fontFamily="$bodyBold"
                    height={30}
                    lineHeight={30}
                  >
                    Continue with Apple
                  </ButtonText>
                </Button>
                <HStack
                  justifyContent={isMobile ? "center" : "flex-start"}
                  marginTop="$7.5"
                  gap="$4"
                  height={27}
                >
                  <Box display="flex" flexDirection="row" alignItems="center">
                    <Text marginRight={4} fontSize="$sm">
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
                <HStack justifyContent="center" alignItems="center" mt={20}>
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
                        height={27}
                        lineHeight={27}
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
export default SignUpView;
