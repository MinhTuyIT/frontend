import { Ionicons } from "@expo/vector-icons";
import {
  HStack,
  Icon,
  useBreakpointValue,
  useToken,
} from "@gluestack-ui/themed";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import { DebitCardIcon } from "assets/icons/DebitCardIcon";
import { UserIcon } from "assets/icons/UserIcon";
import { Drawer } from "expo-router/drawer";
import PageFooter from "layout/PageFooter";
import { ArrowLeft, SlidersHorizontal } from "lucide-react-native";
import { useCallback } from "react";
import { Platform } from "react-native";

import { Button, MainAccount, Text } from "@/components/Elements";
import { ProtectedRoute } from "@/features/auth";

export default function Layout() {
  const drawerType = useBreakpointValue({ base: "front", md: "permanent" });
  const bgActiveColor = useToken("colors", "primary500");

  const screenOptions = useCallback(
    (): DrawerNavigationOptions => ({
      swipeEnabled: Platform.OS !== "web",
      headerShown: true,
      drawerType,
      drawerItemStyle: {
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 12,
      },
      drawerActiveTintColor: "white",
      drawerActiveBackgroundColor: bgActiveColor,
    }),
    [drawerType, bgActiveColor]
  );

  return (
    <MainAccount>
      <ProtectedRoute>
        <Drawer
          initialRouteName="profile"
          backBehavior="history"
          defaultStatus="closed"
          screenOptions={screenOptions}
          drawerContent={(props: DrawerContentComponentProps) => (
            <DrawerContentScrollView
              {...props}
              scrollEnabled={false}
              contentContainerStyle={{
                height: "100%",
                minHeight: 800,
                flex: 1,
                paddingLeft: drawerType === "front" ? 0 : 48,
                paddingRight: drawerType === "front" ? 0 : 12,
                paddingTop: 32,
              }}
            >
              <HStack
                borderBottomWidth={1}
                borderBottomColor="$secondary300"
                mb="$2"
                mx="$8"
                pb="$2"
                alignItems="center"
              >
                {drawerType === "front" && (
                  <Button
                    w={30}
                    h={30}
                    bg="$secondary200"
                    justifyContent="center"
                    alignItems="center"
                    rounded={4}
                    onPress={() => props.navigation.closeDrawer()}
                    px={0}
                    leftIcon={<Icon as={ArrowLeft} w={20} h={20} />}
                  />
                )}
                <Text
                  fontSize={drawerType === "front" ? "$xl" : "$sm"}
                  ml="$6"
                  pb="$1"
                  lineHeight={drawerType === "front" ? "$2xl" : undefined}
                  fontFamily="$bodyBold"
                  color="$defaultContent"
                >
                  {drawerType === "permanent" ? "ACCOUNT" : "Account"}
                </Text>
              </HStack>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          )}
        >
          <Drawer.Screen
            name="profile"
            options={{
              title: "profile",
              drawerLabel: ({ focused, color }) => (
                <Text
                  lineHeight={Platform.OS !== "web" ? "$xl" : undefined}
                  fontFamily={focused ? "$bodyBold" : "$body"}
                  color={color}
                  padding={0}
                >
                  PROFILE
                </Text>
              ),
              drawerIcon: ({ focused }) => {
                return (
                  <Icon
                    as={UserIcon(focused ? "white" : "black")}
                    size="md"
                    ml={5}
                  />
                );
              },
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="address"
            options={{
              title: "address",
              drawerLabel: ({ focused, color }) => (
                <Text
                  lineHeight={Platform.OS !== "web" ? "$xl" : undefined}
                  fontFamily={focused ? "$bodyBold" : "$body"}
                  color={color}
                >
                  ADDRESSES
                </Text>
              ),
              drawerIcon: ({ color, size }) => (
                <Ionicons name="location-outline" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="payment-method"
            options={{
              title: "payment-method",
              drawerLabel: ({ focused, color }) => (
                <Text
                  lineHeight={Platform.OS !== "web" ? "$xl" : undefined}
                  fontFamily={focused ? "$bodyBold" : "$body"}
                  color={color}
                >
                  PAYMENT METHODS
                </Text>
              ),
              drawerIcon: ({ focused }) => (
                <Icon
                  as={DebitCardIcon(focused ? "white" : "black")}
                  size="lg"
                />
              ),
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="setting"
            options={{
              title: "setting",
              drawerLabel: ({ focused, color }) => (
                <Text
                  lineHeight={Platform.OS !== "web" ? "$xl" : undefined}
                  fontFamily={focused ? "$bodyBold" : "$body"}
                  color={color}
                >
                  SETTINGS
                </Text>
              ),
              drawerIcon: ({ color }) => (
                <Icon as={SlidersHorizontal} color={color} size="lg" />
              ),
              headerShown: false,
            }}
          />
        </Drawer>
        {drawerType === "permanent" && <PageFooter />}
      </ProtectedRoute>
    </MainAccount>
  );
}
