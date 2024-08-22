import { useBreakpointValue } from "@gluestack-style/react";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import React, { useCallback, useState } from "react";

import DeletePaymentModal from "../../components/DeletePaymentModal";
import usePaymentMethodList from "../../hooks/usePaymentMethodList";
import PaymentView from "./PaymentListView";

import {
  AccountManagementListMyPaymentMethodsDocument,
  PaymentManagementListMyPaymentMethodsDocument,
  PaymentMethod,
  PaymentType,
  useCreatePaymentMethodMutation,
  useCreateSetupIntentMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";
import { MessageSuccess } from "@/utils/validation";

const PaymentListContainer = () => {
  const browserMobileWidth = useBreakpointValue({ base: "100%", lg: "$3/5" });
  const toast = useToastMessage();
  const { paymentMethods, loading, refetch } = usePaymentMethodList();
  const [loadingOpenModal, setLoadingOpenModal] = useState(false);
  const [createSetupIntentMutation] = useCreateSetupIntentMutation();
  const [createPaymentMethodMutation] = useCreatePaymentMethodMutation({
    refetchQueries: () => [
      PaymentManagementListMyPaymentMethodsDocument,
      AccountManagementListMyPaymentMethodsDocument,
    ],
  });
  const [deletePayment, setDeletePayment] = useState<PaymentMethod>();

  const handleOpenDelete = useCallback((payment?: PaymentMethod) => {
    setDeletePayment(payment);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setDeletePayment(undefined);
  }, []);

  const fetchPaymentSheetParams = useCallback(async () => {
    return await createSetupIntentMutation().then(res => {
      return res.data?.createSetupIntent;
    });
  }, [createSetupIntentMutation]);

  const initializePaymentSheet = useCallback(async () => {
    const response = await fetchPaymentSheetParams();

    if (response) {
      const { setupIntent, customer } = response;

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        setupIntentClientSecret: setupIntent,
        style: "alwaysLight",
        defaultBillingDetails: {
          address: {
            country: "US",
          },
        },
        primaryButtonLabel: "Add Card",
      });

      if (error) {
        toast.show({
          action: "error",
          description: error.message,
        });
      }
      return setupIntent;
    }
  }, [fetchPaymentSheetParams, toast]);

  const onPress = useCallback(async () => {
    setLoadingOpenModal(true);
    const data = await initializePaymentSheet();
    const { error } = await presentPaymentSheet();
    setLoadingOpenModal(false);

    if (error) {
      if (error.code !== "Canceled") {
        toast.show({
          action: "error",
          description: error.message,
        });
      }
      return;
    }

    if (data) {
      createPaymentMethodMutation({
        variables: {
          input: {
            methodType: PaymentType.Card,
            setupIntentId: data,
          },
        },
      })
        .then(() => {
          toast.show({
            action: "success",
            description: MessageSuccess.addPaymentMethod,
          });
        })
        .catch(error => {
          const err = formatError(error);
          toast.show({
            action: "error",
            description: err.message,
          });
        });
    }
  }, [toast, createPaymentMethodMutation, initializePaymentSheet]);

  return (
    <>
      <PaymentView
        browserMobileWidth={browserMobileWidth}
        payments={paymentMethods}
        loading={loading}
        onOpen={onPress}
        onDelete={handleOpenDelete}
        loadingOpenModal={loadingOpenModal}
      />
      <DeletePaymentModal
        isOpen={!!deletePayment?.id}
        payment={deletePayment}
        onClose={handleCloseDelete}
        refetch={refetch}
      />
    </>
  );
};

export default PaymentListContainer;
