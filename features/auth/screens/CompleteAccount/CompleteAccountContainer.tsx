import { useAuthCompleteAccountMutation } from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";
import {
  ErrorCodeKeys,
  getMessageFromErrorCode,
} from "@/utils/getMessageFromErrorCode";
import { RegExpPassword } from "@/utils/regexp";
import {
  MessageError,
  MessageRequired,
  MessageSuccess,
} from "@/utils/validation";
import { useBreakpointValue, useToken } from "@gluestack-style/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import * as yup from "yup";
import { useAuth } from "../../providers/Auth";
import CompleteAccountView, {
  CompleteAccountFormInput,
} from "./CompleteAccountView";

export const minimumPasswordLength = 8;

const schema = yup.object().shape({
  password: yup
    .string()
    .required(MessageRequired.requiredPassword)
    .min(minimumPasswordLength, MessageError.passwordMin)
    .matches(RegExpPassword, {
      message: MessageError.invalidPw,
    }),
});

const CompleteAccount = () => {
  const toast = useToastMessage();
  const authData = useAuth();
  const params = useGlobalSearchParams<{
    otpCode: string;
    user_name: string;
  }>();

  const { width, height } = useWindowDimensions();

  const widthBp = useBreakpointValue({
    base: width * 0.95,
    lg: width * 0.5,
  });

  const widthCompleteAccountModal = useBreakpointValue({
    base: width < 353 ? width : 353,
    lg: width < 493 ? width : 493,
  });

  const margin = useBreakpointValue({
    base: "unset",
    lg: "auto",
  });

  const white = useToken("colors", "white");

  const [completeAccount, { loading }] = useAuthCompleteAccountMutation();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CompleteAccountFormInput>({
    mode: "onSubmit",
    resolver: yupResolver(schema),
    defaultValues: {
      email: params.user_name?.replace(/ /g, "+"),
    },
  });

  const password = watch("password");

  const onSubmit = useCallback(
    (values: CompleteAccountFormInput) => {
      if (params.otpCode) {
        completeAccount({
          variables: {
            input: {
              email: values.email,
              password: values.password,
              otpCode: params.otpCode,
            },
          },
        })
          .then(() => {
            toast.show({
              action: "success",
              description: MessageSuccess.completeAccount,
            });
            authData?.signIn(values.email, values.password).then(() => {
              router.navigate("");
            });
          })
          .catch(error => {
            const { message, errorCode } = formatError(error);
            toast.show({
              description:
                getMessageFromErrorCode(errorCode as ErrorCodeKeys) ??
                message ??
                "There has been an error, please try again",
              action: "error",
            });
          });
      }
    },
    [completeAccount, params, authData, toast]
  );

  const doSubmit = handleSubmit(onSubmit);

  return (
    <CompleteAccountView
      doSubmit={doSubmit}
      height={height}
      width={width}
      widthBp={widthBp}
      widthCompleteAccountModal={widthCompleteAccountModal}
      margin={margin}
      control={control}
      errors={errors}
      password={password}
      white={white}
      isDisabled={isSubmitting || loading}
    />
  );
};

export default CompleteAccount;
