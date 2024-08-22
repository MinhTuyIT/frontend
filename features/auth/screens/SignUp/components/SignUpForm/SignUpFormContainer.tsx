import { useToken } from "@gluestack-ui/themed";
import React, { useCallback, useRef, useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { TextInput } from "react-native";
import usePassword from "../../../../hooks/usePassword";
import { SignUpFormInput } from "../../SignUpView";
import SignUpFormView from "./SignUpFormView";
interface SignUpFormContainerProps {
  control: Control<SignUpFormInput>;
  errors: FieldErrors<SignUpFormInput>;
  isDisabled: boolean;
  doSubmit: () => void;
  password: string;
}

const SignUpFormContainer: React.FC<SignUpFormContainerProps> = ({
  control,
  errors,
  doSubmit,
  password,
  isDisabled,
}) => {
  const passwordRef = useRef<TextInput>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const bgErrorIcon = useToken("colors", "rose600");
  const {
    passwordStrengthText,
    passwordStrengthColor,
    passwordLengthPercentage,
  } = usePassword();
  const onEndSubmitEmail = useCallback(() => passwordRef.current?.focus(), []);

  const onEndSubmitPassword = useCallback(() => doSubmit(), [doSubmit]);

  return (
    <SignUpFormView
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      passwordStrengthText={passwordStrengthText(password)}
      passwordLengthPercentage={passwordLengthPercentage(password)}
      errors={errors}
      control={control}
      doSubmit={doSubmit}
      password={password}
      passwordStrengthColor={passwordStrengthColor(password)}
      isDisabled={isDisabled}
      bgErrorIcon={bgErrorIcon}
      passwordRef={passwordRef}
      onEndSubmitEmail={onEndSubmitEmail}
      onEndSubmitPassword={onEndSubmitPassword}
    />
  );
};

export default SignUpFormContainer;
