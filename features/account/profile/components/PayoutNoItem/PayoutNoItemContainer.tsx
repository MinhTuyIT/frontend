import { useBreakpointValue } from "@gluestack-style/react";
import React from "react";

import PayoutNoItemView from "./PayoutNoItemView";

const PayoutNoItemContainer = () => {
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

  return <PayoutNoItemView size={size} isSmall={isSmall} />;
};

export default PayoutNoItemContainer;
