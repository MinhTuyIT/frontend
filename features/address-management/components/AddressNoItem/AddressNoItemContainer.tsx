import { useBreakpointValue } from "@gluestack-style/react";
import React from "react";

import AddressNoItemView from "./AddressNoItemView";

const AddressNoItemContainer = () => {
  const size = useBreakpointValue({
    base: {
      width: 177,
      height: 118,
    },
    md: {
      height: 174,
      width: 262,
    },
  });

  const isSmall = useBreakpointValue({ base: true, md: false });

  return <AddressNoItemView size={size} isSmall={isSmall} />;
};

export default AddressNoItemContainer;
