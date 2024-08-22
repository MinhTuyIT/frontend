import { FormControl, VStack, View } from "@gluestack-ui/themed";
import { testIDs } from "e2e/testIDs";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import { TextInput } from "react-native";
import { IDropdownRef } from "react-native-element-dropdown";

import {
  FormControlInput,
  FormControlSelect,
  InputAddress,
  Model,
  StackView,
} from "@/components/Elements";
import { IAddressCallback } from "@/components/Elements/InputAddress/InputAddressContainer";
import { CreateAddressInput } from "@/generated/graphql";
import { countries } from "@/utils/country";

export interface AddressNewProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  isMobile?: boolean;
  control: Control<CreateAddressInput>;
  errors: FieldErrors<CreateAddressInput>;
  isValid?: boolean;
  loading?: boolean;
  addressRef?: React.RefObject<TextInput>;
  cityRef?: React.RefObject<TextInput>;
  stateRef?: React.RefObject<TextInput>;
  zipRef?: React.RefObject<TextInput>;
  countryRef?: React.RefObject<IDropdownRef>;
  onEndAddressSubmit?: () => void;
  onEndCitySubmit?: () => void;
  onEndStateSubmit?: () => void;
  onEndCountrySubmit?: () => void;
  onEndZipSubmit?: () => void;
  onUpdateAddress?: (address: IAddressCallback) => void;
}

const AddressNewView = ({
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
  addressRef,
  countryRef,
  stateRef,
  zipRef,
  onUpdateAddress,
}: AddressNewProps) => {
  return (
    <Model
      isOpen={isOpen}
      title="NEW ADDRESS"
      headerProps={{
        px: 36,
        pt: 36,
        pb: 11,
        justifyContent: !isMobile ? "flex-start" : "center",
      }}
      headingProps={{ fontFamily: "$bodyBold" }}
      bodyProps={{ px: 36, pb: 40 }}
      footerProps={{ px: 36, pb: 36, pt: 0 }}
      onClose={onClose}
      textBtnConfirm="Add Address"
      textBtnClose="Cancel"
      onConfirm={onConfirm}
      keyboardShouldPersistTaps="handled"
      avoidKeyboard
      confirmLoading={loading}
      buttonConfirmProps={{
        isDisabled: isValid || loading,
        testID: testIDs.NEW_ADDRESS.ADD_ADDRESS,
      }}
      buttonCancelProps={{
        isDisabled: loading,
        testID: testIDs.NEW_ADDRESS.CANCEL,
      }}
      textProps={{ lineHeight: "$xl", fontFamily: "$bodyBold" }}
      contentProps={{ bg: "$white" }}
      size="lg"
      testID={testIDs.NEW_ADDRESS.SCREEN}
    >
      <VStack gap="$4">
        <InputAddress
          control={control}
          name="address1"
          label="Address"
          ref={addressRef}
          labelProps={{ fontFamily: "$bodyBold" }}
          errorMessage={errors?.address1?.message?.toString() || ""}
          isRequired
          isInvalid={"address1" in errors}
          onSubmitEditing={onEndAddressSubmit}
          onUpdateAddress={onUpdateAddress}
          testID={testIDs.NEW_ADDRESS.ADDRESS}
        />

        <StackView display={isMobile ? "column" : "row"} gap="$4">
          <View flex={1}>
            <FormControlInput
              control={control}
              name="city"
              label="City"
              labelProps={{ fontFamily: "$bodyBold" }}
              inputField={{
                maxLength: 255,
              }}
              ref={cityRef}
              onSubmitEditing={onEndCitySubmit}
              isRequired
              isInvalid={"city" in errors}
              testID={testIDs.NEW_ADDRESS.CITY}
            />
          </View>
          <View flex={1}>
            <FormControl isRequired isInvalid={"state" in errors}>
              <FormControlInput
                control={control}
                name="state"
                label="State"
                labelProps={{ fontFamily: "$bodyBold" }}
                inputField={{
                  maxLength: 255,
                }}
                ref={stateRef}
                onSubmitEditing={onEndStateSubmit}
                isRequired
                isInvalid={"city" in errors}
                testID={testIDs.NEW_ADDRESS.STATE}
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
            <FormControlSelect
              isRequired
              isInvalid={"country" in errors}
              label="Country"
              name="country"
              control={control}
              testID={testIDs.NEW_ADDRESS.COUNTRY}
              placeholder=""
              labelProps={{ fontFamily: "$bodyBold", fontSize: "$sm" }}
              selectProps={{
                options: countries,
                onBlur: onEndCountrySubmit,
                ref: countryRef,
              }}
            />
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
              isInvalid={"zip" in errors}
              testID={testIDs.NEW_ADDRESS.ZIP_CODE}
            />
          </View>
        </StackView>
      </VStack>
    </Model>
  );
};

export default AddressNewView;
