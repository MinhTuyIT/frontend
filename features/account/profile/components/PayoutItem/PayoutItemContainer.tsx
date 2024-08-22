import { useToken } from "@gluestack-style/react";
import React from "react";

import PayoutItemView from "./PayoutItemView";

import { PayoutMethod } from "@/generated/graphql";

export interface IPayoutItemsProps {
  payouts?: PayoutMethod[];
  disabledAction?: boolean;
  payout?: PayoutMethod;
  handleEditPayoutMethod?: (id: string) => void;
  handleDeletePayoutMethod?: (payout: PayoutMethod) => void;
}

const PayoutItemContainer = ({
  payouts,
  disabledAction,
  payout,
  handleEditPayoutMethod,
  handleDeletePayoutMethod,
}: IPayoutItemsProps) => {
  const deleteIconRedColor = useToken("colors", "error600");
  const iconWhiteColor = useToken("colors", "white");

  return (
    <PayoutItemView
      iconWhiteColor={iconWhiteColor}
      deleteIconRedColor={deleteIconRedColor}
      payouts={payouts}
      disabledAction={disabledAction}
      payout={payout}
      handleEditPayoutMethod={handleEditPayoutMethod}
      handleDeletePayoutMethod={handleDeletePayoutMethod}
    />
  );
};

export default PayoutItemContainer;
