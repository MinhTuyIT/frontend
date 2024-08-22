import {
  default as React,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

import PhoneNumberInputView from "@/components/Elements/PhoneNumberInput/PhoneNumberInputView";

interface PhoneNumberInputProps {
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  onCountryCodeChange?: (value: string) => void;
  isDisabled?: boolean;
  errorMessage?: string;
  loading?: boolean;
}

const PhoneNumberInputContainer = ({
  onChange,
  isDisabled,
  errorMessage,
  value,
  loading,
}: PhoneNumberInputProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("1_US");
  const countryCodeNumber = useMemo(
    () => countryCode?.split("_")?.[0],
    [countryCode]
  );
  const isValid = useMemo(
    () => isValidPhoneNumber(`+${countryCodeNumber}${phoneNumber}`),
    [countryCodeNumber, phoneNumber]
  );

  const handleChangePhoneValue = useCallback(
    (number: string) => {
      setPhoneNumber(number);
      onChange(number?.length ? `${countryCodeNumber}${number}` : "");
    },
    [countryCodeNumber, onChange]
  );

  const handleChangeCountryCode = useCallback(
    (countryCode: string) => {
      setCountryCode(countryCode);
      onChange(
        phoneNumber?.length
          ? `${countryCode.split("_")?.[0]}${phoneNumber}`
          : ""
      );
    },
    [onChange, phoneNumber]
  );

  useEffect(() => {
    const parsePhone = parsePhoneNumber(`+${value}`);
    if (!value) {
      setCountryCode("1_US");
      setPhoneNumber("");
    }
    if (parsePhone) {
      if (parsePhone.country) {
        setCountryCode(
          `${parsePhone.countryCallingCode}_${parsePhone.country}`
        );
        setPhoneNumber(parsePhone.nationalNumber);
      }
    }
  }, [value]);
  return (
    <PhoneNumberInputView
      handleChangePhoneValue={handleChangePhoneValue}
      isValid={isValid}
      countryCode={countryCode}
      handleChangeCountryCode={handleChangeCountryCode}
      phoneNumber={phoneNumber}
      isDisabled={isDisabled}
      errorMessage={errorMessage}
      loading={loading}
    />
  );
};

export default PhoneNumberInputContainer;
