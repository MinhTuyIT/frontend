import { EyeIcon, EyeOffIcon, InputIcon, VStack } from "@gluestack-ui/themed";
import { testIDs } from "e2e/testIDs";
import React, { memo } from "react";

import { ChangePasswordFormProps } from "./ChangePasswordFormContainer";
import NewPasswordHelper from "../NewPasswordHelper";

import { FormControlInput, Model } from "@/components/Elements";

const ChangePasswordFormView = ({
  isMobile,
  control,
  errors,
  doSubmit,
  newPassword,
  passwordStrengthText,
  passwordStrengthColor,
  passwordLengthPercentage,
  showPassword,
  setShowPassword,
  loading,
  setShowConfirmPassword,
  showConfirmPassword,
  isDisabledSubmitBtn,
  showOldPassword,
  setShowOldPassword,
  isOpen,
  onClose,
  oldPassword,
  onEndSubmitOldPassword,
  onEndSubmitNewPassword,
  confirmPasswordRef,
  newPasswordRef,
  oldPasswordRef,
}: ChangePasswordFormProps) => {
  return (
    <Model
      title="CHANGE PASSWORD"
      isOpen={isOpen}
      textBtnConfirm="Change Password"
      textBtnClose="Cancel"
      textProps={{ lineHeight: "$xl", fontFamily: "$bodyBold" }}
      size="lg"
      bodyProps={{ px: isMobile ? "$9.5" : "$10", pb: "$10" }}
      footerProps={{
        px: isMobile ? "$9.5" : "$10",
        pb: isMobile ? "$9.5" : "$10",
        pt: "$0",
      }}
      headerProps={{
        px: isMobile ? "$9.5" : "$10",
        pt: isMobile ? "$9.5" : "$10",
        pb: "$3",
        justifyContent: !isMobile ? "flex-start" : "center",
      }}
      headingProps={{ fontFamily: "$bodyBold", textAlign: "center" }}
      avoidKeyboard
      onConfirm={doSubmit}
      buttonConfirmProps={{ isDisabled: isDisabledSubmitBtn }}
      buttonCancelProps={{
        onPress: onClose,
      }}
    >
      <VStack gap="$5" mt="$4">
        <FormControlInput
          isRequired
          isInvalid={"oldPassword" in errors}
          control={control}
          name="oldPassword"
          inputField={{
            type: showOldPassword ? "text" : "password",
            autoFocus: true,
            fontFamily: showOldPassword ? "$body" : "$latoRegular",
          }}
          ref={oldPasswordRef}
          labelProps={{
            fontWeight: "$bold",
            fontSize: 14,
            fontFamily: "$bodyBold",
          }}
          isDisabled={loading}
          rightIcon={
            <InputIcon
              as={showOldPassword ? EyeIcon : EyeOffIcon}
              color="$defaultContent"
            />
          }
          onPressRightIcon={() => setShowOldPassword(!showOldPassword)}
          label="Current Password"
          errorMessage={
            oldPassword
              ? (errors?.oldPassword?.message as string) || ""
              : undefined
          }
          onSubmitEditing={onEndSubmitOldPassword}
          testID={testIDs.ACCOUNT.CHANGE_PW_CURRENT_PW_INPUT}
        />
        <FormControlInput
          isRequired
          isInvalid={"newPassword" in errors}
          control={control}
          name="newPassword"
          inputField={{
            type: showPassword ? "text" : "password",
            fontFamily: showPassword ? "$body" : "$latoRegular",
          }}
          ref={newPasswordRef}
          labelProps={{
            fontWeight: "$bold",
            fontSize: 14,
            fontFamily: "$bodyBold",
          }}
          isDisabled={loading}
          rightIcon={
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              color="$defaultContent"
            />
          }
          label="New Password"
          onPressRightIcon={() => setShowPassword(!showPassword)}
          errorMessage={
            newPassword ? errors?.newPassword?.message?.toString() || "" : ""
          }
          testID={testIDs.ACCOUNT.CHANGE_PW_NEW_PW_INPUT}
          onSubmitEditing={onEndSubmitNewPassword}
          customHelper={
            <NewPasswordHelper
              newPassword={newPassword}
              passwordLengthPercentage={passwordLengthPercentage}
              passwordStrengthColor={passwordStrengthColor}
              passwordStrengthText={passwordStrengthText}
            />
          }
        />
        <FormControlInput
          isRequired
          isInvalid={"confirmNewPassword" in errors}
          control={control}
          name="confirmNewPassword"
          inputField={{
            type: showConfirmPassword ? "text" : "password",
            fontFamily: showConfirmPassword ? "$body" : "$latoRegular",
          }}
          ref={confirmPasswordRef}
          labelProps={{
            fontWeight: "$bold",
            fontSize: 14,
            fontFamily: "$bodyBold",
          }}
          isDisabled={loading}
          rightIcon={
            <InputIcon
              as={showConfirmPassword ? EyeIcon : EyeOffIcon}
              color="$defaultContent"
            />
          }
          onPressRightIcon={() => setShowConfirmPassword(!showConfirmPassword)}
          label="Confirm New Password"
          errorMessage={errors?.confirmNewPassword?.message?.toString() || ""}
          onSubmitEditing={doSubmit}
          testID={testIDs.ACCOUNT.CHANGE_PW_CONFIRM_PW_INPUT}
        />
      </VStack>
    </Model>
  );
};

export default memo(ChangePasswordFormView);
