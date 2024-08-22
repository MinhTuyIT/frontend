import {
  Button,
  ButtonSpinner,
  ButtonText,
  EyeIcon,
  EyeOffIcon,
  FormControlHelper,
  HStack,
  InputIcon,
  Progress,
  ProgressFilledTrack,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Platform, TextInput } from "react-native";

import { CompleteAccountFormInput } from "../../CompleteAccountView";

import { FormControlInput } from "@/components/Elements";

interface CompleteAccountFormViewProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  passwordStrengthText?: string;
  passwordLengthPercentage?: number;
  errors: FieldErrors<CompleteAccountFormInput>;
  control: Control<CompleteAccountFormInput>;
  doSubmit: () => void;
  password?: string;
  passwordStrengthColor?: string;
  isDisabled: boolean;
  passwordRef: React.RefObject<TextInput>;
  onEndSubmitEmail: () => void;
  onEndSubmitPassword: () => void;
}

const CompleteAccountFormView: React.FC<CompleteAccountFormViewProps> = ({
  showPassword,
  setShowPassword,
  passwordStrengthText,
  passwordLengthPercentage,
  errors,
  control,
  doSubmit,
  password,
  passwordStrengthColor,
  isDisabled,
  passwordRef,
  onEndSubmitEmail,
  onEndSubmitPassword,
}) => (
  <>
    <FormControlInput
      testID="emailInput"
      isRequired
      isInvalid={"email" in errors}
      control={control}
      errorMessage={errors.email?.message ?? ""}
      name="email"
      label="Email"
      placeholder="Enter your email"
      inputField={{
        autoFocus: true,
      }}
      onSubmitEditing={onEndSubmitEmail}
      input={{ isDisabled: true }}
    />
    <FormControlInput
      testID="passwordInput"
      isRequired
      isInvalid={"password" in errors}
      control={control}
      errorMessage={errors.password?.message ?? ""}
      name="password"
      label="Password"
      placeholder="************"
      ref={passwordRef}
      onPressRightIcon={() => setShowPassword(!showPassword)}
      onSubmitEditing={onEndSubmitPassword}
      rightIcon={
        <InputIcon
          as={showPassword ? EyeIcon : EyeOffIcon}
          color="$abaddonBlack"
        />
      }
      customHelper={
        password && (
          <FormControlHelper mt={0}>
            <HStack alignItems="center" mt={Platform.OS === "web" ? 11 : 18}>
              <Text fontSize="$sm" color="$abaddonBlack">
                Password Strength
              </Text>
              <Progress
                bg="$bgButtonGray91"
                marginHorizontal={10}
                value={passwordLengthPercentage}
                w={80}
              >
                <ProgressFilledTrack
                  bg={passwordStrengthColor}
                  borderTopRightRadius={
                    passwordLengthPercentage === 100 ? "$full" : 0
                  }
                  borderBottomRightRadius={
                    passwordLengthPercentage === 100 ? "$full" : 0
                  }
                />
                <HStack
                  position="absolute"
                  bgColor="transparent"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                  borderRadius="$full"
                >
                  {Array.from({ length: 7 })
                    .map((_, index) => index + 1)
                    .map(key => (
                      <VStack
                        key={key}
                        borderRightWidth={2}
                        borderRightColor="$white"
                        width="12.5%"
                      />
                    ))}
                </HStack>
              </Progress>
              <Text fontSize="$sm" color="$abaddonBlack" fontFamily="$bodyBold">
                {passwordStrengthText}
              </Text>
            </HStack>
          </FormControlHelper>
        )
      }
      inputField={{
        type: showPassword ? "text" : "password",
        fontFamily: showPassword ? "$body" : "$latoRegular",
      }}
      mt="$6"
    />
    <Button
      variant="solid"
      action="primary"
      bgColor="$primary500"
      mt={Platform.OS === "web" ? "$5.5" : "$4.5"}
      onPress={doSubmit}
      isDisabled={isDisabled}
      py={Platform.OS === "web" ? "$6" : 0}
      borderRadius="$lg"
    >
      {isDisabled ? (
        <ButtonSpinner mr="$1" />
      ) : (
        <ButtonText
          color="$white"
          fontFamily="$bodyBold"
          lineHeight={Platform.OS === "web" ? "$4xl" : "$3xl"}
        >
          Complete Account
        </ButtonText>
      )}
    </Button>
  </>
);

export default CompleteAccountFormView;
