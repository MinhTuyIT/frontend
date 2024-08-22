import { Icon } from "@gluestack-ui/themed";
import { UserIcon } from "assets/icons/UserIcon";
import Head from "expo-router/head";
import { DrawerScreen } from "layout";

import { Profile } from "@/features/account";

const Index = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <DrawerScreen
        headerProps={{
          title: "PROFILE",
          icon: <Icon as={UserIcon()} />,
        }}
      >
        <Profile />
      </DrawerScreen>
    </>
  );
};

export default Index;
