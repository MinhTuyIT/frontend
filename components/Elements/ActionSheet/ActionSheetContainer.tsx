import {
  ActionsheetContent,
  Button,
  ButtonText,
  useBreakpointValue,
} from "@gluestack-ui/themed";
import React, { ComponentProps, PropsWithChildren } from "react";
import ActionSheetView from "./ActionSheetView";

export interface IActionSheetProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  contentProps?: ComponentProps<typeof ActionsheetContent>;
  isButtonClose?: boolean;
  isSmall?: boolean;
  buttonCancelProps?: ComponentProps<typeof Button>;
  textProps?: ComponentProps<typeof ButtonText>;
  textBtnClose?: string;
  confirmLoading?: boolean;
  buttonConfirmProps?: ComponentProps<typeof Button>;
  onConfirm?: () => void;
  textBtnConfirm?: string;
  snapPoints?: number[];
}

const ActionSheetContainer = (props: IActionSheetProps) => {
  const isSmall = useBreakpointValue({ base: true, md: false });

  return <ActionSheetView {...props} isSmall={isSmall} />;
};

export default ActionSheetContainer;
