import { useBreakpointValue } from "@gluestack-style/react";
import React, { useCallback } from "react";

import DeletePaymentModalView from "./DeletePaymentModalView";

import {
  AccountManagementListMyPaymentMethodsDocument,
  AuthMeQuery,
  PaymentManagementListMyPaymentMethodsDocument,
  PaymentMethod,
  usePaymentManagementRemovePaymentMethodMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";
import { MessageError, MessageSuccess } from "@/utils/validation";
import { ApolloQueryResult } from "@apollo/client";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  payment?: PaymentMethod;
  refetchUser?: () => Promise<ApolloQueryResult<AuthMeQuery>>;
  refetch: () => void;
}

const DeletePaymentModalContainer = ({
  isOpen,
  onClose,
  payment,
  refetchUser,
  refetch,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToastMessage();
  const [removePayment, { loading }] =
    usePaymentManagementRemovePaymentMethodMutation({
      refetchQueries: () => [
        PaymentManagementListMyPaymentMethodsDocument,
        AccountManagementListMyPaymentMethodsDocument,
      ],
    });

  const handleDelete = useCallback(async () => {
    try {
      const response = await removePayment({
        variables: {
          input: {
            id: payment?.id ?? "",
          },
        },
      });
      if (response) {
        onClose?.();
        toast.show({ description: MessageSuccess.removePayment });
        refetchUser?.();
      }
    } catch (err) {
      const error = formatError(err);
      if (error.errorCode === "PAYMENT_METHOD_NOT_FOUND") {
        refetch();
        onClose?.();
      }
      toast.show({
        description:
          error.errorCode === "PAYMENT_METHOD_NOT_FOUND"
            ? MessageError.notExistCreditCard
            : error.message ?? MessageError.uncaughtError,
        action: "error",
      });
    }
  }, [onClose, payment?.id, removePayment, toast, refetchUser, refetch]);

  return (
    <DeletePaymentModalView
      isOpen={isOpen}
      onClose={onClose}
      payment={payment}
      isMobile={isMobile}
      onConfirm={handleDelete}
      loading={loading}
    />
  );
};

export default DeletePaymentModalContainer;
