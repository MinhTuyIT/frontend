import { useBreakpointValue, useToken } from "@gluestack-style/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Redirect, router } from "expo-router";
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import * as yup from "yup";

import { useAuth } from "../../providers/Auth";
import SignInView, { SignInFormInput } from "./SignInView";

import { LoadingOverlay } from "@/components/Elements";
import { RegExpEmail } from "@/utils/regexp";
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
  password: yup.string().required(MessageRequired.requiredPassword),
});

const SignIn = () => {
  const { width, height } = useWindowDimensions();

  const [loading, setLoading] = useState(false);
  const authData = useAuth();

  const widthBp = useBreakpointValue({
    base: width * 0.95,
    lg: width * 0.5,
  });

  const widthSignInModal = useBreakpointValue({
    base: width < 353 ? width : 353,
    lg: width < 493 ? width : 493,
  });

  const margin = useBreakpointValue({
    base: "unset",
    lg: "auto",
  });

  const white = useToken("colors", "white");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInput>({
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    async (values: SignInFormInput) => {
      setLoading(true);
      await authData
        ?.signIn(values.email, values.password)
        .then(() => {
          router.navigate("");
        })
        .finally(() => setLoading(false));
    },
    [authData]
  );

  const doSubmit = handleSubmit(onSubmit);

  if (authData?.auth) {
    return <Redirect href="" />;
  }

  if (authData?.auth === undefined) {
    return <LoadingOverlay />;
  }

  return (
    <SignInView
      doSubmit={doSubmit}
      height={height}
      width={width}
      widthBp={widthBp}
      widthSignInModal={widthSignInModal}
      margin={margin}
      control={control}
      errors={errors}
      white={white}
      loading={loading}
    />
  );
};

export default SignIn;
