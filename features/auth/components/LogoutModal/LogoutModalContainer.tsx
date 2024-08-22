import { useBreakpointValue } from "@gluestack-style/react";
import React, { useCallback, useState } from "react";

import LogoutModalView from "./LogoutModalView";
import { useAuth } from "../../providers/Auth";

interface Props {
  isOpen?: boolean;
  setIsOpen: (value: boolean) => void;
}

const LogoutModalContainer = ({ isOpen, setIsOpen }: Props) => {
  const authData = useAuth();
  const [signOutLoading, setSignOutLoading] = useState(false);
  const isSmall = useBreakpointValue({ base: true, sm: false });

  const handleConfirm = useCallback(async () => {
    setSignOutLoading(true);
    await authData?.signOut();
    setSignOutLoading(false);
    setIsOpen(false);
  }, [authData, setIsOpen]);

  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <LogoutModalView
      onConfirm={handleConfirm}
      onClose={!signOutLoading ? onClose : undefined}
      signOutLoading={signOutLoading}
      isSmall={isSmall}
      isOpen={isOpen}
    />
  );
};

export default LogoutModalContainer;
