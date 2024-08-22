import { useBreakpointValue, useToken } from "@gluestack-style/react";
import React, { useCallback } from "react";

import AddressDeleteModalView from "./AddressDeleteModalView";

import {
  AddressManagementListMyAddressesDocument,
  useAddressManagementRemoveAddressMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";
import { MessageError, MessageSuccess } from "@/utils/validation";

interface Props {
  id: string;
  onClose?: () => void;
  isOpen?: boolean;
  address?: string;
  refetch: () => void;
}

const AddressDeleteModalContainer = ({
  id,
  isOpen,
  onClose,
  address,
  refetch,
}: Props) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const redColor = useToken("colors", "error600");
  const [removeAddress, { loading }] =
    useAddressManagementRemoveAddressMutation({
      refetchQueries: () => [AddressManagementListMyAddressesDocument],
    });
  const toast = useToastMessage();

  const handleClose = useCallback(() => {
    onClose?.();
  }, [onClose]);

  const handleConfirm = useCallback(async () => {
    try {
      const response = await removeAddress({
        variables: {
          input: {
            id,
          },
        },
      });
      if (response) {
        handleClose();
        toast.show({
          description: MessageSuccess.removeAddress,
        });
      }
    } catch (err) {
      const error = formatError(err);
      if (error.errorCode === "ADDRESS_NOT_FOUND") {
        refetch();
        handleClose();
      }
      toast.show({
        description:
          error.errorCode === "ADDRESS_NOT_FOUND"
            ? MessageError.notExistAddress
            : error.message ?? MessageError.uncaughtError,
        action: "error",
      });
    }
  }, [handleClose, id, removeAddress, toast, refetch]);

  return (
    <AddressDeleteModalView
      isMobile={isMobile}
      redColor={redColor}
      isOpen={isOpen}
      onClose={handleClose}
      onConfirm={handleConfirm}
      loading={loading}
      address={address}
    />
  );
};

export default AddressDeleteModalContainer;
