import { Button } from "@/components/Elements";
import { AuthMeQuery, PaymentMethod } from "@/generated/graphql";
import { ApolloQueryResult } from "@apollo/client";
import { useBreakpointValue } from "@gluestack-ui/themed";
import React, { useCallback } from "react";
import { Platform } from "react-native";

interface RegisterToBidButtonProps {
  paymentMethods?: PaymentMethod[];
  refetchPaymentMethods: () => void;
  onOpenModal: () => void;
  loadingPayment: boolean;
  userInfo?: AuthMeQuery;
  refetchUser: () => Promise<ApolloQueryResult<AuthMeQuery>>;
  isDisabled: boolean;
}

const RegisterToBidButtonContainer = ({
  onOpenModal,
}: RegisterToBidButtonProps) => {
  const isSmall = useBreakpointValue({ base: true, md: false });

  const onPressRegisterToBid = useCallback(async () => {
    onOpenModal();
  }, [onOpenModal]);

  return (
    <Button
      variant="solid"
      action="primary"
      bgColor="$defaultColor"
      onPress={onPressRegisterToBid}
      label="Register To Bid"
      labelProps={{
        lineHeight: "$2xl",
        fontFamily: "$bodyBold",
        fontSize: "$md",
      }}
      w={isSmall ? "$full" : "$48"}
      h={Platform.OS !== "web" ? "$9.5" : "$12"}
    />
  );
};

export default RegisterToBidButtonContainer;
