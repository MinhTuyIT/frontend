import { getCountries } from "react-phone-number-input";
import en from "react-phone-number-input/locale/en.json";

const countriesResults = getCountries()?.map(v => ({
  value: v,
  label: en[v],
}));

const countries = countriesResults.sort((a, b) =>
  a.label.localeCompare(b.label)
);

export { countries };
