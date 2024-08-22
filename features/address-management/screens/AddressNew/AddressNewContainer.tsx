import { useBreakpointValue } from "@gluestack-style/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { Platform, TextInput } from "react-native";
import { IDropdownRef } from "react-native-element-dropdown";
import * as yup from "yup";

import AddressNewView from "./AddressNewView";

import { IAddressCallback } from "@/components/Elements/InputAddress/InputAddressContainer";
import {
  AddressManagementListMyAddressesDocument,
  CreateAddressInput,
  useAddressManagementCreateAddressMutation,
} from "@/generated/graphql";
import useToastMessage from "@/hooks/useToastMessage";
import { formatError } from "@/utils/format";
import {
  MessageError,
  MessageRequired,
  MessageSuccess,
} from "@/utils/validation";

interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

const validate = yup.object().shape({
  address1: yup.string().required(MessageRequired.requiredAddress),
  country: yup.string().required(MessageRequired.requiredCountry),
  zip: yup.string().required(MessageRequired.requiredZipCode),
  state: yup.string().required(MessageRequired.requiredState),
  city: yup.string().required(MessageRequired.requiredCity),
});

const emptyValue = {
  address1: "",
  city: "",
  state: "",
  country: "US",
  zip: "",
};

const AddressNewContainer = ({ isOpen, onClose }: Props) => {
  const isBrowserMobile = useBreakpointValue({ base: true, md: false });
  const toast = useToastMessage();
  const [createAddress, { loading, client }] =
    useAddressManagementCreateAddressMutation();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
  } = useForm<CreateAddressInput>({
    resolver: yupResolver(validate),
    defaultValues: emptyValue,
  });
  const cityRef = useRef<TextInput>(null);
  const stateRef = useRef<TextInput>(null);
  const countryRef = useRef<IDropdownRef>(null);
  const zipRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);

  const onSubmit = useCallback(
    async (values: any) => {
      try {
        const response = await createAddress({ variables: { input: values } });
        if (response) {
          client.refetchQueries({
            include: [AddressManagementListMyAddressesDocument],
          });
          toast.show({
            description: MessageSuccess.newAddress,
            action: "success",
          });
          reset(emptyValue);
        }
      } catch (err) {
        const error = formatError(err);
        toast.show({
          description: error.message ?? MessageError.uncaughtError,
          action: "error",
        });
      } finally {
        onClose?.();
      }
    },
    [client, createAddress, onClose, reset, toast]
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

  const handleClose = useCallback(() => {
    onClose?.();
    reset(emptyValue);
  }, [onClose, reset]);

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

  return (
    <AddressNewView
      isOpen={isOpen}
      onClose={handleClose}
      control={control}
      isMobile={isBrowserMobile}
      onConfirm={handleSubmit(onSubmit)}
      errors={errors}
      isValid={!isValid}
      loading={loading}
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

export default AddressNewContainer;
