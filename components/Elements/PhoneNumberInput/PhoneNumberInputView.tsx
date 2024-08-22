import {
  FormControl,
  FormControlErrorText,
  HStack,
  Icon,
  VStack,
} from "@gluestack-ui/themed";
import CircleXIcon from "assets/icons/CircleXIcon";
import React from "react";

import CountrySelectContainer from "./components";

import { Input, Skeleton } from "@/components/Elements";

export type CountrySelectType = {
  label: string;
  value: string;
};

export interface PhoneNumberInputViewProps {
  handleChangePhoneValue: (value: string) => void;
  isValid: boolean;
  countryCode: string;
  handleChangeCountryCode: (countryCode: string) => void;
  phoneNumber: string;
  isDisabled?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

const PhoneNumberInputView = ({
  handleChangePhoneValue,
  countryCode,
  handleChangeCountryCode,
  phoneNumber,
  isDisabled,
  errorMessage,
  loading,
}: PhoneNumberInputViewProps) => (
  <VStack>
    <Skeleton loading={loading}>
      <HStack gap="$1">
        <CountrySelectContainer
          onChange={handleChangeCountryCode}
          value={countryCode || "1_US"}
          isDisabled={isDisabled}
        />
        <VStack flex={1}>
          <FormControl size="md" flex={1}>
            <Input
              inputField={{
                onChangeText: handleChangePhoneValue,
                value: phoneNumber,
              }}
              mt={26}
              minWidth={125}
              isDisabled={isDisabled}
              errorMessage={errorMessage}
              isShowErrorMsg={false}
              numberField
              testID="phoneNumberInput"
            />
          </FormControl>
        </VStack>
      </HStack>
      {!!errorMessage && (
        <HStack gap="$1" alignItems="center" maxWidth="$full" mt="$1">
          <Icon as={CircleXIcon} size="xs" />
          <FormControlErrorText size="sm" color="$error600">
            {errorMessage}
          </FormControlErrorText>
        </HStack>
      )}
    </Skeleton>
  </VStack>
);

export default PhoneNumberInputView;
