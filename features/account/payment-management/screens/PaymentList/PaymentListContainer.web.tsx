import { useBreakpointValue } from "@gluestack-style/react";
import React, { useCallback, useState } from "react";

import { useAuth } from "@/features/auth";
import {
  PaymentMethod,
  useAuthMeQuery,
  useCreateSetupIntentMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import DeletePaymentModal from "../../components/DeletePaymentModal";
import usePaymentMethodList from "../../hooks/usePaymentMethodList";
import PaymentView from "./PaymentListView";

const PaymentListContainer = () => {
  const authData = useAuth();

  const toast = useToastMessage();

  const [isOpen, setIsOpen] = useState(false);

  const browserMobileWidth = useBreakpointValue({ base: "100%", lg: "$3/5" });
  const { paymentMethods, loading, refetch } = usePaymentMethodList();
  const [deletePayment, setDeletePayment] = useState<PaymentMethod>();
  const { data: userInfo, refetch: refetchUser } = useAuthMeQuery({
    skip: !authData?.auth,
  });
  const handleOpenDelete = useCallback((payment?: PaymentMethod) => {
    setDeletePayment(payment);
  }, []);

  const handleCloseDelete = useCallback(() => {
    setDeletePayment(undefined);
  }, []);
  const [createSetupIntent, setCreateSetupIntent] = useState("");

  const [createSetupIntentMutation] = useCreateSetupIntentMutation();

  const fetchPaymentSheetParams = useCallback(async () => {
    return await createSetupIntentMutation().then(res => {
      return res.data?.createSetupIntent;
    });
  }, [createSetupIntentMutation]);

  const fetchData = useCallback(() => {
    return fetchPaymentSheetParams().then(res => {
      if (res?.setupIntent) {
        setCreateSetupIntent(res.setupIntent);
      }
    });
  }, [fetchPaymentSheetParams, setCreateSetupIntent]);

  const onOpen = useCallback(() => {
    fetchData().then(() => setIsOpen(true));
  }, [setIsOpen, fetchData]);
  const onClose = useCallback(() => {
    setIsOpen(false);
    setCreateSetupIntent("");
  }, [setIsOpen, setCreateSetupIntent]);

  const handleDisplayToast = useCallback(
    ({
      action,
      description,
    }: {
      action?: "success" | "error" | "warning" | "info" | "attention";
      description: string;
    }) => {
      toast.show({
        action,
        description,
      });
    },
    [toast]
  );

  return (
    <>
      <PaymentView
        browserMobileWidth={browserMobileWidth}
        payments={paymentMethods}
        loading={loading}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        onDelete={handleOpenDelete}
        createSetupIntent={createSetupIntent}
        handleDisplayToast={handleDisplayToast}
        fetchData={fetchData}
        refetchUser={refetchUser}
        userInfo={userInfo}
      />
      <DeletePaymentModal
        isOpen={!!deletePayment?.id}
        payment={deletePayment}
        onClose={handleCloseDelete}
        refetchUser={refetchUser}
        refetch={refetch}
      />
    </>
  );
};

export default PaymentListContainer;
