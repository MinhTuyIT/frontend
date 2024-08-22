import { HStack, VStack } from "@gluestack-ui/themed";
import { ComponentProps, ReactNode } from "react";

export type Direction = "row" | "column";

interface Props extends Omit<ComponentProps<typeof VStack>, ""> {
  children?: ReactNode;
  display?: Direction;
}

const StackView = ({ display, children, ...props }: Props) => {
  if (display === "row") {
    return <HStack {...props}>{children}</HStack>;
  }
  return <VStack {...props}>{children}</VStack>;
};

export default StackView;
