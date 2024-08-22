import {
  Button,
  ButtonSpinner,
  ButtonText,
  HStack,
} from "@gluestack-ui/themed";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { View } from "react-native";
interface RemoveThoseKeys {
  Text: any;
  Icon: any;
  Spinner: any;
  Group: any;
}
export interface Props
  extends Omit<ComponentProps<typeof Button>, keyof RemoveThoseKeys> {
  label?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
  labelProps?: Omit<ComponentProps<typeof ButtonText>, "">;
}
const ButtonContainer = forwardRef<View, Props>(
  (
    {
      isLoading,
      label,
      leftIcon,
      rightIcon,
      labelProps,
      children,
      ...restProps
    },
    ref
  ) => (
    <Button ref={ref} borderRadius={10} {...restProps}>
      {isLoading ? (
        <ButtonSpinner />
      ) : (
        <HStack>
          {leftIcon}
          {children}
          {label && <ButtonText {...labelProps}>{label}</ButtonText>}
          {rightIcon}
        </HStack>
      )}
    </Button>
  )
);

ButtonContainer.displayName = "ButtonContainer";

export default ButtonContainer;
