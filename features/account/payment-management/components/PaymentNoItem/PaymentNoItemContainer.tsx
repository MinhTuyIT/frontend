import { useBreakpointValue } from "@gluestack-style/react";
import React from "react";

import PaymentNoItemView from "./PaymentNoItemView";

const PaymentNoItemContainer = () => {
  const size = useBreakpointValue({
    base: {
      width: 148,
      height: 158,
    },
    md: {
      height: 224,
      width: 210,
    },
  });

  const isSmall = useBreakpointValue({ base: true, md: false });

  return <PaymentNoItemView size={size} isSmall={isSmall} />;
};

export default PaymentNoItemContainer;
