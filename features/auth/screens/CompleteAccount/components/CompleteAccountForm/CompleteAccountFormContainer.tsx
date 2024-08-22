import React, { useCallback, useRef, useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { TextInput } from "react-native";
import usePassword from "../../../../hooks/usePassword";
import { CompleteAccountFormInput } from "../../CompleteAccountView";
import CompleteAccountFormView from "./CompleteAccountFormView";

interface CompleteAccountFormContainerProps {
  control: Control<CompleteAccountFormInput>;
  errors: FieldErrors<CompleteAccountFormInput>;
  isDisabled: boolean;
  doSubmit: () => void;
  password: string;
}

const CompleteAccountFormContainer: React.FC<
  CompleteAccountFormContainerProps
> = ({ control, errors, doSubmit, password, isDisabled }) => {
  const passwordRef = useRef<TextInput>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    passwordStrengthText,
    passwordStrengthColor,
    passwordLengthPercentage,
  } = usePassword();

  const onEndSubmitEmail = useCallback(() => passwordRef.current?.focus(), []);

  const onEndSubmitPassword = useCallback(() => doSubmit(), [doSubmit]);

  return (
    <CompleteAccountFormView
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
      passwordRef={passwordRef}
      onEndSubmitEmail={onEndSubmitEmail}
      onEndSubmitPassword={onEndSubmitPassword}
    />
  );
};

export default CompleteAccountFormContainer;
