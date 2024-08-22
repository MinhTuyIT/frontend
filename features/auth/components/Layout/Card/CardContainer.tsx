import React, { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

import CardView from "./CardView";

const CardContainer: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [initialHeight, setInitialHeight] = useState<number | undefined>(
    undefined
  );

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height;
      /**
       * Issue: If the height of the card changes -> the background will move to cover the card.
       * Make the height of the card not change when inputs are showing an error.
       */
      !initialHeight && setInitialHeight(height + 100);
    },
    [initialHeight]
  );

  return (
    <CardView minHeight={initialHeight} onLayout={handleLayout}>
      {children}
    </CardView>
  );
};

export default CardContainer;
