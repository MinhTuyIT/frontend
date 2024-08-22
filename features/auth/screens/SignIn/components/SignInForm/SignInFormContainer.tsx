import { router, useGlobalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { TextInput } from "react-native";

import { SignInFormInput } from "../../SignInView";
import SignInFormView from "./SignInFormView";

import useToastMessage from "@/hooks/useToastMessage";
interface SignInFormContainerProps {
  control: Control<SignInFormInput>;
  errors: FieldErrors<SignInFormInput>;
  isSubmitting?: boolean;
  isDisabled?: boolean;
  doSubmit: () => void;
  loading?: boolean;
}

const SignInFormContainer: React.FC<SignInFormContainerProps> = ({
  control,
  errors,
  doSubmit,
  loading,
}) => {
  const params = useGlobalSearchParams();
  const toast = useToastMessage();
  const passwordRef = useRef<TextInput>(null);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  useEffect(() => {
    if (params?.["resetPassword"]) {
      toast.show({
        description: "Password changed successfully.",
        action: "success",
      });
      router.replace("/sign-in");
    }
  }, [params, toast]);
  const onEndSubmitEmail = useCallback(() => passwordRef.current?.focus(), []);

  const onEndSubmitPassword = useCallback(() => doSubmit(), [doSubmit]);

  return (
    <SignInFormView
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      errors={errors}
      control={control}
      doSubmit={doSubmit}
      passwordRef={passwordRef}
      btnLoading={loading}
      onEndSubmitEmail={onEndSubmitEmail}
      onEndSubmitPassword={onEndSubmitPassword}
    />
  );
};

export default SignInFormContainer;
