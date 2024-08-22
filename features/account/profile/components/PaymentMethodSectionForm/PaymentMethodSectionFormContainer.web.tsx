import {
  AccountManagementListMyPaymentMethodsDocument,
  CreatePaymentMethodMutation,
  PaymentManagementListMyPaymentMethodsDocument,
  PaymentType,
  useCreatePaymentMethodMutation,
} from "@/generated/graphql";
import { FetchResult } from "@apollo/client";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js";
import React, { forwardRef, useImperativeHandle } from "react";

interface IPaymentMethodSectionFormProps {
  createSetupIntent: string;
  onChangePaymentMethod: (e: StripePaymentElementChangeEvent) => void;
}

interface IPaymentMethodSectionRef {
  performAction: () => Promise<
    FetchResult<CreatePaymentMethodMutation> | undefined
  >;
}

const PaymentMethodSectionFormContainer = forwardRef<
  IPaymentMethodSectionRef,
  IPaymentMethodSectionFormProps
>(({ createSetupIntent, onChangePaymentMethod }, ref) => {
  const elements = useElements();
  const stripe = useStripe();

  const [createPaymentMethodMutation] = useCreatePaymentMethodMutation({
    refetchQueries: () => [
      PaymentManagementListMyPaymentMethodsDocument,
      AccountManagementListMyPaymentMethodsDocument,
    ],
  });

  useImperativeHandle(ref, () => ({
    performAction: async () => {
      if (elements) {
        await elements.submit();
        await stripe?.confirmSetup({
          elements,
          redirect: "if_required",
        });
        if (createSetupIntent) {
          return await createPaymentMethodMutation({
            variables: {
              input: {
                methodType: PaymentType.Card,
                setupIntentId: createSetupIntent,
              },
            },
          });
        }
      }
    },
  }));

  return (
    <>
      <PaymentElement
        onChange={onChangePaymentMethod}
        options={{
          terms: {
            card: "never",
          },
          defaultValues: {
            billingDetails: {
              address: {
                country: "US",
              },
            },
          },
        }}
      />
    </>
  );
});
PaymentMethodSectionFormContainer.displayName =
  "PaymentMethodSectionFormContainer";

export default PaymentMethodSectionFormContainer;
