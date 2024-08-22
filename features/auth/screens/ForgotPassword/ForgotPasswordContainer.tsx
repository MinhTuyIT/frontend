import { useBreakpointValue } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import ForgotPasswordView, { ForgotPasswordInput } from "./ForgotPasswordView";

import { useAuth } from "@/features/auth";
import parseSearchParams from "@/utils/parseSearchParams";
import { RegExpEmail } from "@/utils/regexp";
import { MessageError } from "@/utils/validation";
const schema = yup.object().shape({
  email: yup
    .string()
    .email(MessageError.invalidEmail)
    .required("Email is required.")
    .matches(RegExpEmail, {
      message: MessageError.invalidEmail,
    }),
});

const ForgotPasswordContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isEmailSent } = parseSearchParams();
  const authData = useAuth();
  const { forgotPassword } = authData ?? {};
  const [isRequest, setIsRequest] = useState<boolean>(false);

  const isSmall = useBreakpointValue({ base: true, sm: false });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (values: ForgotPasswordInput) => {
      setLoading(true);
      const { email } = values;
      const res = await forgotPassword?.(email);
      if (res?.success) {
        reset();
        router.navigate("/forgot-password/?isEmailSent=true");
        setIsRequest(true);
      }
      setLoading(false);
    },
    [forgotPassword, reset]
  );

  const doSubmit = handleSubmit(onSubmit);

  const handleCancel = useCallback(() => {
    router.navigate("/sign-in");
  }, []);

  useEffect(() => {
    setIsRequest(isEmailSent === "true");
  }, [isEmailSent]);

  return (
    <ForgotPasswordView
      doSubmit={doSubmit}
      control={control}
      errors={errors}
      isEmailSent={isRequest}
      onCancel={handleCancel}
      isSmall={isSmall}
      loading={loading}
    />
  );
};

export default ForgotPasswordContainer;
