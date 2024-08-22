import { Box, HStack, VStack } from "@gluestack-ui/themed";
import React, { memo } from "react";

import { Model, Text } from "@/components/Elements";
import { PayoutMethod, PayoutType } from "@/generated/graphql";
import { formatPaymentMethod } from "@/utils/format";

export interface Props {
  isMobile?: boolean;
  isOpen?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  loading?: boolean;
  payout: PayoutMethod;
}

const PayoutDeleteModalView = ({
  isMobile,
  isOpen,
  onClose,
  onConfirm,
  loading,
  payout,
}: Props) => {
  return (
    <Model
      headerProps={{
        px: isMobile ? "$9.5" : "$10",
        pt: isMobile ? "$9.5" : "$10",
        pb: "$3",
        justifyContent: !isMobile ? "flex-start" : "center",
      }}
      headingProps={{
        fontFamily: "$bodyBold",
        textAlign: "center",
      }}
      title="REMOVE PAYOUT METHOD"
      size={isMobile ? "lg" : "md"}
      bodyProps={{ px: isMobile ? "$9.5" : "$10", pb: "$8" }}
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
    >
      <VStack gap="$3.5">
        <Text color="$defaultContent" fontSize="$md" lineHeight="$xl">
          This payout method will be removed from your account.
        </Text>

        <HStack alignItems="center" gap="$4" width="100%">
          <Box width="20%">
            <Text fontFamily="$bodyBold">
              {formatPaymentMethod(payout?.type ?? "")}
            </Text>
          </Box>
          {payout?.type === PayoutType.Paypal ? (
            <Text
              width="60%"
              fontSize="$md"
              numberOfLines={1}
              color="$defaultContent"
              isTruncated
            >
              {payout.detail?.email}
            </Text>
          ) : (
            <>
              <Text
                width="30%"
                fontSize="$md"
                numberOfLines={1}
                isTruncated
                color="$defaultContent"
              >
                {payout?.detail?.bankName}
              </Text>
              <Text
                width="30%"
                fontSize="$md"
                isTruncated
                numberOfLines={1}
                color="$defaultContent"
              >
                {payout?.detail?.accountNumber}
              </Text>
            </>
          )}
        </HStack>
      </VStack>
    </Model>
  );
};

export default memo(PayoutDeleteModalView);
