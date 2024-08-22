import { useBreakpointValue } from "@gluestack-style/react";
import React, { useCallback, useState } from "react";

import SignOutButtonView from "./SignOutButtonView";

import { useAuth } from "@/features/auth";
import useDebounceCallback from "@/hooks/useDebounceCallback";

const SignOutButtonContainer: React.FC = () => {
  const authData = useAuth();
  const isDesktopMode = useBreakpointValue({ base: false, lg: true });
  const { signOut } = authData ?? {};
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [isShowDropDown, setIsShowDropDown] = useState<boolean>(false);

  const onPressDropdown = useCallback(
    () => setIsShowDropDown(prev => !prev),
    []
  );

  const handleSignOut = useCallback(async () => {
    setIsSigningOut(true);
    signOut?.()
      .catch(error => console.log(error))
      .finally(() => setIsSigningOut(false));
  }, [signOut]);

  const handleDebounceLogout = useDebounceCallback(handleSignOut, 200);

  return (
    <SignOutButtonView
      isShowDropDown={isShowDropDown}
      isDesktopMode={isDesktopMode}
      isSigningOut={isSigningOut}
      onLogout={handleDebounceLogout}
      onPressDropdown={onPressDropdown}
    />
  );
};

export default SignOutButtonContainer;
