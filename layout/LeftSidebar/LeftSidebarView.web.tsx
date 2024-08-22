import {
  Box,
  Button,
  ButtonIcon,
  ButtonText,
  Divider,
  VStack,
} from "@gluestack-ui/themed";
import { UserIcon } from "assets/icons/UserIcon";
import {
  CreditCardIcon,
  LucideIcon,
  MapPinIcon,
  SlidersHorizontalIcon,
} from "lucide-react-native";
import { FlatList } from "react-native";

import { Text } from "@/components/Elements";

export type SidebarItemProps = {
  name: string;
  icon: LucideIcon;
};

type LeftSidebarViewProps = {
  selected: SidebarItemProps;
  onSelect: (item: SidebarItemProps) => void;
};

const LeftSidebarView = ({ selected, onSelect }: LeftSidebarViewProps) => {
  return (
    <VStack
      h="$full"
      borderRightWidth="$1"
      borderRightColor="$warmGray200"
      pt="$2"
      pr="$6"
      pl="$12"
    >
      <Text pl="$10" bold>
        ACCOUNT
      </Text>
      <Box px="$4">
        <Divider bgColor="$warmGray200" mt="$4" mb="$2" />
      </Box>
      <FlatList
        data={SIDEBAR_ITEMS}
        contentContainerStyle={{ width: 250 }}
        keyExtractor={(item: SidebarItemProps) => item.name}
        ItemSeparatorComponent={() => <Divider bgColor="$transparent" h="$2" />}
        renderItem={({ item }: { item: SidebarItemProps }) => {
          const isSelected = item.name === selected.name;
          return (
            <Button
              flexDirection="row"
              alignItems="center"
              bgColor={isSelected ? "#005a54" : "$transparent"}
              borderRadius="$xl"
              onPress={() => onSelect(item)}
            >
              <ButtonIcon as={item.icon} mr="$2" />
              <ButtonText
                flex={1}
                numberOfLines={1}
                color={isSelected ? "$white" : "#a7a5a6"}
              >
                {item.name}
              </ButtonText>
            </Button>
          );
        }}
      />
    </VStack>
  );
};

export default LeftSidebarView;

export const SIDEBAR_ITEMS: SidebarItemProps[] = [
  {
    name: "PROFILEabc",
    icon: UserIcon() as LucideIcon,
  },
  {
    name: "ADDRESSES",
    icon: MapPinIcon,
  },
  {
    name: "PAYMENT METHODS",
    icon: CreditCardIcon,
  },
  {
    name: "SETTINGS",
    icon: SlidersHorizontalIcon,
  },
];
