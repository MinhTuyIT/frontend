import { useBreakpointValue } from "@gluestack-style/react";
import { Image } from "@gluestack-ui/themed";
import React, { ComponentProps } from "react";

import TableEmptyView from "./TableEmptyView";

export interface TableEmptyProps
  extends Pick<ComponentProps<typeof Image>, "source" | "alt"> {}

const TableEmptyContainer = ({ source, alt }: TableEmptyProps) => {
  const size = useBreakpointValue({
    base: "xl",
    md: "2xl",
  });

  return <TableEmptyView size={size} source={source} alt={alt} />;
};

export default TableEmptyContainer;
