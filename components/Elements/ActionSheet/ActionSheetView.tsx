import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Button,
  ButtonSpinner,
  ButtonText,
  KeyboardAvoidingView,
  VStack,
} from "@gluestack-ui/themed";
import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import Text from "../Text";
import { IActionSheetProps } from "./ActionSheetContainer";

const ActionSheetView = ({
  isOpen,
  onClose,
  children,
  title,
  contentProps,
  isButtonClose = true,
  textBtnClose = "Close",
  isSmall,
  buttonCancelProps,
  textBtnConfirm = "Ok",
  textProps,
  confirmLoading,
  buttonConfirmProps,
  ...props
}: IActionSheetProps) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose} {...props}>
      <ActionsheetBackdrop />
      <KeyboardAvoidingView behavior="height" style={{ flex: 1, zIndex: 999 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ActionsheetContent {...contentProps}>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
            {title && (
              <Text
                fontSize="$2xl"
                pb="$1"
                fontFamily="$bodyBold"
                color="$textLight1000"
                lineHeight="$2xl"
                mt="$3"
              >
                {title}
              </Text>
            )}
            {children}
            <VStack
              width="$full"
              gap="$3"
              mb="$5"
              flexDirection={isSmall ? "column-reverse" : "row"}
            >
              {isButtonClose && (
                <Button
                  variant="solid"
                  onPress={onClose}
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
                  <ButtonText
                    color="$content"
                    fontFamily="$bodyBold"
                    lineHeight="$2xl"
                    {...textProps}
                  >
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
                  <ButtonText
                    lineHeight="$2xl"
                    fontFamily="$bodyBold"
                    {...textProps}
                  >
                    {textBtnConfirm}
                  </ButtonText>
                )}
              </Button>
            </VStack>
          </ActionsheetContent>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Actionsheet>
  );
};

export default ActionSheetView;
