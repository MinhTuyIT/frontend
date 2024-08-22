import { useBreakpointValue } from "@gluestack-style/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Platform, TextInput } from "react-native";
import { IDropdownRef } from "react-native-element-dropdown";
import * as yup from "yup";

import AddressEditView from "./AddressEditView";

import { IAddressCallback } from "@/components/Elements";
import {
  AddressManagementListMyAddressesDocument,
  UpdateAddressInput,
  useAddressManagementGetAddressQuery,
  useAddressManagementUpdateAddressMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";
import { MessageRequired, MessageSuccess } from "@/utils/validation";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
  id?: string;
}

const validate = yup.object().shape({
  address1: yup.string().required(MessageRequired.requiredAddress),
  country: yup.string().required(MessageRequired.requiredCountry),
  zip: yup.string().required(MessageRequired.requiredZipCode),
  state: yup.string().required(MessageRequired.requiredState),
  city: yup.string().required(MessageRequired.requiredCity),
});

const initValues = {
  address1: "",
  city: "",
  state: "",
  country: "",
  zip: "",
};

const AddressEditContainer = ({ isOpen, onClose, id }: Props) => {
  const isBrowserMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToastMessage();
  const [fetchLoading, setFetchLoading] = useState(true);
  const { refetch } = useAddressManagementGetAddressQuery({
    skip: true,
  });
  const [updateAddress, { loading }] =
    useAddressManagementUpdateAddressMutation({
      refetchQueries: () => [AddressManagementListMyAddressesDocument],
    });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<UpdateAddressInput>({
    resolver: yupResolver(validate),
    defaultValues: initValues,
  });
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const countryRef = useRef<IDropdownRef>(null);
  const zipRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);

  const handleClose = useCallback(() => {
    reset(initValues);
    setFetchLoading(true);
    onClose?.();
  }, [onClose, reset]);

  const onSubmit = useCallback(
    async (values: UpdateAddressInput) => {
      try {
        const response = await updateAddress({
          variables: {
            input: { ...values, id: id ?? "" },
          },
        });
        if (response) {
          toast.show({
            description: MessageSuccess.updateAddress,
          });
          handleClose();
        }
      } catch (err) {
        const error = formatError(err);
        toast.show({
          description: error.message ?? "",
          action: "error",
        });
      }
    },
    [handleClose, id, toast, updateAddress]
  );

  const onUpdateAddress = useCallback(
    (data: IAddressCallback) => {
      setValue("address1", data.address);
      setValue("city", data.city);
      setValue("state", data.state);
      setValue("zip", data.postal_code);
      setValue("country", data.country);
      if (Platform.OS !== "web") {
        addressRef.current?.setAddressText(data.address);
      }
    },
    [setValue]
  );

  const handleEndAddressSubmit = useCallback(
    () => cityRef.current?.focus(),
    []
  );
  const handleEndCitySubmit = useCallback(() => stateRef.current?.focus(), []);
  const handleEndStateSubmit = useCallback(
    () =>
      isBrowserMobile ? zipRef.current?.focus() : countryRef.current?.open(),
    [isBrowserMobile]
  );

  const handleEndZipSubmit = useCallback(() => {
    if (isBrowserMobile) {
      if (isValid) {
        handleSubmit(onSubmit);
      }
    } else {
      countryRef.current?.open();
    }
  }, [handleSubmit, isBrowserMobile, isValid, onSubmit]);

  const handleEndCountrySubmit = useCallback(() => {
    setTimeout(() => {
      if (isBrowserMobile) {
        if (isValid) {
          handleSubmit(onSubmit);
        }
      } else {
        zipRef.current?.focus();
      }
    }, 100);
  }, [handleSubmit, isBrowserMobile, isValid, onSubmit]);

  useEffect(() => {
    (async () => {
      if (id) {
        const data = await refetch({
          getAddressId: id ?? "",
        });
        setFetchLoading(data.loading);
        const {
          address1 = "",
          city = "",
          country = "",
          state = "",
          zip = "",
        } = data?.data.getAddress ?? {};
        reset({ address1, city, country, state, zip });
      }
    })();
  }, [id, refetch, reset]);

  return (
    <AddressEditView
      isOpen={isOpen}
      onClose={handleClose}
      control={control}
      isMobile={isBrowserMobile}
      onConfirm={handleSubmit(onSubmit)}
      errors={errors}
      isValid={!isValid}
      loading={fetchLoading || loading}
      fetchLoading={fetchLoading}
      zipRef={zipRef}
      countryRef={countryRef}
      stateRef={stateRef}
      cityRef={cityRef}
      addressRef={addressRef}
      onEndAddressSubmit={handleEndAddressSubmit}
      onEndCitySubmit={handleEndCitySubmit}
      onEndStateSubmit={handleEndStateSubmit}
      onEndCountrySubmit={handleEndCountrySubmit}
      onEndZipSubmit={handleEndZipSubmit}
      onUpdateAddress={onUpdateAddress}
    />
  );
};

export default AddressEditContainer;
