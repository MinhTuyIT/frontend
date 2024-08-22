import { Box, Button, ButtonText, Icon } from "@gluestack-ui/themed";
import { LogOut } from "lucide-react-native";
import React, { PropsWithChildren } from "react";

export interface HeaderViewProps {
  isShowDropDown?: boolean;
  isDesktopMode?: boolean;
  isSigningOut?: boolean;
  onLogout?: () => void;
  onPressDropdown?: () => void;
  onPressMenu?: () => void;
}

const SignOutButtonView: React.FC<PropsWithChildren<HeaderViewProps>> = ({
  children,
  isSigningOut = false,
  onLogout,
}) => (
  <>
    <Button
      accessibilityLabel="sign out"
      accessibilityRole="button"
      onPress={onLogout}
      isDisabled={isSigningOut}
      justifyContent="flex-start"
      width="$full"
    >
      <Box mr="$8">
        <Icon as={LogOut} size="sm" color="$textLight0" />
      </Box>
      <ButtonText
        color="$textLight0"
        fontSize="$sm"
        lineHeight="$sm"
        numberOfLines={1}
      >
        Sign Out
      </ButtonText>
    </Button>
    {children}
  </>
);

export default SignOutButtonView;
