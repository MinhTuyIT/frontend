import { useBreakpointValue } from "@gluestack-style/react";
import React from "react";

import Card from "./Card";
import LayoutView from "./LayoutView";

const LayoutContainer: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const formWidth = useBreakpointValue({
    base: "100%",
    sm: 420,
    md: 440,
    lg: 520,
    xl: 550,
  });

  const titleWidth = useBreakpointValue({
    base: "100%",
    sm: 420,
    md: 440,
    lg: 520,
    xl: "100%",
  });

  return (
    <LayoutView formWidth={formWidth} titleWidth={titleWidth}>
      <Card>{children}</Card>
    </LayoutView>
  );
};

export default LayoutContainer;
