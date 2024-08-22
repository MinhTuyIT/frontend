import { useBreakpointValue } from "@gluestack-style/react";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { memo, useCallback, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HeaderView from "./HeaderView";

import { useAuth, useCurrentUser } from "@/features/auth";
import useDebounceCallback from "@/hooks/useDebounceCallback";

interface HeaderProps {
  onMenuPress?: () => void;
  onSignInPress?: () => void;
  onSearchPress?: () => void;
  onConsignPress?: () => void;
  onPressItemMenu?: (key: string) => void;
}

const HeaderContainer: React.FC<HeaderProps> = ({
  onMenuPress,
  onSignInPress,
  onSearchPress,
  onConsignPress,
  onPressItemMenu,
}) => {
  const authData = useAuth();
  const { signOut, auth } = authData ?? {};
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();
  const { isConnected } = useNetInfo();
  const currentUser = useCurrentUser();

  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);
    signOut?.()
      .catch(error => console.log(error))
      .finally(() => setIsSigningOut(false));
  }, [signOut]);

  const handleDebounceLogout = useDebounceCallback(handleSignOut, 200);
  const showMenu = useBreakpointValue({ base: true, sm: true, md: false });
  const widthSearchBar = useBreakpointValue({
    base: 100,
    sm: 150,
    md: 300,
    lg: 400,
    xl: 500,
  });

  const isLoggedIn = !!auth;

  return (
    <HeaderView
      isLoggedIn={isLoggedIn}
      isSigningOut={isSigningOut}
      paddingTop={isConnected ? top : 0}
      onLogout={handleDebounceLogout}
      onMenuPress={onMenuPress}
      onConsignPress={onConsignPress}
      onSignInPress={onSignInPress}
      onSearchPress={onSearchPress}
      onPressItemMenu={onPressItemMenu}
      showMenu={showMenu}
      widthSearchBar={widthSearchBar}
      fullName={`${currentUser?.firstName ?? ""} ${
        currentUser?.lastName ?? ""
      }`}
    />
  );
};

export default memo(HeaderContainer);
