import { useBreakpointValue } from "@gluestack-style/react";
import React, { useCallback } from "react";

import DeletePayoutModalView from "./DeletePayoutModalView";

import {
  AccountManagementListMyPayoutMethodsDocument,
  PayoutMethod,
  useAccountManagementRemovePayoutMethodMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";
import { MessageError } from "@/utils/validation";

interface Props {
  onClose?: () => void;
  isOpen?: boolean;
  payout: PayoutMethod;
  handleRefetchListPayoutMethods: () => void;
}

const AddressDeleteModalContainer = ({
  isOpen,
  onClose,
  payout,
  handleRefetchListPayoutMethods,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [removePayoutMethod, { loading }] =
    useAccountManagementRemovePayoutMethodMutation({
      refetchQueries: () => [AccountManagementListMyPayoutMethodsDocument],
    });
  const toast = useToastMessage();

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      const response = await removePayoutMethod({
        variables: {
          input: {
            id: payout?.id ?? "",
          },
        },
      });
      if (response) {
        handleClose();
        toast.show({
          description: "Payout method was removed successfully.",
        });
      }
    } catch (err) {
      const error = formatError(err);
      if (error.errorCode === "PAYOUT_METHOD_NOT_FOUND") {
        handleRefetchListPayoutMethods();
        handleClose();
      }
      toast.show({
        description:
          error.errorCode === "PAYOUT_METHOD_NOT_FOUND"
            ? MessageError.notExistPayoutMethod
            : error.message ?? MessageError.uncaughtError,
        action: "error",
      });
    }
  }, [
    handleClose,
    payout?.id,
    removePayoutMethod,
    toast,
    handleRefetchListPayoutMethods,
  ]);

  return (
    <DeletePayoutModalView
      isMobile={isMobile}
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      loading={loading}
      payout={payout}
    />
  );
};

export default AddressDeleteModalContainer;
