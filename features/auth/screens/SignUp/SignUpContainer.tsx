import { useBreakpointValue, useToken } from "@gluestack-style/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect, router } from "expo-router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import * as yup from "yup";

import SignUpView, { SignUpFormInput } from "./SignUpView";

import { LoadingOverlay } from "@/components/Elements";
import { useAuth } from "@/features/auth";
import { RegExpEmail, RegExpPassword } from "@/utils/regexp";
import { MessageError, MessageRequired } from "@/utils/validation";

export const minimumPasswordLength = 8;

const schema = yup.object().shape({
  email: yup
    .string()
    .email(MessageError.invalidEmail)
    .required(MessageRequired.requiredEmail)
    .matches(RegExpEmail, {
      message: MessageError.invalidEmail,
    }),
  password: yup
    .string()
    .required(MessageRequired.requiredPassword)
    .min(minimumPasswordLength, MessageError.passwordMin)
    .matches(RegExpPassword, {
      message: MessageError.invalidPw,
    }),
});

const SignUp = () => {
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);

  const widthBp = useBreakpointValue({
    base: width * 0.95,
    lg: width * 0.5,
  });

  const widthSignUpModal = useBreakpointValue({
    base: width < 353 ? width : 353,
    lg: width < 493 ? width : 493,
  });

  const margin = useBreakpointValue({
    base: "unset",
    lg: "auto",
  });

  const white = useToken("colors", "white");

  const authData = useAuth();
  const { signUp, signIn } = authData ?? {};

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInput>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const password = watch("password");

  const onSubmit = useCallback(
    (values: SignUpFormInput) => {
      setLoading(true);
      signUp!(values.email, values.password)
        .then(res => {
          const { errorCode } = res;
          if (!errorCode) {
            signIn?.(values.email, values.password).then(() => {
              router.navigate("");
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [signUp, signIn]
  );

  const doSubmit = handleSubmit(onSubmit);

  if (authData?.auth) {
    return <Redirect href="" />;
  }

  if (authData?.auth === undefined) {
    return <LoadingOverlay />;
  }

  return (
    <SignUpView
      doSubmit={doSubmit}
      height={height}
      width={width}
      widthBp={widthBp}
      widthSignUpModal={widthSignUpModal}
      margin={margin}
      control={control}
      errors={errors}
      password={password}
      white={white}
      isDisabled={loading}
    />
  );
};

export default SignUp;
