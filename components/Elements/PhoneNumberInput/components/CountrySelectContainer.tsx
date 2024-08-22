import {
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
} from "react-phone-number-input";
import { default as en } from "react-phone-number-input/locale/en.json";

import { Text } from "@/components/Elements";
import Select from "@/components/Elements/Select";

const countrySelectOptions = getCountries()
  ?.filter(country => isSupportedCountry(country))
  ?.map(country => ({
    value: `${getCountryCallingCode(country)?.toString()}_${country}`,
    label: `+${getCountryCallingCode(country)}`,
    name: en?.[country],
  }));
const sortData = countrySelectOptions.sort((a, b) =>
  a?.name?.localeCompare(b?.name)
);

const CountrySelectContainer = ({
  onChange,
  value,
  isDisabled,
}: {
  onChange: (value: string) => void;
  value: string;
  isDisabled?: boolean;
}) => {
  return (
    <Select
      options={sortData}
      label="Phone Number"
      labelProps={{ fontSize: "$sm", fontFamily: "$bodyBold" }}
      isDisabled={isDisabled}
      onValueChange={onChange}
      width={100}
      selectedValue={value}
      containerStyle={{ width: 310 }}
      renderItem={v => {
        const countryCode = v.value?.split("_")?.[1];
        const countryName = en?.[countryCode];
        return <Text p="$3">{`${countryName} (${v.label})`}</Text>;
      }}
    />
  );
};
export default CountrySelectContainer;
