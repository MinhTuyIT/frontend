import { Button } from "@gluestack-ui/themed";
import React, { ComponentProps, forwardRef } from "react";
import { View } from "react-native";

interface Props extends ComponentProps<typeof Button> {}

const NavButtonView = forwardRef<View, Props>(({ children, ...props }, ref) => (
  <Button
    // @ts-ignore the typing is not correct on this
    ref={ref}
    variant="link"
    height="auto"
    sx={{
      _text: {
        color: "$white",
        ":hover": {
          color: "$primary500",
        },
        ":active": {
          color: "$primary500",
        },
        textDecorationLine: "none",
        _web: {
          transition: "all 0.2s ease",
        },
      },
      _icon: {
        color: "$white",
        ":hover": {
          color: "$primary500",
        },
      },
    }}
    {...props}
  >
    {children}
  </Button>
));

NavButtonView.displayName = "NavButtonView";

export default NavButtonView;
