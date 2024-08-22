import {
  CreatePaymentMethodMutation,
  PaymentMethod,
  useCreateSetupIntentMutation,
} from "@/generated/graphql";
import { FetchResult } from "@apollo/client";
import { Elements } from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent, loadStripe } from "@stripe/stripe-js";
import React, { useCallback, useEffect, useState } from "react";
import PaymentMethodSectionForm from "../PaymentMethodSectionForm";

const stripePromise = loadStripe(
  process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export interface IPaymentMethodSection {
  paymentMethods: PaymentMethod[];
  paymentMethodRef: React.MutableRefObject<{
    performAction: () => Promise<
      FetchResult<CreatePaymentMethodMutation> | undefined
    >;
  } | null>;
  onChangePaymentMethod: (e: StripePaymentElementChangeEvent) => void;
}

const PaymentMethodSectionContainer = ({
  paymentMethodRef,
  onChangePaymentMethod,
}: IPaymentMethodSection) => {
  const [createSetupIntent, setCreateSetupIntent] = useState("");

  const [createSetupIntentMutation] = useCreateSetupIntentMutation();

  const fetchPaymentSheetParams = useCallback(async () => {
    return await createSetupIntentMutation().then(res => {
      setCreateSetupIntent(res.data?.createSetupIntent.setupIntent as string);
      return res.data?.createSetupIntent;
    });
  }, [createSetupIntentMutation, setCreateSetupIntent]);

  useEffect(() => {
    fetchPaymentSheetParams();
  }, [fetchPaymentSheetParams]);

  return createSetupIntent ? (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret: createSetupIntent,
        appearance: {
          rules: {
            ".Input": {
              borderWidth: "2px",
            },
            ".Input:focus": {
              boxShadow: "none",
              borderWidth: "2px",
              borderColor: "initial",
            },
          },
        },
        locale: "en",
      }}
    >
      <PaymentMethodSectionForm
        createSetupIntent={createSetupIntent}
        ref={paymentMethodRef}
        onChangePaymentMethod={onChangePaymentMethod}
      />
    </Elements>
  ) : (
    <></>
  );
};
export default PaymentMethodSectionContainer;
