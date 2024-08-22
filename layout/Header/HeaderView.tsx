import { useBreakpointValue } from "@gluestack-style/react";
import {
  Box,
  ButtonIcon,
  HStack,
  Menu,
  MenuItem,
  MenuItemLabel,
  VStack,
} from "@gluestack-ui/themed";
import { testIDs } from "e2e/testIDs";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MenuIcon,
  SearchIcon,
} from "lucide-react-native";
import React, { PropsWithChildren } from "react";
import { Platform } from "react-native";

import Avatar from "../../assets/images/avatar.png";

import { Button, Container, NavButton, Text } from "@/components/Elements";
import { MenuList } from "@/utils/constant";

export interface HeaderViewProps {
  isLoggedIn?: boolean;
  showMenu: boolean;
  isSigningOut?: boolean;
  paddingTop?: number;
  widthSearchBar: number;
  onLogout?: () => void;
  onMenuPress?: () => void;
  onSignInPress?: () => void;
  onConsignPress?: () => void;
  onSearchPress?: () => void;
  onPressItemMenu?: (key: string) => void;
  fullName?: string;
}

const HeaderView: React.FC<PropsWithChildren<HeaderViewProps>> = ({
  children,
  isLoggedIn = false,
  paddingTop = 0,
  showMenu,
  onMenuPress,
  onSignInPress,
  onSearchPress,
  widthSearchBar,
  onConsignPress,
  onPressItemMenu,
  fullName,
}) => {
  const displayFull = useBreakpointValue({
    base: "column",
    sm: "column",
    md: "row",
    lg: "row",
    xl: "row",
  });
  return (
    <>
      <Box
        flexDirection="row"
        justifyContent="flex-end"
        backgroundColor="$white"
        pt={paddingTop}
        zIndex={99}
        shadowColor="#0000003d"
        shadowOffset={{ width: 0, height: 3 }}
        shadowOpacity={1}
        shadowRadius={8}
        elevation={8}
      >
        <Container
          display="flex"
          alignItems="flex-start"
          $lg-alignItems="flex-end"
          px={
            Platform.OS === "web"
              ? displayFull === "row"
                ? "$14"
                : "$5"
              : "$5"
          }
          py="$6"
        >
          <HStack w="$full" alignItems="center" justifyContent="space-between">
            <Link
              href="/(home)"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Image
                source={require("../../assets/images/logo.png")}
                style={{
                  width: Platform.OS === "web" ? 208 : 173,
                  height: Platform.OS === "web" ? 26 : 22,
                }}
                alt="image-logo"
                contentFit="cover"
              />
            </Link>
            {showMenu ? (
              <HStack gap="$2">
                <NavButton onPress={onSearchPress}>
                  <ButtonIcon as={SearchIcon} w={30} size="xl" color="$black" />
                </NavButton>
                <NavButton onPress={onMenuPress} testID="menuIcon">
                  <ButtonIcon as={MenuIcon} w={30} size="xl" color="$black" />
                </NavButton>
              </HStack>
            ) : (
              <HStack gap="$2">
                <Button onPress={onSearchPress} p="$0" bg="$trueGray200">
                  <HStack
                    h={39}
                    width={widthSearchBar}
                    justifyContent="space-between"
                    alignItems="center"
                    pl="$4.5"
                    pr="$4"
                  >
                    <Text>Search</Text>
                    <ButtonIcon as={SearchIcon} size="lg" color="$black" />
                  </HStack>
                </Button>
                <Button
                  bg="$primary500"
                  gap="$1"
                  px="$5"
                  h={39}
                  py="$2"
                  rounded={12}
                  label="Consign"
                  onPress={onConsignPress}
                />
                {!isLoggedIn ? (
                  <Button
                    gap="$1"
                    px="$5"
                    h={39}
                    py="$2"
                    rounded={12}
                    borderWidth={1}
                    onPress={onSignInPress}
                    label="Sign in"
                    variant="outline"
                    borderColor="$black"
                  />
                ) : (
                  <Menu
                    placement="bottom right"
                    disabledKeys={["Profile"]}
                    offset={10}
                    minWidth="$40"
                    closeOnSelect
                    trigger={({ ...triggerProps }) => {
                      console.log(triggerProps);
                      return (
                        <NavButton
                          {...triggerProps}
                          variant="link"
                          h={39}
                          borderWidth={1}
                          rounded={12}
                          gap="$2"
                          p="$2"
                          testID={testIDs.HEADER.DROPDOWN_ICON}
                        >
                          <Image
                            source={Avatar}
                            style={{
                              width: 24,
                              height: 24,
                            }}
                            contentFit="cover"
                          />
                          <Text maxWidth="$30" numberOfLines={1}>
                            {fullName}
                          </Text>
                          <VStack
                            bg="$lightBlue50"
                            rounded={4}
                            w={26}
                            h={26}
                            justifyContent="center"
                            alignItems="center"
                          >
                            {triggerProps?.["aria-expanded"] ? (
                              <ButtonIcon
                                as={ChevronUpIcon}
                                color="$black"
                                size="lg"
                              />
                            ) : (
                              <ButtonIcon
                                as={ChevronDownIcon}
                                color="$black"
                                size="lg"
                              />
                            )}
                          </VStack>
                        </NavButton>
                      );
                    }}
                  >
                    {MenuList.map(item => {
                      return (
                        <MenuItem
                          key={item.key}
                          textValue={item.title}
                          onPress={() => onPressItemMenu?.(item.key)}
                          testID={item.testID}
                        >
                          <MenuItemLabel
                            color={item.key === "sign_out" ? "$error600" : ""}
                          >
                            {item.title}
                          </MenuItemLabel>
                        </MenuItem>
                      );
                    })}
                  </Menu>
                )}
              </HStack>
            )}
          </HStack>
        </Container>
      </Box>
      {children}
    </>
  );
};

export default HeaderView;
