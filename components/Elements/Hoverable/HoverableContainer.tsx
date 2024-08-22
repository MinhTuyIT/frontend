import { Box } from "@gluestack-ui/themed";
import React, { ComponentProps, useCallback, useState } from "react";

interface Props extends ComponentProps<typeof Box> {
  bgHover?: string;
}

const HoverableContainer = ({
  children,
  bgHover = "$trueGray50",
  ...props
}: Props) => {
  const [isHover, setIsHover] = useState(false);

  const handleHover = useCallback(() => {
    setIsHover(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsHover(false);
  }, []);

  return (
    <Box
      onPointerMove={handleHover}
      onPointerLeave={handleCancel}
      bg={isHover ? bgHover : "$white"}
      {...props}
    >
      {children}
    </Box>
  );
};

export default HoverableContainer;
