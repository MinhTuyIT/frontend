import { useBreakpointValue } from "@gluestack-ui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import { router, useGlobalSearchParams } from "expo-router";
import PageFooter from "layout/PageFooter";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import * as yup from "yup";

import ResetPasswordView from "./ResetPasswordView";
import { ResetPassWordInput } from "../../components/ResetPasswordForm";
import { minimumPasswordLength } from "../../hooks/usePassword";
import { useAuth } from "../../providers/Auth";

import { RegExpPassword } from "@/utils/regexp";
import { MessageError } from "@/utils/validation";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Password is required.")
    .min(minimumPasswordLength, MessageError.passwordMin)
    .matches(RegExpPassword, {
      message: MessageError.invalidPw,
    }),

  confirmNewPassword: yup
    .string()
    .required("Password is required.")
    .oneOf(
      [yup.ref("newPassword"), ""],
      "The passwords you entered do not match. Please ensure that both password fields are the same."
    ),
});

const ForgotPasswordContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  const params = useGlobalSearchParams<{
    confirmation_code: string;
    user_name: string;
  }>();
  const authData = useAuth();
  const modalWidth = useBreakpointValue({
    base: width < 353 ? width : 353,
    lg: width < 493 ? width : 493,
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ResetPassWordInput>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (values: ResetPassWordInput) => {
      setLoading(true);
      const { newPassword } = values;
      const { confirmation_code = "", user_name = "" } = params;
      const response = await authData?.confirmForgotPassword(
        typeof user_name === "string" ? user_name : "",
        newPassword,
        typeof confirmation_code === "string" ? confirmation_code : ""
      );
      if (response?.success) {
        reset();
        router.navigate("/sign-in/?resetPassword=true");
      }
      setLoading(false);
    },
    [authData, params, reset]
  );

  const doSubmit = handleSubmit(onSubmit);

  return (
    <>
      <ResetPasswordView
        doSubmit={doSubmit}
        modalWidth={modalWidth}
        control={control}
        errors={errors}
        watch={watch}
        loading={loading}
      />
      <PageFooter />
    </>
  );
};

export default ForgotPasswordContainer;
