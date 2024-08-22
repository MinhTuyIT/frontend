/* eslint-disable react/display-name */
import {
  FormControl,
  FormControlLabelText,
  Input,
  InputField,
  useBreakpointValue,
} from "@gluestack-ui/themed";
import React, {
  ComponentProps,
  ReactNode,
  forwardRef,
  useCallback,
  useState,
} from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { TextInput } from "react-native";

import InputAddressView from "./InputAddressView";

export interface IAddressCallback {
  address: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
}

const initAddress: IAddressCallback = {
  address: "",
  postal_code: "",
  city: "",
  state: "",
  country: "",
};
interface RemoveThoseKeys {
  Icon: any;
  Slot: any;
  Input: any;
}

export type IFromControlProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    ComponentProps<typeof FormControl> & {
      isReadOnly?: boolean;
      isRequired?: boolean;
      isDisabled?: boolean;
      isInvalid?: boolean;
      numberField?: boolean;
      height?: number;
      size?: "sm" | "md" | "lg";
      control?: Control<TFieldValues>;
      label?: string;
      placeholder?: string;
      errorMessage?: string;
      helperText?: string;
      testID?: string;
      defaultValue?: string;
      errors?: FieldErrors<TFieldValues>;
      onSubmitEditing?: () => void;
      labelProps?: ComponentProps<typeof FormControlLabelText>;
      leftIcon?: ReactNode;
      rightIcon?: ReactNode;
      customHelper?: ReactNode;
      onPressLeftIcon?: () => void;
      onPressRightIcon?: () => void;
      onPlaceSelected?: (address: any) => void;
      onUpdateAddress?: (address: IAddressCallback) => void;
      inputField?: ComponentProps<typeof InputField>;
      valueInputRef?: React.RefObject<TextInput>;
      input?: Omit<ComponentProps<typeof Input>, keyof RemoveThoseKeys>;
    };

const InputAddressContainer = forwardRef<TextInput, IFromControlProps<any>>(
  <TFieldValues extends FieldValues>(
    props: IFromControlProps<TFieldValues>,
    ref?: React.LegacyRef<any>
  ) => {
    const height = useBreakpointValue({ base: 32, md: 42 });
    const [focus, setFocus] = useState(false);

    const onPlaceSelected = useCallback(
      (place: any) => {
        const addressComponents = place.address_components;
        const addressTemp: IAddressCallback = initAddress;
        if (addressComponents) {
          addressComponents.forEach((component: any) => {
            const type = component.types[0];
            switch (type) {
              case "locality":
                addressTemp.address = component.long_name;
                break;
              case "administrative_area_level_2":
                addressTemp.city = component.long_name;
                break;
              case "administrative_area_level_1":
                addressTemp.state = component.long_name;
                break;
              case "country":
                addressTemp.country = component.short_name;
                break;
              case "postal_code":
                addressTemp.postal_code = component.long_name;
                break;
            }
            props.onUpdateAddress?.(addressTemp);
          });
        }
      },
      [props]
    );

    return (
      <InputAddressView
        onPlaceSelected={onPlaceSelected}
        ref={ref}
        height={height}
        isFocus={focus}
        setFocus={setFocus}
        {...props}
      />
    );
  }
);

export default InputAddressContainer;
