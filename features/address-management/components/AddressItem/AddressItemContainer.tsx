import { useToken } from "@gluestack-style/react";
import React, { useCallback, useMemo } from "react";

import AddressItemView from "./AddressItemView";

import { Address } from "@/generated/graphql";
import { countries } from "@/utils/country";

interface Props {
  onEdit?: (id?: string) => void;
  address?: Address;
  addresses?: Address[] | null;
  onDelete?: (id?: string, address?: string) => void;
  addressId?: string;
}

const AddressItemContainer = ({
  address,
  addresses,
  onDelete,
  addressId,
  onEdit,
}: Props) => {
  const deleteIconRedColor = useToken("colors", "error600");
  const iconWhiteColor = useToken("colors", "white");

  const addressJoin = useCallback((address?: Address) => {
    const {
      address1 = "",
      address2 = "",
      city = "",
      country = "",
      state = "",
      zip = "",
    } = address ?? {};
    const _country = countries.find(d => d.value === country)?.label;
    return {
      address: [address1 ?? address2, city, state, zip, _country]
        .filter(d => d)
        .join(", "),
      id: address?.id,
      zip: address?.zip,
    };
  }, []);

  const addressDetail = useMemo(() => {
    return addressJoin(address);
  }, [address, addressJoin]);

  const addressessDetail = useMemo(() => {
    return addresses?.map(address => addressJoin(address));
  }, [addressJoin, addresses]);

  return (
    <AddressItemView
      iconWhiteColor={iconWhiteColor}
      deleteIconRedColor={deleteIconRedColor}
      onEdit={onEdit}
      address={addressDetail}
      addresses={addressessDetail}
      addressId={addressId}
      onDelete={onDelete}
    />
  );
};

export default AddressItemContainer;
