import {
  ButtonIcon,
  ChevronDownIcon,
  HStack,
  Menu,
  MenuItem,
  MenuItemLabel,
  ScrollView,
  VStack,
} from "@gluestack-ui/themed";
import PageFooter from "layout/PageFooter";
import PageHeader from "layout/PageHeader";
import { Platform } from "react-native";

import { IHomeProps, MenuFilterList } from "./HomeContainer";

import { AuctionItem, Button, NavButton, Text } from "@/components/Elements";

const items = [...Array(20).keys()];
const HomeView = ({
  isLoadMore = true,
  isLoading,
  auctions = items,
  onLoadMore,
  onPressSort,
  filter,
  onChangeFilter,
}: IHomeProps) => {
  return (
    <ScrollView>
      <PageHeader />
      <VStack mx="$10" mt="$12">
        <HStack alignItems="center">
          <Text fontSize="$2xl" color="$primary500" lineHeight={58}>
            Auctions
          </Text>
          <VStack
            flex={1}
            height={1}
            bg="$secondary300"
            mr="$5"
            ml="$3.5"
            mt="$4"
          />
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
                    minWidth={120}
                    h={30}
                    mr="$2.5"
                    justifyContent="space-between"
                  >
                    <Text fontSize={13} ml="$2">
                      {filter?.title}
                    </Text>
                    <VStack
                      bg="$coolGray200"
                      rounded={6}
                      w={24}
                      h={24}
                      justifyContent="center"
                      alignItems="center"
                      mr={3}
                    >
                      <ButtonIcon
                        as={ChevronDownIcon}
                        color="$black"
                        size="lg"
                      />
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
          <Button
            label="Ending Soonest"
            labelProps={{
              fontSize: 13,
            }}
            h={30}
            onPress={() => onPressSort?.("soonest")}
          />
          <Button
            label="Ending Later"
            variant="outline"
            ml="$2.5"
            h={30}
            onPress={() => onPressSort?.("later")}
            labelProps={{
              fontSize: 13,
            }}
          />
        </HStack>
      </VStack>
      <HStack style={{ flexWrap: "wrap" }} justifyContent="center">
        {auctions.map(e => {
          return <AuctionItem key={e} />;
        })}
      </HStack>
      {isLoadMore && (
        <Button
          label="Load More"
          isLoading={isLoading}
          alignSelf={Platform.OS === "web" ? "center" : undefined}
          mx="$9"
          mt="$6"
          mb="$10"
          minWidth={120}
          onPress={onLoadMore}
        />
      )}
      <PageFooter />
    </ScrollView>
  );
};

export default HomeView;
