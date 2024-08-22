import {
  ButtonIcon,
  FlatList,
  HStack,
  Menu,
  MenuItem,
  MenuItemLabel,
  VStack,
} from "@gluestack-ui/themed";
import { testIDs } from "e2e/testIDs";
import PageFooter from "layout/PageFooter";
import PageHeader from "layout/PageHeader";
import { ChevronDownIcon } from "lucide-react-native";
import { IHomeProps, MenuFilterList } from "./HomeContainer";

import { AuctionItem, Button, NavButton, Text } from "@/components/Elements";

const items = [...Array(20).keys()];
const HomeView = ({
  isLoadMore = true,
  isLoading,
  auctions = items,
  filter,
  onLoadMore,
  onPressSort,
  onChangeFilter,
}: IHomeProps) => {
  const renderFooterComponent = () => {
    return (
      <VStack>
        {isLoadMore && (
          <Button
            label="Load More"
            isLoading={isLoading}
            mx="$9"
            mt="$6"
            mb="$10"
            minWidth={120}
            onPress={onLoadMore}
          />
        )}
        <PageFooter />
      </VStack>
    );
  };
  const renderHeaderComponent = () => {
    return (
      <VStack>
        <PageHeader />
        <VStack ml="$5" mr="$4.5">
          <HStack alignItems="center" mt="$3.5">
            <Text
              fontSize="$2xl"
              color="$primary500"
              fontWeight="600"
              flex={1}
              lineHeight={58}
            >
              Auctions
            </Text>
            <Button
              label="Ending Soonest"
              labelProps={{
                fontSize: 13,
              }}
              onPress={() => onPressSort?.("soonest")}
            />
            <Button
              label="Ending Later"
              variant="outline"
              ml="$2.5"
              onPress={() => onPressSort?.("later")}
              labelProps={{
                fontSize: 13,
              }}
            />
          </HStack>
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
        </VStack>
      </VStack>
    );
  };
  return (
    <FlatList
      testID={testIDs.HOME.SCREEN}
      data={auctions}
      bg="$white"
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
      }}
      scrollEventThrottle={16}
      numColumns={2}
      showsHorizontalScrollIndicator
      showsVerticalScrollIndicator
      removeClippedSubviews
      decelerationRate="normal"
      keyExtractor={(item, index) => `${item}_${index}`}
      ListFooterComponent={renderFooterComponent}
      ListFooterComponentStyle={{ flex: 1 }}
      ListHeaderComponent={renderHeaderComponent}
      renderItem={_ => <AuctionItem />}
    />
  );
};

export default HomeView;
