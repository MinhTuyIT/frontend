import { Box, HStack, Image, VStack } from "@gluestack-ui/themed";
import React from "react";

import { Model, Text } from "@/components/Elements";
import { PaymentMethod } from "@/generated/graphql";
import { capitalizeWords } from "@/utils/capitalizeWords";
import { getPaymentLogoURL } from "@/utils/getPaymentLogoURL";

interface Props {
  isMobile?: boolean;
  isOpen?: boolean;
  onConfirm?: () => void;
  onClose?: () => void;
  loading?: boolean;
  payment?: PaymentMethod;
}

const DeletePaymentModalView = ({
  isOpen,
  onClose,
  onConfirm,
  payment,
  isMobile,
  loading,
}: Props) => {
  return (
    <Model
      headerProps={{
        px: isMobile ? "$9.5" : "$10",
        pt: isMobile ? "$9.5" : "$10",
        pb: "$3",
        justifyContent: !isMobile ? "flex-start" : "center",
      }}
      headingProps={{ fontFamily: "$bodyBold", textAlign: "center" }}
      title="REMOVE PAYMENT METHOD"
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
    >
      <VStack gap="$3.5">
        <Text color="$defaultContent" fontSize="$md" lineHeight="$xl">
          This payment method will be removed from your account.
        </Text>
        <HStack gap="$2" alignItems="center">
          <Box>
            <HStack alignItems="center" gap="$2">
              <Image
                h="$5"
                w="$6"
                source={getPaymentLogoURL(payment?.details.brand)}
                resizeMode="contain"
                alt="Payment-logo"
              />
              <Text
                fontFamily="$bodyBold"
                fontSize="$sm"
                color="$defaultContent"
                lineHeight="$xl"
              >
                {capitalizeWords(payment?.details.brand)}
              </Text>
            </HStack>
          </Box>
          <Text fontSize="$md" lineHeight="$xl" color="$defaultContent">
            Ending in {payment?.details.last4 ?? ""}
          </Text>
        </HStack>
      </VStack>
    </Model>
  );
};

export default DeletePaymentModalView;
