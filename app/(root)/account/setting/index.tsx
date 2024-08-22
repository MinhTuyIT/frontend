import { Icon } from "@gluestack-ui/themed";
import Head from "expo-router/head";
import { DrawerScreen } from "layout";
import { SlidersHorizontal } from "lucide-react-native";

import { Text } from "@/components/Elements";

const Index = () => {
  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <DrawerScreen
        headerProps={{
          title: "SETTINGS",
          icon: <Icon as={SlidersHorizontal} size="lg" />,
        }}
      >
        <Text>Settings Screen</Text>
      </DrawerScreen>
    </>
  );
};

export default Index;
