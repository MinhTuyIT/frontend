import {
  Button,
  ButtonSpinner,
  ButtonText,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@gluestack-ui/themed";
import React, { ComponentProps, memo } from "react";
import { DimensionValue, Dimensions } from "react-native";

import ModalContent from "../ModalContent";
export interface ModelViewProps extends ComponentProps<typeof Modal> {
  title?: string;
  textBtnClose?: string;
  isSmall?: string;
  isButtonClose?: boolean;
  textBtnConfirm?: string;
  headerProps?: ComponentProps<typeof ModalHeader>;
  bodyProps?: ComponentProps<typeof ModalBody>;
  footerProps?: ComponentProps<typeof ModalFooter>;
  headingProps?: ComponentProps<typeof Heading>;
  textProps?: ComponentProps<typeof ButtonText>;
  buttonCancelProps?: ComponentProps<typeof Button>;
  buttonConfirmProps?: ComponentProps<typeof Button>;
  contentProps?: ComponentProps<typeof ModalContent>;

  onConfirm?: () => void;
  onCancel?: () => void;
  height?: DimensionValue;
  confirmLoading?: boolean;
  isHasFooter?: boolean;
}

const ModelView = ({
  title,
  textBtnClose = "Close",
  textBtnConfirm = "Ok",
  isButtonClose = true,
  children,
  headerProps,
  bodyProps,
  footerProps,
  headingProps,
  textProps,
  buttonCancelProps,
  buttonConfirmProps,
  contentProps,
  isSmall,
  onCancel,
  confirmLoading,
  ...props
}: ModelViewProps) => (
  <Modal {...props}>
    <ModalBackdrop />
    <ModalContent
      opacity={props.isOpen ? 1 : 0}
      maxHeight={Dimensions.get("window").height - 50}
      {...contentProps}
    >
      <ModalHeader {...headerProps}>
        <Heading size="xl" {...headingProps}>
          {title}
        </Heading>
      </ModalHeader>
      <ModalBody keyboardShouldPersistTaps="handled" {...bodyProps}>
        {children}
      </ModalBody>
      <ModalFooter
        {...footerProps}
        width="$full"
        gap="$3"
        flexDirection={isSmall ? "column-reverse" : "row"}
      >
        {isButtonClose && (
          <Button
            variant="solid"
            onPress={onCancel || props.onClose}
            bg="$transparent"
            h="$12"
            borderWidth={1}
            borderRadius={9}
            minWidth={120}
            width={isSmall ? "$full" : undefined}
            height={isSmall ? "$9.5" : "$12"}
            $active-bg="$light200"
            borderColor="$content"
            {...buttonCancelProps}
          >
            <ButtonText color="$content" fontFamily={undefined} {...textProps}>
              {textBtnClose}
            </ButtonText>
          </Button>
        )}
        <Button
          h="$12"
          minWidth={120}
          borderRadius={9}
          width={isSmall ? "$full" : undefined}
          height={isSmall ? "$9.5" : "$12"}
          $hover-bg="$primary300"
          $active-bg="$primary300"
          isDisabled={confirmLoading}
          {...buttonConfirmProps}
          onPress={props.onConfirm}
        >
          {confirmLoading ? (
            <ButtonSpinner />
          ) : (
            <ButtonText {...textProps}>{textBtnConfirm}</ButtonText>
          )}
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default memo(ModelView);
