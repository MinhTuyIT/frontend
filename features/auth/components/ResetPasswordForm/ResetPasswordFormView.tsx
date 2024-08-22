/* eslint-disable max-lines */
import {
  Box,
  EyeIcon,
  EyeOffIcon,
  FormControlHelper,
  HStack,
  InputIcon,
  Progress,
  ProgressFilledTrack,
  ScrollView,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import PageFooter from "layout/PageFooter";
import React from "react";
import { Control, FieldErrors, UseFormWatch } from "react-hook-form";
import { Platform, TextInput } from "react-native";

import { Button, FormControlInput } from "@/components/Elements";
export interface ResetPassWordInput {
  newPassword: string;
  confirmNewPassword: string;
}
export interface ResetPasswordViewProps {
  control: Control<ResetPassWordInput>;
  errors: FieldErrors<ResetPassWordInput>;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  doSubmit: () => void;
  modalWidth?: number;
  loading?: boolean;
  watch: UseFormWatch<ResetPassWordInput>;
}
export interface ResetPasswordFormViewProps extends ResetPasswordViewProps {
  minimumPasswordLength: number;
  passwordStrengthText: string;
  passwordStrengthColor: string | undefined;
  passwordLengthPercentage: number;
  newPassword: string;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isSmall?: string;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showConfirmPassword?: boolean;
  isDisabledSubmitBtn?: boolean;
  bgErrorIcon?: string;
  passwordRef: React.RefObject<TextInput>;
  onEndSubmitPassword: () => void;
}
const ResetPasswordView: React.FC<ResetPasswordFormViewProps> = ({
  control,
  errors,
  doSubmit,
  modalWidth,
  loading,
  isDisabledSubmitBtn,
  passwordRef,
  onEndSubmitPassword,
  newPassword,
  passwordStrengthText,
  passwordStrengthColor,
  passwordLengthPercentage,
  setShowConfirmPassword,
  showConfirmPassword,
  showPassword,

  setShowPassword,
}) => (
  <ScrollView width={Platform.OS !== "web" ? "auto" : "$full"}>
    <Box width={Platform.OS !== "web" ? "$full" : modalWidth} p="$6" m="auto">
      <Text
        color="$defaultContent"
        fontSize="$2xl"
        my={Platform.OS === "web" ? "$6" : "$10"}
        mt="$10"
        fontFamily="$bodyBold"
        lineHeight="$3.5xl"
      >
        Change Password
      </Text>
      <FormControlInput
        testID="newPassword"
        isRequired
        isInvalid={"newPassword" in errors}
        control={control}
        errorMessage={errors.newPassword?.message ?? ""}
        name="newPassword"
        label="New Password"
        inputField={{
          autoFocus: true,
        }}
        onSubmitEditing={onEndSubmitPassword}
        rightIcon={
          <InputIcon
            as={showPassword ? EyeIcon : EyeOffIcon}
            color="$defaultContent"
          />
        }
        onPressRightIcon={() => setShowPassword(!showPassword)}
        customHelper={
          newPassword && (
            <FormControlHelper>
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
                <Text fontSize={14} color="$defaultContent" fontWeight="$bold">
                  {passwordStrengthText}
                </Text>
              </HStack>
            </FormControlHelper>
          )
        }
      />
      <FormControlInput
        mt="$6"
        testID="confirmNewPassword"
        isRequired
        isInvalid={"confirmNewPassword" in errors}
        control={control}
        errorMessage={errors.confirmNewPassword?.message ?? ""}
        name="confirmNewPassword"
        label="Confirm New Password"
        ref={passwordRef}
        onSubmitEditing={doSubmit}
        rightIcon={
          <InputIcon
            as={showConfirmPassword ? EyeIcon : EyeOffIcon}
            color="$defaultContent"
          />
        }
        onPressRightIcon={() => setShowConfirmPassword(!showConfirmPassword)}
      />

      <HStack gap={10} justifyContent="flex-end">
        <Button
          variant="solid"
          action="primary"
          bgColor="$defaultColor"
          mt="$10"
          onPress={doSubmit}
          label="Reset Password"
          isLoading={loading}
          opacity={isDisabledSubmitBtn ? 0.5 : 1}
          disabled={isDisabledSubmitBtn}
          labelProps={{
            lineHeight: "$2xl",
            fontFamily: "$bodyBold",
            fontSize: "$md",
          }}
          w={Platform.OS !== "web" ? "$full" : "$48"}
          h={Platform.OS !== "web" ? "$9.5" : "$12"}
        />
      </HStack>
    </Box>
    <PageFooter />
  </ScrollView>
);
export default ResetPasswordView;
