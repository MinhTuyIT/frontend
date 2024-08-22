import { useBreakpointValue, useToken } from "@gluestack-ui/themed";
import React, { memo } from "react";

import StepItemView from "./StepItemView";

export interface IStep {
  title: string;
  isComplete: boolean;
  index: number;
}

export interface StepItemProps {
  item: IStep;
  index: number;
  steps: number;
  currentIndex: number;
  key: string;
}
const StepItemContainer = ({
  item,
  index,
  key,
  steps,
  currentIndex,
}: StepItemProps) => {
  const bg = currentIndex >= item.index ? "$primary500" : "$white";
  const bgLine = currentIndex >= item.index ? "$primary500" : "$coolGray200";
  const bgLineLeft = index === 0 ? "$transparent" : bgLine;
  const bgLineRight = index === steps - 1 ? "$transparent" : bgLine;
  const white = useToken("colors", "white");
  const black = useToken("colors", "black");

  const color = currentIndex >= item.index ? white : black;
  const borderWidth = currentIndex >= item.index ? 0 : 1;

  const isSmall = useBreakpointValue({
    base: true,
    md: false,
  });
  return (
    <StepItemView
      {...item}
      bg={bg}
      key={key}
      index={index}
      isSmall={isSmall}
      color={color}
      bgLineLeft={bgLineLeft}
      borderWidth={borderWidth}
      bgLineRight={bgLineRight}
    />
  );
};

export default memo(StepItemContainer);
