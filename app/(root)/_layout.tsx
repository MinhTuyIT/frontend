import Avatar from "@/assets/images/avatar.png";
import { Button } from "@/components/Elements";
import useBranchConfig from "@/config/branch";
import { LogoutModal, useAuth, useCurrentUser } from "@/features/auth";
import { MenuList, ScreenConfigs } from "@/utils/constant";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  ButtonIcon,
  ChevronDownIcon,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Header } from "layout";
import { useCallback, useState } from "react";
import { Dimensions, Platform } from "react-native";
const width = Dimensions.get("screen").width;
export default function Layout() {
  const authData = useAuth();
  const { auth } = authData ?? {};
  const isLoggedIn = !!auth;
  const currentUser = useCurrentUser();
  const [showList, setShowList] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = useCallback(() => setIsOpen(true), []);
  const onNavigate = useCallback(() => {
    router.navigate("/sign-in");
  }, []);
  const handleClickOption = useCallback(
    (key: string) => {
      if (key === "sign_out") {
        onOpen();
      } else {
        router.navigate(key);
      }
    },
    [onOpen]
  );
  const handleClickConsign = useCallback(() => {
    if (isLoggedIn) {
      router.navigate("consign");
    }
  }, [isLoggedIn]);
  const screenOptions = useCallback(
    (): DrawerNavigationOptions => ({
      swipeEnabled: Platform.OS !== "web",
      headerShown: true,
      header: ({ navigation: { openDrawer } }) => (
        <>
          <Header
            onMenuPress={openDrawer}
            onConsignPress={handleClickConsign}
            onPressItemMenu={handleClickOption}
            onSignInPress={onNavigate}
          />
        </>
      ),
      drawerType: "front",
      drawerStyle: { width },
      drawerItemStyle: { marginLeft: 16, marginRight: 16 },
    }),
    [handleClickConsign, handleClickOption, onNavigate]
  );
  useBranchConfig();

  return (
    <>
      <Drawer
        initialRouteName="(home)"
        backBehavior="none"
        defaultStatus="closed"
        screenOptions={screenOptions}
        drawerContent={(props: DrawerContentComponentProps) => (
          <DrawerContentScrollView
            {...props}
            scrollEnabled={false}
            contentContainerStyle={{ height: "100%" }}
          >
            <HStack
              mb="$12"
              justifyContent="flex-end"
              alignSelf="flex-end"
              mr="$5"
            >
              <Button
                px="$0"
                p="$2"
                bg="$transparent"
                onPress={() => props.navigation.closeDrawer()}
                leftIcon={<MaterialCommunityIcons name="close" size={25} />}
              />
            </HStack>
            <VStack mx="$9">
              {!isLoggedIn ? (
                <Button
                  label="Sign in"
                  height={38}
                  variant="outline"
                  borderColor="$content"
                  labelProps={{
                    color: "$content",
                    fontSize: "$md",
                    fontFamily: "$bodySemiBold",
                    lineHeight: 30,
                    textAlign: "center",
                  }}
                  onPress={onNavigate}
                />
              ) : (
                <Pressable w="$full" onPress={() => setShowList(!showList)}>
                  <HStack
                    width="100%"
                    p="$1.5"
                    borderWidth={1}
                    rounded={12}
                    justifyContent="space-between"
                    alignItems="center"
                    testID="accountSelection"
                  >
                    <Image
                      source={Avatar}
                      alt=""
                      w="$6.5"
                      resizeMode="contain"
                      h="$6.5"
                    />
                    <Text lineHeight="$xl" flex={1} numberOfLines={1} pl="$2">
                      {`${currentUser?.firstName ?? ""} ${
                        currentUser?.lastName ?? ""
                      }`}
                    </Text>
                    <VStack
                      bg="$lightBlue50"
                      rounded={4}
                      w={26}
                      h={26}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <ButtonIcon
                        as={ChevronDownIcon}
                        color="$black"
                        size="lg"
                      />
                    </VStack>
                  </HStack>
                </Pressable>
              )}
              {showList && isLoggedIn && (
                <VStack pt="$2" pb="$4">
                  {MenuList.map((item, index) => {
                    return (
                      <Pressable
                        key={item.key}
                        onPress={() => handleClickOption(item.key)}
                        borderTopWidth={1}
                        borderColor={
                          index === 0 ? "$transparent" : "$coolGray300"
                        }
                        py="$2.5"
                        testID={item.testID}
                      >
                        <Text
                          color={item.key === "sign_out" ? "$error600" : ""}
                        >
                          {item.title}
                        </Text>
                      </Pressable>
                    );
                  })}
                </VStack>
              )}
              <Button
                label="Consign"
                height={38}
                mt="$4"
                labelProps={{
                  color: "$bgSecondary",
                  fontSize: "$md",
                  fontFamily: "$bodySemiBold",
                  lineHeight: 30,
                  textAlign: "center",
                }}
                onPress={handleClickConsign}
              />
            </VStack>
          </DrawerContentScrollView>
        )}
      >
        {ScreenConfigs.map(({ name, title, drawerLabel }) => (
          <Drawer.Screen
            key={name}
            name={name}
            options={{
              title,
              drawerLabel,
              drawerIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
        ))}
      </Drawer>
      <LogoutModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
