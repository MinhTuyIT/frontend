import { SimpleLineIcons } from "@expo/vector-icons";
import {
  Box,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
  Text,
  View,
  useBreakpointValue,
  useToken,
} from "@gluestack-ui/themed";
import React, { ComponentProps, forwardRef, useState } from "react";
import { DimensionValue, StyleProp, ViewStyle } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export interface IOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<
    ComponentProps<typeof Dropdown<IOption>>,
    "data" | "labelField" | "valueField" | "onChange"
  > {
  label?: string;
  error?: string;
  labelProps?: ComponentProps<typeof FormControlLabelText>;
  options?: IOption[];
  onValueChange?: (value: string) => void;
  isDisabled?: boolean;
  selectedValue?: string;
  height?: DimensionValue;
  width?: DimensionValue;
  containerStyle?: StyleProp<ViewStyle>;
}

const SelectContainer = forwardRef(function SelectContainer(
  {
    label,
    error,
    labelProps,
    options,
    onValueChange,
    isDisabled,
    selectedValue,
    height,
    width,
    style = {},
    containerStyle,
    onBlur,
    onFocus,
    ...props
  }: SelectProps,
  ref: any
) {
  const space1 = useToken("space", "1");
  const space2 = useToken("space", "2");
  const space12 = useToken("space", "12");
  const space9_5 = useToken("space", "9.5");
  const bgSecondary = useToken("colors", "bgSecondary");
  const bgDisabled = useToken("colors", "bgDisabled");
  const borderDisabled = useToken("colors", "borderDisabled");
  const defaultBorderColor = useToken("colors", "defaultBorderColor");
  const textInputDisabled = useToken("colors", "textInputDisabled");
  const breakpointHeight = useBreakpointValue({
    base: space9_5,
    md: space12,
  });
  const defaultColor = useToken("colors", "defaultColor");
  const [focus, setFocus] = useState(false);
  const bodyFont = useToken("fonts", "body");

  return (
    <View>
      {label && (
        <FormControlLabel>
          <FormControlLabelText {...labelProps}>{label}</FormControlLabelText>
        </FormControlLabel>
      )}
      <Dropdown
        disable={isDisabled}
        value={selectedValue}
        inputSearchStyle={{ borderRadius: 4, backgroundColor: "red" }}
        autoScroll={false}
        onFocus={() => {
          setFocus(true);
          onFocus?.();
        }}
        onBlur={() => {
          setFocus(false);
          onBlur?.();
        }}
        style={{
          backgroundColor: isDisabled ? bgDisabled : bgSecondary,
          height: height ?? breakpointHeight,
          width,
          borderRadius: space2,
          borderWidth: isDisabled ? 0 : 2,
          borderColor: isDisabled
            ? borderDisabled
            : focus
            ? defaultColor
            : defaultBorderColor,
          ...style,
        }}
        containerStyle={{
          borderRadius: space2,
          padding: space1,
          marginTop: space1,
          ...containerStyle,
        }}
        itemTextStyle={{ borderRadius: 4 }}
        selectedTextStyle={{
          color: isDisabled ? textInputDisabled : undefined,
          paddingLeft: space2,
          fontFamily: bodyFont,
        }}
        selectedTextProps={{
          numberOfLines: 1,
        }}
        itemContainerStyle={{ borderRadius: 8, overflow: "hidden" }}
        placeholderStyle={{
          flexWrap: "wrap",
          color: textInputDisabled,
          overflow: "hidden",
          paddingLeft: space2,
        }}
        renderItem={item => <Text p="$3">{item.label}</Text>}
        renderRightIcon={() => (
          <Box
            m="$2"
            w="$6.5"
            h="$6.5"
            bg={isDisabled ? borderDisabled : "$bgButtonGray91"}
            rounded="$md"
            justifyContent="center"
            alignItems="center"
          >
            <SimpleLineIcons
              name="arrow-down"
              color={isDisabled ? textInputDisabled : undefined}
              size={10}
            />
          </Box>
        )}
        {...props}
        ref={ref}
        labelField="label"
        valueField="value"
        onChange={item => {
          onValueChange?.(item.value);
        }}
        data={options || []}
      />
      {!!error && (
        <FormControlErrorText size="sm" mt="$1" color="$rose600">
          {error}
        </FormControlErrorText>
      )}
    </View>
  );
});

export default SelectContainer;
