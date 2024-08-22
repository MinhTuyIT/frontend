import { useMemo } from "react";

import {
  PaymentMethod,
  usePaymentManagementListMyPaymentMethodsQuery,
} from "@/generated/graphql";

const usePaymentMethodList = () => {
  const { data, loading, refetch } =
    usePaymentManagementListMyPaymentMethodsQuery();
  const paymentMethods = useMemo<PaymentMethod[]>(
    () => data?.listMyPaymentMethods.edges.map(edge => edge.node) ?? [],
    [data?.listMyPaymentMethods.edges]
  );

  return { paymentMethods, loading, refetch };
};

export default usePaymentMethodList;
