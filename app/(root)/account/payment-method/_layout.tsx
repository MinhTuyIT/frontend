import { useToken } from "@gluestack-style/react";
import { Stack } from "expo-router";

export default function Layout() {
  const white = useToken("colors", "white");
  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        title: "payment-method",
        contentStyle: {
          backgroundColor: white,
        },
      }}
    />
  );
}
