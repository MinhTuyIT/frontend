import { ScrollView } from "@gluestack-ui/themed";
import { Slot } from "expo-router";

import { AuthLayout } from "@/features/auth";

export default function Layout() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <AuthLayout>
        <Slot />
      </AuthLayout>
    </ScrollView>
  );
}
