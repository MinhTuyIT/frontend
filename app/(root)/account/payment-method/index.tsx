import { Icon } from "@gluestack-ui/themed";
import { DebitCardIcon } from "assets/icons/DebitCardIcon";
import Head from "expo-router/head";
import { DrawerScreen } from "layout";

import { PaymentList } from "@/features/account";

const Index = () => {
  return (
    <>
      <Head>
        <title>Payment Method</title>
      </Head>
      <DrawerScreen
        headerProps={{
          title: "PAYMENT METHODS",
          icon: <Icon as={DebitCardIcon()} size="lg" />,
        }}
      >
        <PaymentList />
      </DrawerScreen>
    </>
  );
};

export default Index;
