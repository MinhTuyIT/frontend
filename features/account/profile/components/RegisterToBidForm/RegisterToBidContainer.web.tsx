import { useBreakpointValue, useToken } from "@gluestack-style/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import * as yup from "yup";

import { ProfileInput } from "../ProfileForm/ProfileFormView";
import RegisterToBidView from "./RegisterToBidView";

import {
  AuthMeQuery,
  CreatePaymentMethodMutation,
  PaymentMethod,
  useAccountManagementUpdateMeMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";
import {
  ErrorCodeKeys,
  getMessageFromErrorCode,
} from "@/utils/getMessageFromErrorCode";
import { MessageRequired } from "@/utils/validation";
import { FetchResult } from "@apollo/client";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import { Platform } from "react-native";

const validation = yup.object().shape({
  firstName: yup.string().required(MessageRequired.firstName),
  lastName: yup.string().required(MessageRequired.lastName),
  phoneNumber: yup
    .string()
    .required(MessageRequired.phoneNumber)
    .test("Phone Validate", "Please enter a valid phone number.", value => {
      return isValidPhoneNumber(`+${value}`);
    }),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
  paymentMethods: PaymentMethod[];
  data?: AuthMeQuery;
  refetch: () => void;
}

const RegisterToBidContainer = ({
  isOpen,
  onClose,
  paymentMethods,
  data,
  refetch,
}: Props) => {
  const toast = useToastMessage();
  const paymentMethodRef = useRef<{
    performAction: () => Promise<
      FetchResult<CreatePaymentMethodMutation> | undefined
    >;
  }>(null);

  const currentUser = useMemo(() => data?.me, [data]);
  const maxHeight = useBreakpointValue({ base: 500, md: undefined });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isCompleted, setIsCompleted] = useState(false);

  const errorColor = useToken("colors", "error600");
  const defaultValue: ProfileInput = useMemo(
    () => ({
      email: currentUser?.email || "",
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      phoneNumber: currentUser?.consignor?.phone?.replace("+", "") || "",
      secondaryEmail: currentUser?.consignor?.secondaryEmail || "",
    }),
    [currentUser]
  );
  const {
    control,
    formState: { isValid, errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ProfileInput>({
    values: defaultValue,
    resolver: yupResolver(validation),
  });
  const isSmall = useBreakpointValue({ base: true, sm: false });

  console.log("isCompleted: ", isCompleted);

  const [updateMe, { loading }] = useAccountManagementUpdateMeMutation();

  const onChangePaymentMethod = useCallback(
    (e: StripePaymentElementChangeEvent) => {
      setIsCompleted(e.complete);
    },
    [setIsCompleted]
  );

  const onSubmit = useCallback(
    async (values: ProfileInput) => {
      if (Platform.OS === "web") {
        await paymentMethodRef.current?.performAction();
      }
      const { secondaryEmail: _, email: __, phoneNumber, ...rest } = values;
      updateMe({
        variables: {
          input: {
            ...rest,
            consignor: {
              phone: phoneNumber || null,
            },
          },
        },
      })
        .then(() => {
          refetch();
          onClose();
          toast.show({
            description: "Successfully registered to bid.",
            action: "success",
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
    },
    [refetch, toast, updateMe, onClose]
  );

  const onCloseModal = useCallback(() => {
    onClose();
    reset();
  }, [onClose, reset]);

  useEffect(() => {
    reset(defaultValue);
  }, [defaultValue, reset]);

  return (
    <RegisterToBidView
      maxHeight={maxHeight}
      disabledSubmit={
        !isValid || isSubmitting || (!paymentMethods && !isCompleted)
      }
      errors={errors}
      isSmall={isSmall}
      control={control}
      onSubmit={handleSubmit(onSubmit)}
      errorColor={errorColor}
      isOpen={isOpen}
      onClose={onCloseModal}
      isMobile={isMobile}
      loading={isSubmitting || loading}
      paymentMethods={paymentMethods}
      defaultValue={defaultValue}
      paymentMethodRef={paymentMethodRef}
      onChangePaymentMethod={onChangePaymentMethod}
    />
  );
};

export default RegisterToBidContainer;
