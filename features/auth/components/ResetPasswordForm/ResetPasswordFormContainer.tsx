import { useToken } from "@gluestack-ui/themed";
import React, { useCallback, useMemo, useRef, useState } from "react";

import { TextInput } from "react-native";
import usePassword from "../../hooks/usePassword";
import ResetPasswordView, {
  ResetPasswordViewProps,
} from "./ResetPasswordFormView";

const ForgotPasswordContainer = (props: ResetPasswordViewProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const bgErrorIcon = useToken("colors", "rose600");
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    minimumPasswordLength,
    passwordStrengthText,
    passwordStrengthColor,
    passwordLengthPercentage,
  } = usePassword();
  const { watch } = props;
  const newPassword = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");
  const isDisabledSubmitBtn = useMemo(
    () =>
      Boolean(!newPassword?.length || !confirmNewPassword?.length) ||
      props?.loading,
    [confirmNewPassword?.length, newPassword?.length, props?.loading]
  );
  const passwordRef = useRef<TextInput>(null);

  const onEndSubmitPassword = useCallback(
    () => passwordRef.current?.focus(),
    []
  );
  return (
    <ResetPasswordView
      {...props}
      minimumPasswordLength={minimumPasswordLength}
      passwordStrengthText={passwordStrengthText(newPassword)}
      passwordStrengthColor={passwordStrengthColor(newPassword)}
      passwordLengthPercentage={passwordLengthPercentage(newPassword)}
      newPassword={newPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPassword={showConfirmPassword}
      setShowConfirmPassword={setShowConfirmPassword}
      isDisabledSubmitBtn={isDisabledSubmitBtn}
      bgErrorIcon={bgErrorIcon}
      onEndSubmitPassword={onEndSubmitPassword}
      passwordRef={passwordRef}
    />
  );
};

export default ForgotPasswordContainer;
