import { FormControl, VStack, View } from "@gluestack-ui/themed";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { TextInput } from "react-native";
import { IDropdownRef } from "react-native-element-dropdown";

import {
  FormControlInput,
  FormControlSelect,
  IAddressCallback,
  InputAddress,
  Model,
  Skeleton,
  StackView,
} from "@/components/Elements";
import { UpdateAddressInput } from "@/generated/graphql";
import { countries } from "@/utils/country";
export interface AddressNewProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  isMobile?: boolean;
  control: Control<UpdateAddressInput>;
  errors: FieldErrors<UpdateAddressInput>;
  isValid?: boolean;
  loading?: boolean;
  cityRef?: React.RefObject<TextInput>;
  stateRef?: React.RefObject<TextInput>;
  zipRef?: React.RefObject<TextInput>;
  countryRef?: React.RefObject<IDropdownRef>;
  addressRef?: React.RefObject<IDropdownRef>;
  onEndAddressSubmit?: () => void;
  onEndCitySubmit?: () => void;
  onEndStateSubmit?: () => void;
  onEndCountrySubmit?: () => void;
  onEndZipSubmit?: () => void;
  fetchLoading?: boolean;
  onUpdateAddress?: (address: IAddressCallback) => void;
}

const AddressEditView = ({
  isOpen,
  onClose,
  isMobile,
  control,
  onConfirm,
  errors,
  isValid,
  loading,
  cityRef,
  onEndAddressSubmit,
  onEndCitySubmit,
  onEndStateSubmit,
  onEndCountrySubmit,
  onEndZipSubmit,
  countryRef,
  stateRef,
  zipRef,
  fetchLoading,
  addressRef,
  onUpdateAddress,
}: AddressNewProps) => {
  return (
    <Model
      isOpen={isOpen}
      title="EDIT ADDRESS"
      headerProps={{
        px: "$9",
        pt: "$9",
        pb: "$3",
        justifyContent: !isMobile ? "flex-start" : "center",
      }}
      headingProps={{ fontFamily: "$bodyBold" }}
      bodyProps={{ px: "$9", pb: "$10" }}
      footerProps={{ px: "$9", pb: "$9", pt: "$0" }}
      onClose={onClose}
      textBtnConfirm="Save Changes"
      textBtnClose="Cancel"
      onConfirm={onConfirm}
      avoidKeyboard
      keyboardShouldPersistTaps="handled"
      contentProps={{ bg: "$white" }}
      confirmLoading={loading}
      buttonConfirmProps={{ isDisabled: isValid || loading }}
      buttonCancelProps={{ isDisabled: loading }}
      size="lg"
      textProps={{ fontFamily: "$bodyBold", lineHeight: "$xl" }}
    >
      <VStack gap="$4">
        <InputAddress
          control={control}
          loading={fetchLoading}
          ref={addressRef}
          name="address1"
          label="Address"
          labelProps={{ fontFamily: "$bodyBold" }}
          errorMessage={errors?.address1?.message?.toString() || ""}
          isRequired
          isInvalid={"address1" in errors}
          onUpdateAddress={onUpdateAddress}
          onSubmitEditing={onEndAddressSubmit}
        />

        <StackView display={isMobile ? "column" : "row"} gap="$4">
          <View flex={1}>
            <FormControlInput
              control={control}
              name="city"
              label="City"
              loading={fetchLoading}
              labelProps={{ fontFamily: "$bodyBold" }}
              inputField={{
                maxLength: 255,
              }}
              ref={cityRef}
              onSubmitEditing={onEndCitySubmit}
              isRequired
              isInvalid={"city" in errors}
            />
          </View>
          <View flex={1}>
            <FormControl isRequired isInvalid={"state" in errors}>
              <FormControlInput
                control={control}
                name="state"
                label="State"
                loading={fetchLoading}
                labelProps={{ fontFamily: "$bodyBold" }}
                inputField={{
                  maxLength: 255,
                }}
                ref={stateRef}
                onSubmitEditing={onEndStateSubmit}
                isRequired
                isInvalid={"city" in errors}
              />
            </FormControl>
          </View>
        </StackView>
        <StackView
          display={isMobile ? "column" : "row"}
          flexDirection={isMobile ? "column-reverse" : "row"}
          gap="$4"
        >
          <View flex={1} pt="$1">
            <Skeleton
              loading={fetchLoading}
              width={100}
              height={20}
              radius={4}
              mb="$2"
            />
            <Skeleton loading={fetchLoading}>
              <FormControlSelect
                isRequired
                isInvalid={"country" in errors}
                label="Country"
                name="country"
                control={control}
                placeholder=""
                labelProps={{ fontFamily: "$bodyBold", fontSize: "$sm" }}
                selectProps={{
                  options: countries,
                  onBlur: onEndCountrySubmit,
                  ref: countryRef,
                }}
              />
            </Skeleton>
          </View>
          <View flex={1}>
            <FormControlInput
              control={control}
              name="zip"
              label="Zip Code"
              labelProps={{ fontFamily: "$bodyBold" }}
              errorMessage={errors?.zip?.message?.toString() || ""}
              inputField={{
                maxLength: 255,
              }}
              ref={zipRef}
              onSubmitEditing={onEndZipSubmit}
              isRequired
              loading={fetchLoading}
              isInvalid={"zip" in errors}
            />
          </View>
        </StackView>
      </VStack>
    </Model>
  );
};

export default AddressEditView;
