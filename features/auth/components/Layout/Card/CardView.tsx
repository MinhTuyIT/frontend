import { Box } from "@gluestack-ui/themed";
import React from "react";
import { LayoutChangeEvent } from "react-native";

interface Props {
  minHeight: number | undefined;
  onLayout: (event: LayoutChangeEvent) => void;
}

const CardView: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  minHeight,
}) => (
  <Box
    minHeight={minHeight}
    justifyContent="flex-start"
    sx={{
      "@md": {
        justifyContent: "center",
      },
    }}
  >
    {children}
  </Box>
);

export default CardView;
