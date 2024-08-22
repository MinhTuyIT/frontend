import { VStack } from "@gluestack-ui/themed";
import React from "react";

import Loading from "../Loading";

const LoadingOverlayView = () => {
  return (
    <VStack alignItems="center" justifyContent="center" h="$full">
      <Loading />
    </VStack>
  );
};

export default LoadingOverlayView;
