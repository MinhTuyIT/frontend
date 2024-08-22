import { Stack } from "expo-router";

import { ProtectedRoute } from "@/features/auth";

export default function Layout() {
  return (
    <ProtectedRoute>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          title: "Watch List",
        }}
      />
    </ProtectedRoute>
  );
}
