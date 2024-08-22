import { Box, HStack, Icon, VStack } from "@gluestack-ui/themed";
import { LocationDotIcon } from "assets/icons/LocationDotIcon";
import React, { memo } from "react";

import { Model, Text } from "@/components/Elements";

export interface Props {
  isMobile?: boolean;
  redColor?: string;
  isOpen?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  loading?: boolean;
  address?: string;
}

const AddressDeleteModalView = ({
  isMobile,
  redColor,
  isOpen,
  onClose,
  onConfirm,
  loading,
  address,
}: Props) => {
  return (
    <Model
      headerProps={{
        px: isMobile ? "$9.5" : "$10",
        pt: isMobile ? "$9.5" : "$10",
        pb: "$3",
        justifyContent: !isMobile ? "flex-start" : "center",
      }}
      headingProps={{ fontFamily: "$bodyBold" }}
      title="REMOVE ADDRESS"
      size={isMobile ? "lg" : "md"}
      bodyProps={{ px: isMobile ? "$9.5" : "$10", pb: "$10" }}
      footerProps={{
        px: isMobile ? "$9.5" : "$10",
        pb: isMobile ? "$9.5" : "$10",
        pt: "$0",
      }}
      textProps={{ fontFamily: "$bodyBold", lineHeight: "$xl" }}
      isOpen={isOpen}
      textBtnConfirm="Yes, Remove"
      textBtnClose="Cancel"
      onClose={onClose}
      onConfirm={onConfirm}
      confirmLoading={loading}
      buttonCancelProps={{ isDisabled: loading }}
      buttonConfirmProps={{
        bg: "$error600",
        "$focus-bg": "none",
        "$hover-bg": "none",
        "$active-bg": "none",
        isDisabled: loading,
      }}
      contentProps={{ bg: "$white" }}
    >
      <VStack gap="$3.5">
        <Text color="$defaultContent" fontSize="$md" lineHeight="$xl">
          This address will be removed from your account.
        </Text>
        <HStack gap="$2">
          <Box maxWidth="$6">
            <Icon as={LocationDotIcon(redColor)} />
          </Box>
          <Text fontSize="$md" color="$defaultContent" flex={1}>
            {address ?? ""}
          </Text>
        </HStack>
      </VStack>
    </Model>
  );
};

export default memo(AddressDeleteModalView);
