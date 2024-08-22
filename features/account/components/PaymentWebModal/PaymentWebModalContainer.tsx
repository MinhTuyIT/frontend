import {
  AccountManagementListMyPaymentMethodsDocument,
  AuthMeQuery,
  PaymentManagementListMyPaymentMethodsDocument,
  PaymentType,
  useCreatePaymentMethodMutation,
} from "@/generated/graphql";
import { formatError } from "@/utils/format";
import { MessageError, MessageSuccess } from "@/utils/validation";
import { ApolloQueryResult } from "@apollo/client";
import { useBreakpointValue } from "@gluestack-ui/themed";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import React, { useCallback, useEffect, useState } from "react";
import PaymentWebModalView from "./PaymentWebModalView";

interface IPaymentWebModalProps {
  isOpen?: boolean;
  onClose: () => void;
  createSetupIntent?: string;
  handleDisplayToast?: ({
    action,
    description,
  }: {
    action?: "success" | "error" | "warning" | "info" | "attention" | undefined;
    description: string;
  }) => void;
  fetchData?: () => void;
  refetchUser?: () => Promise<ApolloQueryResult<AuthMeQuery>>;
  onOpenModal?: () => void;
  userInfo?: AuthMeQuery;
}

const PaymentWebModalContainer = ({
  onClose,
  createSetupIntent,
  handleDisplayToast,
  fetchData,
  onOpenModal,
  userInfo,
  refetchUser,
}: IPaymentWebModalProps) => {
  const isSmall = useBreakpointValue({ base: true, sm: false });

  const stripe = useStripe();
  const elements = useElements();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isCreatedPaymentMethod, setIsCreatedPaymentMethod] = useState(false);

  const [createPaymentMethodMutation, { loading }] =
    useCreatePaymentMethodMutation({
      refetchQueries: () => [
        PaymentManagementListMyPaymentMethodsDocument,
        AccountManagementListMyPaymentMethodsDocument,
      ],
    });

  const onChange = useCallback(
    (e: StripePaymentElementChangeEvent) => {
      setIsCompleted(e.complete);
    },
    [setIsCompleted]
  );

  const onConfirm = useCallback(async () => {
    if (isCompleted && elements) {
      try {
        setIsConfirmLoading(true);
        await elements.submit();
        await stripe?.confirmSetup({
          elements,
          redirect: "if_required",
        });
        setIsConfirmLoading(false);
        if (createSetupIntent) {
          await createPaymentMethodMutation({
            variables: {
              input: {
                methodType: PaymentType.Card,
                setupIntentId: createSetupIntent,
              },
            },
          });
          if (handleDisplayToast) {
            handleDisplayToast({
              action: "success",
              description: MessageSuccess.addPaymentMethod,
            });
          }
        }
        if (refetchUser) {
          await refetchUser();
          setIsCreatedPaymentMethod(true);
        }
        onClose();
      } catch (error) {
        const err = formatError(error);
        setIsConfirmLoading(false);
        if (handleDisplayToast && err.message) {
          const customErrMessage =
            err.message === "You have already added this payment method."
              ? MessageError.exitedCard
              : err.message;
          handleDisplayToast({
            action: "error",
            description: customErrMessage,
          });
        }
        onClose();
        if (fetchData) fetchData();
      }
    }
  }, [
    createPaymentMethodMutation,
    isCompleted,
    createSetupIntent,
    elements,
    onClose,
    stripe,
    handleDisplayToast,
    refetchUser,
    fetchData,
  ]);

  useEffect(() => {
    if (
      !userInfo?.me?.isRegisteredBidder &&
      isCreatedPaymentMethod &&
      !loading
    ) {
      onOpenModal && onOpenModal();
      onClose();
    }
  }, [
    userInfo?.me?.isRegisteredBidder,
    isCreatedPaymentMethod,
    loading,
    onOpenModal,
    refetchUser,
    onClose,
  ]);

  return (
    <PaymentWebModalView
      onChange={onChange}
      isSmall={isSmall}
      onClose={onClose}
      loading={loading || isConfirmLoading}
      isCompleted={isCompleted}
      onConfirm={onConfirm}
    />
  );
};

export default PaymentWebModalContainer;
