import { useToken } from "@gluestack-style/react";
import React from "react";

import PaymentItemView from "./PaymentItemView";

import { PaymentMethod } from "@/generated/graphql";

export interface IPaymentItemsProps {
  payments?: PaymentMethod[];
  disabledAction?: boolean;
  payment?: PaymentMethod;
  onDelete?: (payment?: PaymentMethod) => void;
}

const PaymentItemContainer = ({
  payments,
  disabledAction,
  payment,
  onDelete,
}: IPaymentItemsProps) => {
  const deleteIconRedColor = useToken("colors", "error600");
  const iconWhiteColor = useToken("colors", "white");
  const heightImage = useToken("space", "5");
  const widthImage = useToken("space", "6");

  return (
    <>
      <PaymentItemView
        iconWhiteColor={iconWhiteColor}
        deleteIconRedColor={deleteIconRedColor}
        payments={payments}
        disabledAction={disabledAction}
        payment={payment}
        onDelete={onDelete}
        heightImage={heightImage}
        widthImage={widthImage}
      />
    </>
  );
};

export default PaymentItemContainer;
