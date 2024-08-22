import { Box } from "@gluestack-ui/themed";
import React, { ComponentProps } from "react";

const Container: React.FC<
  React.PropsWithChildren<ComponentProps<typeof Box>>
> = ({ children, ...rest }) => (
  <Box width="$full" mx="auto" {...rest}>
    {children}
  </Box>
);
export default Container;
