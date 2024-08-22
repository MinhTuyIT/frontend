/* eslint-disable max-lines */
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
import { Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignInForm from "./components/SignInForm";
import signInBackgroundImage from "../../../../assets/images/img-sign-in-background.png";
import googleLogo from "../../../../assets/images/logo-google.png";
import logo from "../../../../assets/images/logo.png";

const statusBarHeight = Constants.statusBarHeight;

export interface SignInFormInput {
  email: string;
  password: string;
}

interface SignInViewProps {
  control: Control<SignInFormInput>;
  errors: FieldErrors<SignInFormInput>;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  doSubmit: () => void;
  height?: number;
  width?: number;
  widthBp?: number;
  widthSignInModal?: number;
  margin?: string;
  white: string;
  loading?: boolean;
}

const SignInView: React.FC<SignInViewProps> = ({
  control,
  errors,
  doSubmit,
  height,
  width,
  widthBp,
  widthSignInModal,
  margin,
  white,
  loading,
}) => (
  <VStack
    justifyContent="center"
    alignItems="center"
    width={width}
    height={(height ?? 0) + statusBarHeight}
    bg="$bgMobileEditAccount"
  >
    <StatusBar barStyle="light-content" />
    <ImageBackground
      source={signInBackgroundImage}
      style={{
        flex: 1,
        justifyContent: "center",
        width,
        height: (height ?? 0) + statusBarHeight,
      }}
      alt="login-background"
    >
      <SafeAreaView
        edges={["top"]}
        style={{
          flex: 1,
          margin,
          height,
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
              width={widthSignInModal}
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
                  Sign In
                </Text>
                <SignInForm
                  control={control}
                  errors={errors}
                  doSubmit={doSubmit}
                  loading={loading}
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
                {Platform.OS === "web" && margin === "auto" && (
                  <HStack
                    justifyContent="space-between"
                    marginTop={30}
                    space="lg"
                    height={27}
                  >
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <Text marginRight={4} fontSize="$sm">
                        Don&apos;t have an account?
                      </Text>
                      <Link href="/sign-up">
                        <Text
                          color="$primary500"
                          fontFamily="$bodyBold"
                          fontSize="$sm"
                        >
                          Sign up
                        </Text>
                      </Link>
                    </Box>
                    <Link href="/forgot-password">
                      <Text
                        color="$bgMobileEditAccount"
                        fontFamily="$bodyBold"
                        fontSize="$sm"
                      >
                        Forgot Password?
                      </Text>
                    </Link>
                  </HStack>
                )}
                {(Platform.OS !== "web" || margin === "unset") && (
                  <VStack alignItems="center" mt={24}>
                    <Link href="/forgot-password">
                      <Text
                        color="$bgMobileEditAccount"
                        fontFamily="$bodyBold"
                        fontSize="$sm"
                      >
                        Forgot Password?
                      </Text>
                    </Link>
                    <HStack mt={24}>
                      <Text mr="$1.25" fontSize="$sm">
                        Don&apos;t have an account?
                      </Text>
                      <Link href="/sign-up">
                        <Text
                          color="$primary500"
                          fontFamily="$bodyBold"
                          fontSize="$sm"
                        >
                          Sign up
                        </Text>
                      </Link>
                    </HStack>
                  </VStack>
                )}
                <HStack
                  justifyContent="center"
                  alignItems="center"
                  mt={
                    margin === "unset" || Platform.OS !== "web" ? "$6" : "$7.5"
                  }
                >
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
export default SignInView;
