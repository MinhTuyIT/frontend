import { Ionicons } from "@expo/vector-icons";
import Head from "expo-router/head";
import { DrawerScreen } from "layout";

import { AddressScreen } from "@/features/address-management";

const Index = () => {
  return (
    <>
      <Head>
        <title>Address Screen</title>
      </Head>
      <DrawerScreen
        headerProps={{
          title: "ADDRESSES",
          icon: <Ionicons name="location-outline" size={20} />,
        }}
      >
        <AddressScreen />
      </DrawerScreen>
    </>
  );
};

export default Index;
