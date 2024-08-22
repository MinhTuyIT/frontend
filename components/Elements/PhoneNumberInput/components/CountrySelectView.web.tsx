import React from "react";
import PhoneInput, {
  Country,
  DefaultInputComponentProps,
  Value,
} from "react-phone-number-input";

import "react-phone-number-input/style.css";
import "./custom-phone-input.css";

interface Props extends DefaultInputComponentProps {
  error?: boolean;
  value?: string;
  onChange: (value?: Value) => void;
  label?: string;
  withAsterisk?: boolean;
  onCountryChangeWeb?: (country?: Country) => void;
  onChangeCodeCountry?: (country: string) => void;
}

const CountrySelectView = ({
  label = "Phone Number",
  error,
  withAsterisk,
  value,
  onChange,
  onCountryChangeWeb,
  ...props
}: Props) => {
  return (
    <PhoneInput
      international
      countryCallingCodeEditable={false}
      defaultCountry="US"
      value={value}
      countrySelectProps={{
        unicodeFlags: true,
      }}
      numberInputProps={{
        className: "phone-number-input",
      }}
      inputProps={{
        readOnly: true,
      }}
      countrySelectProps={{}}
      onCountryChange={onCountryChangeWeb}
      onChange={onChange}
      className="phone-number-country"
    />
  );
};

export default CountrySelectView;
