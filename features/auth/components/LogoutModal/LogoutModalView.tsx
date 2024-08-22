import React from "react";

import { Model } from "@/components/Elements";

interface Props {
  isOpen?: boolean;
  isSmall?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  signOutLoading?: boolean;
}

const LogoutModalView = ({
  isOpen,
  isSmall,
  onClose,
  onConfirm,
  signOutLoading,
}: Props) => {
  return (
    <Model
      title={"Confirm sign out?".toUpperCase()}
      isOpen={isOpen}
      headingProps={{
        textAlign: "center",
        fontFamily: "$bodyBold",
        ...(isSmall
          ? { py: "$1", width: "100%" }
          : { px: "$6", pt: "$7", pb: "$1" }),
      }}
      bodyProps={{
        px: isSmall ? "$6" : "$10",
      }}
      footerProps={isSmall ? undefined : { px: "$10", pb: "$10" }}
      textProps={{
        fontFamily: "$bodyBold",
        textAlign: "center",
        alignItems: "center",
        lineHeight: "$xl",
      }}
      onClose={!signOutLoading && onClose}
      onConfirm={onConfirm}
      buttonConfirmProps={{ isDisabled: signOutLoading }}
      buttonCancelProps={{ isDisabled: signOutLoading }}
      confirmLoading={signOutLoading}
      textBtnClose="Cancel"
      textBtnConfirm="Sign Out"
    />
  );
};

export default LogoutModalView;
