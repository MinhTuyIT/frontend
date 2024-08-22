import { useBreakpointValue } from "@gluestack-style/react";
import React, { useCallback, useState } from "react";
import { DimensionValue } from "react-native";

import AddressDeleteModal from "../../components/AddressDeleteModal";
import AddressEdit from "../AddressEdit";
import AddressNew from "../AddressNew";
import AddressView from "./AddressView";

import {
  Address,
  useAddressManagementListMyAddressesQuery,
} from "@/generated/graphql";

export interface IAddressProps {
  addresses?: Address[] | null;
  browserMobileWidth?: DimensionValue;
  onEdit?: (id?: string) => void;
  onOpen?: () => void;
  loading?: boolean;
  onDelete?: (id?: string) => void;
}

const AddressContainer = () => {
  const [isOpen, setOpen] = useState(false);
  const browserMobileWidth = useBreakpointValue({ base: "100%", lg: "$3/5" });
  const { data, loading, refetch } = useAddressManagementListMyAddressesQuery();
  const [deleteId, setDeleteId] = useState("");
  const [deleteAddress, setDeleteAddress] = useState("");
  const [isOpenEditForm, setIsOpenEditForm] = useState(false);
  const [id, setId] = useState<string>();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleOpenDelete = useCallback((id?: string, address?: string) => {
    setDeleteAddress(address ?? "");
    setDeleteId(id ?? "");
  }, []);

  const handleCloseDelete = useCallback(() => {
    setDeleteId("");
    setDeleteAddress("");
  }, []);

  const handleOpenEdit = useCallback((id?: string) => {
    setId(id);
    setIsOpenEditForm(!!id);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setIsOpenEditForm(false);
    setId(undefined);
  }, []);

  return (
    <>
      <AddressView
        browserMobileWidth={browserMobileWidth}
        addresses={data?.listMyAddresses || []}
        loading={loading}
        onOpen={handleOpen}
        onDelete={handleOpenDelete}
        onEdit={handleOpenEdit}
      />
      <AddressNew isOpen={isOpen} onClose={handleClose} />
      <AddressDeleteModal
        id={deleteId}
        isOpen={!!deleteId}
        onClose={handleCloseDelete}
        address={deleteAddress}
        refetch={refetch}
      />
      <AddressEdit isOpen={isOpenEditForm} onClose={handleCloseEdit} id={id} />
    </>
  );
};

export default AddressContainer;
