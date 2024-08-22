import {
  ButtonIcon,
  HStack,
  Menu,
  MenuItem,
  MenuItemLabel,
  VStack,
} from "@gluestack-ui/themed";
import { ChevronDownIcon } from "lucide-react-native";
import { memo } from "react";

import { MenuFilterList } from "./FilterContainer";

import { NavButton, Text } from "@/components/Elements";

const FilerView = ({ filter, onChangeFilter }: any) => {
  return (
    <HStack justifyContent="center" alignItems="center">
      <Text fontWeight="600">Sort By</Text>
      <Menu
        placement="bottom right"
        disabledKeys={["Profile"]}
        offset={10}
        minWidth="$40"
        trigger={({ ...triggerProps }) => {
          return (
            <NavButton
              {...triggerProps}
              variant="link"
              borderWidth={1}
              rounded={9}
              p={3}
              ml="$1.5"
              justifyContent="space-between"
              flex={1}
            >
              <Text fontSize={13}>{filter?.title}</Text>
              <VStack
                bg="$coolGray200"
                rounded={6}
                w={24}
                h={24}
                justifyContent="center"
                alignItems="center"
                mr={3}
              >
                <ButtonIcon as={ChevronDownIcon} color="$black" size="lg" />
              </VStack>
            </NavButton>
          );
        }}
      >
        {MenuFilterList.map(item => {
          return (
            <MenuItem
              key={item.key}
              textValue={item.title}
              // minWidth={200}
              width="$full"
              onPress={() => onChangeFilter?.(item)}
            >
              <MenuItemLabel>{item.title}</MenuItemLabel>
            </MenuItem>
          );
        })}
      </Menu>
    </HStack>
  );
};

export default memo(FilerView);
