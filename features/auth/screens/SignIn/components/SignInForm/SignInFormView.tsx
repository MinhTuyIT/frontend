import {
  Button,
  ButtonSpinner,
  ButtonText,
  EyeIcon,
  EyeOffIcon,
  InputIcon,
} from "@gluestack-ui/themed";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { Platform, TextInput } from "react-native";

import { SignInFormInput } from "../../SignInView";

import { FormControlInput } from "@/components/Elements";

interface SignInFormViewProps {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  errors: FieldErrors<SignInFormInput>;
  control: Control<SignInFormInput>;
  doSubmit: () => void;
  onEndSubmitEmail: () => void;
  onEndSubmitPassword: () => void;
  passwordRef: React.RefObject<TextInput>;
  btnLoading?: boolean;
}

const SignInFormView: React.FC<SignInFormViewProps> = ({
  showPassword,
  setShowPassword,
  errors,
  control,
  doSubmit,
  passwordRef,
  btnLoading,
  onEndSubmitEmail,
  onEndSubmitPassword,
}) => {
  return (
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
        inputField={{
          type: showPassword ? "text" : "password",
          fontFamily: showPassword ? "$body" : "$latoRegular",
        }}
        mt="$6"
      />
      <Button
        variant="solid"
        action="primary"
        bg="$primary500"
        mt={Platform.OS === "web" ? "$5.5" : "$4.5"}
        onPress={doSubmit}
        isDisabled={btnLoading}
        h={Platform.OS === "web" ? "$12" : "$9.5"}
        rounded={9}
      >
        {btnLoading ? (
          <ButtonSpinner mr="$1" />
        ) : (
          <ButtonText
            color="$white"
            testID="signinSubmit"
            fontFamily="$bodyBold"
            h={Platform.OS === "web" ? "$12" : "$9.5"}
            lineHeight={Platform.OS === "web" ? 48 : 38}
          >
            Sign In
          </ButtonText>
        )}
      </Button>
    </>
  );
};

export default SignInFormView;
